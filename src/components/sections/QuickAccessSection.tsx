import { Bell, BookOpen, Calendar, Award, FileText, Phone } from "lucide-react";

const quickLinks = [
  {
    icon: Bell,
    title: "নোটিশ বোর্ড",
    titleEn: "Notice Board",
    description: "সর্বশেষ ঘোষণা ও বিজ্ঞপ্তি",
    href: "#notices",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: BookOpen,
    title: "ভর্তি তথ্য",
    titleEn: "Admission Info",
    description: "ভর্তি প্রক্রিয়া ও নির্দেশিকা",
    href: "#admission",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Calendar,
    title: "একাডেমিক ক্যালেন্ডার",
    titleEn: "Academic Calendar",
    description: "শিক্ষাবর্ষের সময়সূচী",
    href: "#calendar",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Award,
    title: "ফলাফল",
    titleEn: "Results",
    description: "পরীক্ষার ফলাফল দেখুন",
    href: "#results",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: FileText,
    title: "ডাউনলোড",
    titleEn: "Downloads",
    description: "ফরম ও প্রয়োজনীয় কাগজপত্র",
    href: "#downloads",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Phone,
    title: "যোগাযোগ",
    titleEn: "Contact",
    description: "আমাদের সাথে যোগাযোগ করুন",
    href: "#contact",
    color: "bg-rose-500/10 text-rose-600",
  },
];

const QuickAccessSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            দ্রুত প্রবেশ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            গুরুত্বপূর্ণ তথ্য ও সেবাসমূহে সহজেই প্রবেশ করুন
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {quickLinks.map((link, index) => (
            <a
              key={link.title}
              href={link.href}
              className="card-elevated p-6 text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-14 h-14 mx-auto rounded-xl ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <link.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1 text-sm md:text-base">
                {link.title}
              </h3>
              <p className="text-xs text-muted-foreground hidden md:block">
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
