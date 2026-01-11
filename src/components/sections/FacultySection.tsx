import { User, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const faculty = [
  {
    name: "প্রফেসর ড. আব্দুল করিম",
    designation: "অধ্যক্ষ",
    department: "প্রশাসন",
    color: "from-primary to-primary/80",
  },
  {
    name: "প্রফেসর মোহাম্মদ হাসান",
    designation: "উপাধ্যক্ষ",
    department: "প্রশাসন",
    color: "from-accent to-accent/80",
  },
  {
    name: "ড. ফাতেমা খাতুন",
    designation: "বিভাগীয় প্রধান",
    department: "বাংলা বিভাগ",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    name: "মো. রফিকুল ইসলাম",
    designation: "বিভাগীয় প্রধান",
    department: "ইংরেজি বিভাগ",
    color: "from-blue-500 to-blue-600",
  },
];

const FacultySection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-grid opacity-30" />
      
      <div className="container-main relative">
        <div className="section-header">
          <span className="section-badge">
            <Users className="w-4 h-4" />
            প্রশাসন
          </span>
          <h2 className="font-heading text-foreground mb-5">
            আমাদের শিক্ষক মণ্ডলী
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকদের তত্ত্বাবধানে পরিচালিত আমাদের প্রতিষ্ঠান
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {faculty.map((member, index) => (
            <div
              key={member.name}
              className="group card-elevated p-8 text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div className="relative mx-auto mb-6">
                <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center shadow-elegant group-hover:scale-105 transition-transform duration-500`}>
                  <User className="w-14 h-14 text-white/90" />
                </div>
                {/* Status Dot */}
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-card border-4 border-card flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Info */}
              <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-primary font-semibold mb-1">
                {member.designation}
              </p>
              <p className="text-muted-foreground text-sm">
                {member.department}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button variant="outline" size="lg" className="group">
            সকল শিক্ষক দেখুন
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
