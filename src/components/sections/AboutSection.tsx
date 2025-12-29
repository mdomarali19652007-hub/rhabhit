import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "অভিজ্ঞ ও যোগ্য শিক্ষক মণ্ডলী",
  "আধুনিক শিক্ষা উপকরণ ও ল্যাব সুবিধা",
  "নিয়মিত পরীক্ষা ও মূল্যায়ন পদ্ধতি",
  "সহশিক্ষা কার্যক্রম ও ক্লাব",
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              আমাদের সম্পর্কে
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              শিক্ষার আলোয় আলোকিত <br />
              <span className="text-primary">আগামীর প্রজন্ম</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              রাজশাহী হাদিত মহাবিদ্যালয় একটি স্বনামধন্য শিক্ষা প্রতিষ্ঠান যা দীর্ঘদিন ধরে 
              মানসম্মত শিক্ষা প্রদান করে আসছে। আমাদের লক্ষ্য হলো শিক্ষার্থীদের জ্ঞান, দক্ষতা 
              ও মূল্যবোধে সমৃদ্ধ করে তোলা।
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button size="lg">
              বিস্তারিত জানুন
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="card-elevated overflow-hidden aspect-[4/3]">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-4xl font-bold text-primary mb-2">৩০+</p>
                    <p className="text-sm text-muted-foreground">বছরের অভিজ্ঞতা</p>
                  </div>
                </div>
              </div>
              <div className="card-elevated overflow-hidden aspect-square">
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-4xl font-bold text-accent mb-2">৯৫%</p>
                    <p className="text-sm text-muted-foreground">পাসের হার</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="card-elevated overflow-hidden aspect-square">
                <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-4xl font-bold text-emerald-600 mb-2">৫০+</p>
                    <p className="text-sm text-muted-foreground">শিক্ষক মণ্ডলী</p>
                  </div>
                </div>
              </div>
              <div className="card-elevated overflow-hidden aspect-[4/3]">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-4xl font-bold text-blue-600 mb-2">১০০০+</p>
                    <p className="text-sm text-muted-foreground">সফল স্নাতক</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
