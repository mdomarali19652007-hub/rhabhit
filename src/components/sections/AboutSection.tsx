import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  "অভিজ্ঞ ও যোগ্য শিক্ষক মণ্ডলী",
  "আধুনিক শিক্ষা উপকরণ ও ল্যাব সুবিধা",
  "নিয়মিত পরীক্ষা ও মূল্যায়ন পদ্ধতি",
  "সহশিক্ষা কার্যক্রম ও ক্লাব",
  "ডিজিটাল ক্লাসরুম সুবিধা",
];

const stats = [
  { value: "৩০+", label: "বছরের অভিজ্ঞতা", color: "from-primary to-primary/80" },
  { value: "৯৫%", label: "পাসের হার", color: "from-accent to-accent/80" },
  { value: "৫০+", label: "শিক্ষক মণ্ডলী", color: "from-emerald-500 to-emerald-600" },
  { value: "১০০০+", label: "সফল স্নাতক", color: "from-blue-500 to-blue-600" },
];

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container-main relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <span className="section-badge">
              <Sparkles className="w-4 h-4" />
              আমাদের সম্পর্কে
            </span>
            
            <h2 className="font-heading text-foreground mb-6 leading-tight">
              শিক্ষার আলোয় আলোকিত <br />
              <span className="text-gradient">আগামীর প্রজন্ম</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              রাজশাহী হাদিত মহাবিদ্যালয় একটি স্বনামধন্য শিক্ষা প্রতিষ্ঠান যা দীর্ঘদিন ধরে 
              মানসম্মত শিক্ষা প্রদান করে আসছে। আমাদের লক্ষ্য হলো শিক্ষার্থীদের জ্ঞান, দক্ষতা 
              ও মূল্যবোধে সমৃদ্ধ করে তোলা এবং তাদের উজ্জ্বল ভবিষ্যৎ গড়তে সহায়তা করা।
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-4 animate-fade-in"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              size="lg" 
              onClick={() => navigate("/about")}
              className="group shadow-elegant"
            >
              বিস্তারিত জানুন
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-5 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="card-elevated p-8 text-center group animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <span className="text-2xl font-bold text-white">{stat.value.slice(0, 2)}</span>
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
