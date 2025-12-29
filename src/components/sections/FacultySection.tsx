import { User } from "lucide-react";

const faculty = [
  {
    name: "প্রফেসর ড. আব্দুল করিম",
    designation: "অধ্যক্ষ",
    department: "প্রশাসন",
  },
  {
    name: "প্রফেসর মোহাম্মদ হাসান",
    designation: "উপাধ্যক্ষ",
    department: "প্রশাসন",
  },
  {
    name: "ড. ফাতেমা খাতুন",
    designation: "বিভাগীয় প্রধান",
    department: "বাংলা বিভাগ",
  },
  {
    name: "মো. রফিকুল ইসলাম",
    designation: "বিভাগীয় প্রধান",
    department: "ইংরেজি বিভাগ",
  },
];

const FacultySection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            প্রশাসন
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            আমাদের শিক্ষক মণ্ডলী
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকদের তত্ত্বাবধানে পরিচালিত আমাদের প্রতিষ্ঠান
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member, index) => (
            <div
              key={member.name}
              className="card-elevated p-6 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <User className="w-12 h-12 text-primary/50" />
              </div>

              {/* Info */}
              <h3 className="font-heading font-bold text-foreground text-lg mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-1">
                {member.designation}
              </p>
              <p className="text-muted-foreground text-sm">
                {member.department}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            সকল শিক্ষক দেখুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
