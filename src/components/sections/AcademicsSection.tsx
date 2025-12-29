import { ArrowRight } from "lucide-react";

const departments = [
  {
    name: "বাংলা বিভাগ",
    nameEn: "Bangla Department",
    students: "২৫০+",
    color: "from-rose-500/20 to-rose-500/5",
    borderColor: "border-rose-500/30",
  },
  {
    name: "ইংরেজি বিভাগ",
    nameEn: "English Department",
    students: "২০০+",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
  },
  {
    name: "অর্থনীতি বিভাগ",
    nameEn: "Economics Department",
    students: "১৮০+",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
  },
  {
    name: "রাষ্ট্রবিজ্ঞান বিভাগ",
    nameEn: "Political Science",
    students: "১৫০+",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
  },
  {
    name: "ইসলামের ইতিহাস",
    nameEn: "Islamic History",
    students: "২০০+",
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/30",
  },
  {
    name: "সমাজকর্ম বিভাগ",
    nameEn: "Social Work",
    students: "১২০+",
    color: "from-teal-500/20 to-teal-500/5",
    borderColor: "border-teal-500/30",
  },
];

const AcademicsSection = () => {
  return (
    <section id="academics" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            একাডেমিক বিভাগসমূহ
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            আমাদের বিভাগসমূহ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            বিভিন্ন বিষয়ে উচ্চমানের শিক্ষা প্রদানের জন্য আমাদের বিশেষায়িত বিভাগসমূহ
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <a
              key={dept.name}
              href="#"
              className={`card-elevated p-6 group cursor-pointer border-l-4 ${dept.borderColor}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />
              <div className="relative z-10">
                <h3 className="font-heading font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {dept.nameEn}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{dept.students}</span> শিক্ষার্থী
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            সকল বিভাগ দেখুন
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
