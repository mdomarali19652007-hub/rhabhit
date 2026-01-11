import { Bell, BookOpen, Calendar, Award, FileText, Phone, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickLinks = [
  {
    icon: Bell,
    title: "নোটিশ বোর্ড",
    titleEn: "Notice Board",
    description: "সর্বশেষ ঘোষণা ও বিজ্ঞপ্তি দেখুন",
    href: "/notices",
    gradient: "from-primary/10 via-primary/5 to-transparent",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "hover:border-primary/30",
  },
  {
    icon: BookOpen,
    title: "ভর্তি তথ্য",
    titleEn: "Admission Info",
    description: "ভর্তি প্রক্রিয়া ও নির্দেশিকা জানুন",
    href: "/admission",
    gradient: "from-accent/10 via-accent/5 to-transparent",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    borderColor: "hover:border-accent/30",
  },
  {
    icon: Calendar,
    title: "একাডেমিক ক্যালেন্ডার",
    titleEn: "Academic Calendar",
    description: "শিক্ষাবর্ষের সময়সূচী দেখুন",
    href: "/#academics",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    borderColor: "hover:border-emerald-500/30",
  },
  {
    icon: Award,
    title: "ফলাফল",
    titleEn: "Results",
    description: "পরীক্ষার ফলাফল দেখুন",
    href: "/notices",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-500/30",
  },
  {
    icon: FileText,
    title: "ডাউনলোড",
    titleEn: "Downloads",
    description: "ফরম ও প্রয়োজনীয় কাগজপত্র",
    href: "/notices",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    borderColor: "hover:border-purple-500/30",
  },
  {
    icon: Phone,
    title: "যোগাযোগ",
    titleEn: "Contact",
    description: "আমাদের সাথে যোগাযোগ করুন",
    href: "/#contact",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
    borderColor: "hover:border-rose-500/30",
  },
];

const QuickAccessSection = () => {
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-pattern-dots opacity-50" />
      
      <div className="container-main relative">
        <div className="section-header">
          <span className="section-badge">
            <span className="decorative-dot" />
            দ্রুত প্রবেশ
          </span>
          <h2 className="font-heading text-foreground mb-5">
            আমাদের সেবাসমূহ
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            গুরুত্বপূর্ণ তথ্য ও সেবাসমূহে সহজেই প্রবেশ করুন
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {quickLinks.map((link, index) => (
            <button
              key={link.title}
              onClick={() => handleClick(link.href)}
              className={`group relative card-elevated p-8 text-left overflow-hidden border border-border/50 ${link.borderColor} animate-fade-in`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${link.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <link.icon className={`w-7 h-7 ${link.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 mb-3">
                      {link.titleEn}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
