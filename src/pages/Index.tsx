import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import QuickAccessSection from "@/components/sections/QuickAccessSection";
import AboutSection from "@/components/sections/AboutSection";
import AcademicsSection from "@/components/sections/AcademicsSection";
import NoticesSection from "@/components/sections/NoticesSection";
import FacultySection from "@/components/sections/FacultySection";
import ContactSection from "@/components/sections/ContactSection";
import PrincipalMessage from "@/components/sections/PrincipalMessage";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>রাজশাহী হাদিত মহাবিদ্যালয় | Rajshahi HADIT College</title>
        <meta
          name="description"
          content="রাজশাহী হাদিত মহাবিদ্যালয় - জ্ঞান, মূল্যবোধ ও দক্ষতার সমন্বয়ে গড়ে তুলছি আগামীর সফল নাগরিক। ভর্তি, একাডেমিক তথ্য ও নোটিশের জন্য ভিজিট করুন।"
        />
        <meta
          name="keywords"
          content="রাজশাহী হাদিত, কলেজ, মহাবিদ্যালয়, ভর্তি, একাডেমিক, বাংলাদেশ, Rajshahi HADIT, College, Admission"
        />
        <link rel="canonical" href="https://rajshahihadit.edu.bd" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <QuickAccessSection />
          <AboutSection />
          <PrincipalMessage />
          <AcademicsSection />
          <NoticesSection />
          <FacultySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
