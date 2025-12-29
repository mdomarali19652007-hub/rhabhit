import { Bell, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const notices = [
  {
    id: 1,
    title: "২০২৬ সালের ভর্তি বিজ্ঞপ্তি প্রকাশ",
    date: "২৮ ডিসেম্বর, ২০২৫",
    isUrgent: true,
    category: "ভর্তি",
  },
  {
    id: 2,
    title: "শীতকালীন ছুটির নোটিশ",
    date: "২৫ ডিসেম্বর, ২০২৫",
    isUrgent: false,
    category: "সাধারণ",
  },
  {
    id: 3,
    title: "অনার্স ৩য় বর্ষ ফর্ম ফিলাপের সময়সীমা বৃদ্ধি",
    date: "২২ ডিসেম্বর, ২০২৫",
    isUrgent: true,
    category: "পরীক্ষা",
  },
  {
    id: 4,
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতার সময়সূচী",
    date: "২০ ডিসেম্বর, ২০২৫",
    isUrgent: false,
    category: "সাংস্কৃতিক",
  },
  {
    id: 5,
    title: "বৃত্তি প্রাপ্ত শিক্ষার্থীদের তালিকা প্রকাশ",
    date: "১৮ ডিসেম্বর, ২০২৫",
    isUrgent: false,
    category: "বৃত্তি",
  },
];

const NoticesSection = () => {
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
          <Button variant="outline">
            সকল নোটিশ দেখুন
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid gap-4">
          {notices.map((notice, index) => (
            <a
              key={notice.id}
              href="#"
              className="card-elevated p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                notice.isUrgent 
                  ? "bg-destructive/10 text-destructive" 
                  : "bg-primary/10 text-primary"
              }`}>
                {notice.isUrgent ? (
                  <AlertCircle className="w-6 h-6" />
                ) : (
                  <Bell className="w-6 h-6" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {notice.isUrgent && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-destructive text-destructive-foreground">
                      জরুরি
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                    {notice.category}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg group-hover:text-primary transition-colors truncate">
                  {notice.title}
                </h3>
              </div>

              {/* Date & Arrow */}
              <div className="flex items-center gap-4 md:flex-shrink-0">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {notice.date}
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
