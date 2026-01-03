import { Bell, ArrowRight, AlertCircle } from "lucide-react";
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
      title: "শীতকালীন ছুটির নোটিশ",
      created_at: new Date().toISOString(),
      is_urgent: false,
      category: "general",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      general: "সাধারণ",
      admission: "ভর্তি",
      exam: "পরীক্ষা",
      result: "ফলাফল",
      event: "অনুষ্ঠান",
      scholarship: "বৃত্তি",
      urgent: "জরুরি",
    };
    return labels[category] || "সাধারণ";
  };

  return (
    <section id="notices" className="section-padding bg-muted/30">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              নোটিশ বোর্ড
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              সর্বশেষ বিজ্ঞপ্তি
            </h2>
          </div>
          <Button variant="outline" onClick={() => navigate("/notices")}>
            সকল নোটিশ দেখুন
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid gap-4">
          {displayNotices.map((notice, index) => (
            <button
              key={notice.id}
              onClick={() => navigate("/notices")}
              className="card-elevated p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 group text-left w-full"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
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
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {notice.is_urgent && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-destructive text-destructive-foreground">
                      জরুরি
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                    {getCategoryLabel(notice.category || "general")}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg group-hover:text-primary transition-colors truncate">
                  {notice.title}
                </h3>
              </div>

              {/* Date & Arrow */}
              <div className="flex items-center gap-4 md:flex-shrink-0">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {formatDate(notice.created_at)}
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
