import { ArrowRight, BookOpen, Users, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(175 72% 22%) 0%, hsl(185 65% 18%) 50%, hsl(190 55% 15%) 100%)",
        }}
      />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/30 rounded-full blur-[100px] animate-float-delayed" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-20">
          {/* Content */}
          <div className="text-primary-foreground">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span className="text-sm font-medium tracking-wide">২০২৬ সালের ভর্তি চলছে</span>
            </div>

            {/* Main Heading */}
            <h1 
              className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              রাজশাহী হাদিত
              <span className="block mt-3 text-accent drop-shadow-lg">মহাবিদ্যালয়</span>
            </h1>

            {/* Decorative Line */}
            <div className="decorative-line mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }} />

            {/* Tagline */}
            <p 
              className="text-lg md:text-xl lg:text-2xl text-white/85 max-w-xl mb-10 leading-relaxed font-light animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              জ্ঞান, মূল্যবোধ ও দক্ষতার সমন্বয়ে গড়ে তুলছি আগামীর সফল নাগরিক। 
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate("/admission")}
                className="btn-elegant group shadow-elegant"
              >
                ভর্তি আবেদন করুন
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl" 
                onClick={() => navigate("/about")}
                className="backdrop-blur-sm"
              >
                আরও জানুন
              </Button>
            </div>

            {/* Trust Badges */}
            <div 
              className="flex flex-wrap items-center gap-6 text-sm text-white/70 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>প্রতিষ্ঠিত ১৯৯৫</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="hidden lg:grid grid-cols-2 gap-5">
            {[
              { 
                icon: Users, 
                value: "২৫০০+", 
                label: "শিক্ষার্থী",
                description: "বর্তমান শিক্ষাবর্ষে",
                color: "from-white/15 to-white/5",
                delay: "0.3s"
              },
              { 
                icon: BookOpen, 
                value: "১২+", 
                label: "বিভাগ",
                description: "স্নাতক ও স্নাতকোত্তর",
                color: "from-accent/20 to-accent/5",
                delay: "0.4s"
              },
              { 
                icon: Award, 
                value: "৯৫%", 
                label: "পাসের হার",
                description: "গত শিক্ষাবর্ষে",
                color: "from-white/15 to-white/5",
                delay: "0.5s"
              },
              { 
                icon: Calendar, 
                value: "৩০+", 
                label: "বছরের অভিজ্ঞতা",
                description: "শিক্ষা সেবায়",
                color: "from-accent/20 to-accent/5",
                delay: "0.6s"
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`card-glass p-6 bg-gradient-to-br ${stat.color} border-white/10 animate-fade-in hover:scale-105 transition-transform duration-500`}
                style={{ animationDelay: stat.delay }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-lg font-medium text-white/90">{stat.label}</p>
                <p className="text-sm text-white/60 mt-1">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 100L48 95C96 90 192 80 288 75C384 70 480 70 576 72.5C672 75 768 80 864 82.5C960 85 1056 85 1152 80C1248 75 1344 65 1392 60L1440 55V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
