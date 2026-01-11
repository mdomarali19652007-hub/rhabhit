import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: MapPin,
    title: "ঠিকানা",
    lines: ["রাজশাহী হাদিত মহাবিদ্যালয়", "রাজশাহী, বাংলাদেশ"],
    color: "from-primary to-primary/80",
  },
  {
    icon: Phone,
    title: "ফোন",
    lines: ["+880 1234-567890", "+880 9876-543210"],
    color: "from-accent to-accent/80",
  },
  {
    icon: Mail,
    title: "ইমেইল",
    lines: ["info@rajshahihadit.edu.bd", "admission@rajshahihadit.edu.bd"],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Clock,
    title: "অফিস সময়",
    lines: ["রবিবার - বৃহস্পতিবার: ৯টা - ৫টা", "শুক্রবার ও শনিবার: বন্ধ"],
    color: "from-emerald-500 to-emerald-600",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-main relative">
        <div className="section-header">
          <span className="section-badge">
            <MessageCircle className="w-4 h-4" />
            যোগাযোগ
          </span>
          <h2 className="font-heading text-foreground mb-5">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            যেকোনো প্রশ্ন বা তথ্যের জন্য আমাদের সাথে যোগাযোগ করতে পারেন
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map */}
          <div className="lg:col-span-3 card-elevated overflow-hidden rounded-2xl animate-fade-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.176761097785!2d88.60337131499614!3d24.36848698428847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef96a7f5d607%3A0x4a9e0e7b5c4e8f0a!2sRajshahi%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="College Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((info, index) => (
              <div 
                key={info.title}
                className="card-elevated p-6 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      {info.title}
                    </h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Button size="lg" className="w-full group shadow-elegant animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <ExternalLink className="w-5 h-5" />
              Google Map-এ দেখুন
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
