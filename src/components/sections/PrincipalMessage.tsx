import { Quote, User } from "lucide-react";

const PrincipalMessage = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-primary/10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-accent/10 rounded-full" />
      
      <div className="container-main relative">
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-10 md:p-14 lg:p-16 relative overflow-hidden animate-fade-in">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10">
              <Quote className="w-20 h-20 md:w-28 md:h-28 text-primary/10" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Principal Image */}
              <div className="relative flex-shrink-0">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant">
                  <User className="w-20 h-20 md:w-24 md:h-24 text-white/90" />
                </div>
                {/* Decorative Ring */}
                <div className="absolute -inset-3 border-2 border-dashed border-primary/20 rounded-full" />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <span className="section-badge mb-4">
                  অধ্যক্ষের বাণী
                </span>
                
                <blockquote className="text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-6 font-serif italic">
                  "শিক্ষাই জাতির মেরুদণ্ড। আমাদের লক্ষ্য শুধু জ্ঞান দান নয়, বরং প্রতিটি শিক্ষার্থীকে 
                  একজন সুনাগরিক হিসেবে গড়ে তোলা। রাজশাহী হাদিত মহাবিদ্যালয় সেই স্বপ্ন পূরণে নিরলস কাজ করে যাচ্ছে।"
                </blockquote>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <div>
                    <h4 className="font-heading font-bold text-xl text-foreground">
                      প্রফেসর ড. আব্দুল করিম
                    </h4>
                    <p className="text-primary font-medium">অধ্যক্ষ</p>
                  </div>
                  
                  {/* Signature */}
                  <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  
                  <div className="text-4xl font-serif italic text-primary/40">
                    আ.ক.
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

export default PrincipalMessage;
