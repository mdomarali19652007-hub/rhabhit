import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const departments = [
  {
    name: "বাংলা বিভাগ",
    nameEn: "Bangla Department",
    students: "২৫০+",
    icon: "বা",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-l-rose-500",
  },
  {
    name: "ইংরেজি বিভাগ",
    nameEn: "English Department",
    students: "২০০+",
    icon: "EN",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-l-blue-500",
  },
  {
    name: "অর্থনীতি বিভাগ",
    nameEn: "Economics Department",
    students: "১৮০+",
    icon: "অর্থ",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-l-emerald-500",
  },
  {
    name: "রাষ্ট্রবিজ্ঞান বিভাগ",
    nameEn: "Political Science",
    students: "১৫০+",
    icon: "রা",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-l-purple-500",
  },
  {
    name: "ইসলামের ইতিহাস",
    nameEn: "Islamic History",
    students: "২০০+",
    icon: "ই",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-l-amber-500",
  },
  {
    name: "সমাজকর্ম বিভাগ",
    nameEn: "Social Work",
    students: "১২০+",
    icon: "স",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-l-teal-500",
  },
];

const AcademicsSection = () => {
  return (
    <section id="academics" className="section-padding bg-background relative">
      {/* Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-border to-border" />
      
      <div className="container-main">
        <div className="section-header">
          <span className="section-badge">
            <GraduationCap className="w-4 h-4" />
            একাডেমিক বিভাগসমূহ
          </span>
          <h2 className="font-heading text-foreground mb-5">
            আমাদের বিভাগসমূহ
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            বিভিন্ন বিষয়ে উচ্চমানের শিক্ষা প্রদানের জন্য আমাদের বিশেষায়িত বিভাগসমূহ
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {departments.map((dept, index) => (
            <a
              key={dept.name}
              href="#"
              className={`group card-elevated p-8 border-l-4 ${dept.borderColor} hover:border-l-[6px] transition-all duration-500 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <span className="text-white font-bold text-sm">{dept.icon}</span>
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {dept.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {dept.nameEn}
              </p>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">{dept.students}</span> শিক্ষার্থী
                </span>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button variant="outline" size="lg" className="group">
            সকল বিভাগ দেখুন
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
