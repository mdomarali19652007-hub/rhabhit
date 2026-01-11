import { Bell, ArrowRight, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const NoticesSection = () => {
  const navigate = useNavigate();

  const { data: notices = [] } = useQuery({
    queryKey: ["homepage-notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fallback notices if database is empty
  const displayNotices = notices.length > 0 ? notices : [
    {
      id: "1",
      title: "২০২৬ সালের ভর্তি বিজ্ঞপ্তি প্রকাশ",
      created_at: new Date().toISOString(),
      is_urgent: true,
      category: "admission",
    },
    {
      id: "2",
      title: "শীতকালীন ছুটির নোটিশ - সকল শিক্ষার্থীদের জন্য প্রযোজ্য",
      created_at: new Date().toISOString(),
      is_urgent: false,
      category: "general",
    },
    {
      id: "3",
      title: "বার্ষিক পরীক্ষার সময়সূচী প্রকাশ",
      created_at: new Date().toISOString(),
      is_urgent: false,
      category: "exam",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("bn-BD", { day: "numeric" }),
      month: date.toLocaleDateString("bn-BD", { month: "short" }),
    };
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { label: string; color: string }> = {
      general: { label: "সাধারণ", color: "bg-muted text-muted-foreground" },
      admission: { label: "ভর্তি", color: "bg-primary/10 text-primary" },
      exam: { label: "পরীক্ষা", color: "bg-blue-500/10 text-blue-600" },
      result: { label: "ফলাফল", color: "bg-emerald-500/10 text-emerald-600" },
      event: { label: "অনুষ্ঠান", color: "bg-purple-500/10 text-purple-600" },
      scholarship: { label: "বৃত্তি", color: "bg-amber-500/10 text-amber-600" },
      urgent: { label: "জরুরি", color: "bg-destructive/10 text-destructive" },
    };
    return labels[category] || labels.general;
  };

  return (
    <section id="notices" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container-main relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <span className="section-badge">
              <Bell className="w-4 h-4" />
              নোটিশ বোর্ড
            </span>
            <h2 className="font-heading text-foreground">
              সর্বশেষ বিজ্ঞপ্তি
            </h2>
          </div>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/notices")}
            className="group self-start lg:self-auto"
          >
            সকল নোটিশ দেখুন
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="space-y-4">
          {displayNotices.map((notice, index) => {
            const date = formatDate(notice.created_at);
            const category = getCategoryLabel(notice.category || "general");
            
            return (
              <button
                key={notice.id}
                onClick={() => navigate("/notices")}
                className="w-full card-elevated p-6 md:p-8 flex items-center gap-6 group text-left animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Date */}
                <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex-shrink-0">
                  <span className="text-2xl font-bold text-primary leading-none">{date.day}</span>
                  <span className="text-xs text-primary/70 mt-1">{date.month}</span>
                </div>

                {/* Icon for Mobile */}
                <div className={`sm:hidden w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notice.is_urgent 
                    ? "bg-destructive/10 text-destructive" 
                    : "bg-primary/10 text-primary"
                }`}>
                  {notice.is_urgent ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <Bell className="w-6 h-6" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {notice.is_urgent && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-destructive text-destructive-foreground animate-pulse-subtle">
                        জরুরি
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${category.color}`}>
                      {category.label}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {notice.title}
                  </h3>
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
