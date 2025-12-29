import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Target, Eye, Award, Building, Laptop, Home, Trophy, Calendar } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string | null;
  year: number;
  icon: string | null;
}

interface AboutData {
  history: string;
  mission: string;
  vision: string;
  established: number;
}

const iconMap: Record<string, React.ElementType> = {
  building: Building,
  award: Award,
  home: Home,
  trophy: Trophy,
  laptop: Laptop,
};

const AboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch about settings
      const { data: settingsData } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "about")
        .maybeSingle();

      if (settingsData?.value) {
        setAboutData(settingsData.value as unknown as AboutData);
      }

      // Fetch achievements
      const { data: achievementsData } = await supabase
        .from("achievements")
        .select("*")
        .eq("is_published", true)
        .order("year", { ascending: true });

      if (achievementsData) {
        setAchievements(achievementsData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>আমাদের সম্পর্কে | রাজশাহী হাদিত মহাবিদ্যালয়</title>
        <meta name="description" content="রাজশাহী হাদিত মহাবিদ্যালয়ের ইতিহাস, লক্ষ্য, উদ্দেশ্য ও অর্জনসমূহ।" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container-main text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              আমাদের সম্পর্কে
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              {aboutData?.established && `প্রতিষ্ঠাকাল ${aboutData.established} সাল থেকে`} শিক্ষার আলো ছড়িয়ে যাচ্ছে
            </p>
          </div>
        </section>

        {/* History */}
        <section className="section-padding">
          <div className="container-main">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  আমাদের গল্প
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  মহাবিদ্যালয়ের ইতিহাস
                </h2>
              </div>
              <div className="card-elevated p-8 md:p-12">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {aboutData?.history || "রাজশাহী হাদিত মহাবিদ্যালয় একটি স্বনামধন্য শিক্ষা প্রতিষ্ঠান যা দীর্ঘদিন ধরে মানসম্মত শিক্ষা প্রদান করে আসছে। আমাদের লক্ষ্য হলো শিক্ষার্থীদের জ্ঞান, দক্ষতা ও মূল্যবোধে সমৃদ্ধ করে তোলা এবং তাদের আগামীর সফল নাগরিক হিসেবে গড়ে তোলা।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-muted/30">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Mission */}
              <div className="card-elevated p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  আমাদের লক্ষ্য
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData?.mission || "জ্ঞান, মূল্যবোধ ও দক্ষতার সমন্বয়ে গড়ে তুলছি আগামীর সফল নাগরিক।"}
                </p>
              </div>

              {/* Vision */}
              <div className="card-elevated p-8">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  আমাদের দর্শন
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData?.vision || "শিক্ষার আলোয় আলোকিত আগামীর প্রজন্ম গড়ে তোলা।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline / Achievements */}
        <section className="section-padding">
          <div className="container-main">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                অর্জনসমূহ
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                আমাদের যাত্রা
              </h2>
            </div>

            {achievements.length > 0 ? (
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

                  {/* Timeline Items */}
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon ? iconMap[achievement.icon] || Award : Award;
                    const isEven = index % 2 === 0;

                    return (
                      <div
                        key={achievement.id}
                        className={`relative flex items-start gap-8 mb-12 ${
                          isEven ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Icon */}
                        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
                          <IconComponent className="w-7 h-7 text-primary-foreground" />
                        </div>

                        {/* Content */}
                        <div className={`ml-28 md:ml-0 md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                          <div className="card-elevated p-6">
                            <div className="flex items-center gap-2 mb-2 text-primary">
                              <Calendar className="w-4 h-4" />
                              <span className="font-semibold">{achievement.year}</span>
                            </div>
                            <h3 className="font-heading font-bold text-foreground text-lg mb-2">
                              {achievement.title}
                            </h3>
                            {achievement.description && (
                              <p className="text-muted-foreground text-sm">
                                {achievement.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">কোনো অর্জন যুক্ত করা হয়নি</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-heading text-4xl md:text-5xl font-bold mb-2">৩০+</p>
                <p className="text-primary-foreground/70">বছরের অভিজ্ঞতা</p>
              </div>
              <div>
                <p className="font-heading text-4xl md:text-5xl font-bold mb-2">২৫০০+</p>
                <p className="text-primary-foreground/70">শিক্ষার্থী</p>
              </div>
              <div>
                <p className="font-heading text-4xl md:text-5xl font-bold mb-2">৫০+</p>
                <p className="text-primary-foreground/70">শিক্ষক মণ্ডলী</p>
              </div>
              <div>
                <p className="font-heading text-4xl md:text-5xl font-bold mb-2">৯৫%</p>
                <p className="text-primary-foreground/70">পাসের হার</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
