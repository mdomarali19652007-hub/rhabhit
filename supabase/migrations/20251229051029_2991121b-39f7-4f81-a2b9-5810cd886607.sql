-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'staff');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin or teacher
CREATE OR REPLACE FUNCTION public.is_admin_or_teacher(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'teacher')
  )
$$;

-- User roles RLS policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table for user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Departments table
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_en TEXT,
    description TEXT,
    head_name TEXT,
    student_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    color TEXT DEFAULT 'primary',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Departments are viewable by everyone"
ON public.departments FOR SELECT
USING (true);

CREATE POLICY "Admins can manage departments"
ON public.departments FOR ALL
USING (public.is_admin_or_teacher(auth.uid()));

-- Faculty table
CREATE TABLE public.faculty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    department_name TEXT,
    email TEXT,
    phone TEXT,
    bio TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Faculty are viewable by everyone"
ON public.faculty FOR SELECT
USING (true);

CREATE POLICY "Admins can manage faculty"
ON public.faculty FOR ALL
USING (public.is_admin_or_teacher(auth.uid()));

-- Notice categories enum
CREATE TYPE public.notice_category AS ENUM ('general', 'admission', 'exam', 'result', 'event', 'scholarship', 'urgent');

-- Notices table
CREATE TABLE public.notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    category notice_category DEFAULT 'general',
    is_urgent BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    attachment_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published notices are viewable by everyone"
ON public.notices FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all notices"
ON public.notices FOR SELECT
USING (public.is_admin_or_teacher(auth.uid()));

CREATE POLICY "Admins can manage notices"
ON public.notices FOR ALL
USING (public.is_admin_or_teacher(auth.uid()));

-- Admission applications table
CREATE TABLE public.admissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number TEXT UNIQUE NOT NULL,
    
    -- Personal Information
    student_name TEXT NOT NULL,
    father_name TEXT NOT NULL,
    mother_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    blood_group TEXT,
    religion TEXT,
    nationality TEXT DEFAULT 'বাংলাদেশী',
    national_id TEXT,
    
    -- Contact Information
    phone TEXT NOT NULL,
    email TEXT,
    present_address TEXT NOT NULL,
    permanent_address TEXT,
    guardian_name TEXT,
    guardian_phone TEXT,
    guardian_relation TEXT,
    
    -- Academic Information
    ssc_board TEXT,
    ssc_roll TEXT,
    ssc_year INTEGER,
    ssc_gpa DECIMAL(3,2),
    ssc_group TEXT,
    hsc_board TEXT,
    hsc_roll TEXT,
    hsc_year INTEGER,
    hsc_gpa DECIMAL(3,2),
    hsc_group TEXT,
    
    -- Admission Details
    desired_department_id UUID REFERENCES public.departments(id),
    desired_department TEXT,
    admission_year INTEGER NOT NULL,
    admission_session TEXT,
    
    -- Documents
    photo_url TEXT,
    signature_url TEXT,
    ssc_certificate_url TEXT,
    hsc_certificate_url TEXT,
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'enrolled')),
    admin_notes TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit admission (public form)
CREATE POLICY "Anyone can submit admission application"
ON public.admissions FOR INSERT
WITH CHECK (true);

-- Applicants can view their own application by application number (handled in app)
CREATE POLICY "Admins can view all admissions"
ON public.admissions FOR SELECT
USING (public.is_admin_or_teacher(auth.uid()));

CREATE POLICY "Admins can manage admissions"
ON public.admissions FOR ALL
USING (public.is_admin_or_teacher(auth.uid()));

-- Site settings table for CMS
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
USING (public.is_admin_or_teacher(auth.uid()));

-- Gallery table for photos
CREATE TABLE public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are viewable by everyone"
ON public.gallery FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage gallery"
ON public.gallery FOR ALL
USING (public.is_admin_or_teacher(auth.uid()));

-- Achievements/Timeline table
CREATE TABLE public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    year INTEGER NOT NULL,
    icon TEXT,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements are viewable by everyone"
ON public.achievements FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage achievements"
ON public.achievements FOR ALL
USING (public.is_admin_or_teacher(auth.uid()));

-- Function to generate application number
CREATE OR REPLACE FUNCTION public.generate_application_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.application_number := 'RH-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_application_number
  BEFORE INSERT ON public.admissions
  FOR EACH ROW
  WHEN (NEW.application_number IS NULL)
  EXECUTE FUNCTION public.generate_application_number();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON public.faculty FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON public.notices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_admissions_updated_at BEFORE UPDATE ON public.admissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('about', '{"history": "রাজশাহী হাদিত মহাবিদ্যালয় একটি স্বনামধন্য শিক্ষা প্রতিষ্ঠান যা দীর্ঘদিন ধরে মানসম্মত শিক্ষা প্রদান করে আসছে।", "mission": "জ্ঞান, মূল্যবোধ ও দক্ষতার সমন্বয়ে গড়ে তুলছি আগামীর সফল নাগরিক।", "vision": "শিক্ষার আলোয় আলোকিত আগামীর প্রজন্ম গড়ে তোলা।", "established": 1990}'::jsonb),
('contact', '{"phone": "+880 1234-567890", "email": "info@rajshahihadit.edu.bd", "address": "রাজশাহী হাদিত মহাবিদ্যালয়, রাজশাহী, বাংলাদেশ"}'::jsonb);

-- Insert sample departments
INSERT INTO public.departments (name, name_en, student_count, color, display_order) VALUES
('বাংলা বিভাগ', 'Bangla Department', 250, 'rose', 1),
('ইংরেজি বিভাগ', 'English Department', 200, 'blue', 2),
('অর্থনীতি বিভাগ', 'Economics Department', 180, 'emerald', 3),
('রাষ্ট্রবিজ্ঞান বিভাগ', 'Political Science', 150, 'purple', 4),
('ইসলামের ইতিহাস', 'Islamic History', 200, 'amber', 5),
('সমাজকর্ম বিভাগ', 'Social Work', 120, 'teal', 6);

-- Insert sample faculty
INSERT INTO public.faculty (name, designation, department_name, display_order) VALUES
('প্রফেসর ড. আব্দুল করিম', 'অধ্যক্ষ', 'প্রশাসন', 1),
('প্রফেসর মোহাম্মদ হাসান', 'উপাধ্যক্ষ', 'প্রশাসন', 2),
('ড. ফাতেমা খাতুন', 'বিভাগীয় প্রধান', 'বাংলা বিভাগ', 3),
('মো. রফিকুল ইসলাম', 'বিভাগীয় প্রধান', 'ইংরেজি বিভাগ', 4);

-- Insert sample notices
INSERT INTO public.notices (title, content, category, is_urgent, published_at) VALUES
('২০২৬ সালের ভর্তি বিজ্ঞপ্তি প্রকাশ', 'নতুন শিক্ষাবর্ষের জন্য ভর্তি কার্যক্রম শুরু হয়েছে।', 'admission', true, now()),
('শীতকালীন ছুটির নোটিশ', 'আগামী ১ জানুয়ারি থেকে ১৫ জানুয়ারি পর্যন্ত শীতকালীন ছুটি থাকবে।', 'general', false, now() - interval '3 days'),
('অনার্স ৩য় বর্ষ ফর্ম ফিলাপের সময়সীমা বৃদ্ধি', 'ফর্ম ফিলাপের শেষ তারিখ ৩১ জানুয়ারি পর্যন্ত বর্ধিত করা হয়েছে।', 'exam', true, now() - interval '6 days'),
('বার্ষিক ক্রীড়া প্রতিযোগিতার সময়সূচী', 'আগামী মাসে বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে।', 'event', false, now() - interval '8 days'),
('বৃত্তি প্রাপ্ত শিক্ষার্থীদের তালিকা প্রকাশ', 'মেধাবী শিক্ষার্থীদের বৃত্তির তালিকা প্রকাশ করা হয়েছে।', 'scholarship', false, now() - interval '10 days');

-- Insert sample achievements
INSERT INTO public.achievements (title, description, year, icon, display_order) VALUES
('প্রতিষ্ঠা', 'মহাবিদ্যালয় প্রতিষ্ঠা করা হয়', 1990, 'building', 1),
('সরকারি স্বীকৃতি', 'সরকারি অনুমোদন ও স্বীকৃতি লাভ', 1995, 'award', 2),
('নতুন ভবন উদ্বোধন', 'আধুনিক শিক্ষা ভবন নির্মাণ ও উদ্বোধন', 2005, 'home', 3),
('শ্রেষ্ঠ কলেজ পুরস্কার', 'জেলার শ্রেষ্ঠ কলেজ হিসেবে পুরস্কার লাভ', 2015, 'trophy', 4),
('ডিজিটাল ক্যাম্পাস', 'সম্পূর্ণ ডিজিটাল ক্যাম্পাসে রূপান্তর', 2020, 'laptop', 5);