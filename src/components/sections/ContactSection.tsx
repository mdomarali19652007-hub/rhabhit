import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            যোগাযোগ
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            যেকোনো প্রশ্ন বা তথ্যের জন্য আমাদের সাথে যোগাযোগ করতে পারেন
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="card-elevated overflow-hidden aspect-[4/3] lg:aspect-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.176761097785!2d88.60337131499614!3d24.36848698428847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef96a7f5d607%3A0x4a9e0e7b5c4e8f0a!2sRajshahi%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="College Location"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    ঠিকানা
                  </h3>
                  <p className="text-muted-foreground">
                    রাজশাহী হাদিত মহাবিদ্যালয়<br />
                    রাজশাহী, বাংলাদেশ
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    ফোন
                  </h3>
                  <p className="text-muted-foreground">
                    +880 1234-567890<br />
                    +880 9876-543210
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    ইমেইল
                  </h3>
                  <p className="text-muted-foreground">
                    info@rajshahihadit.edu.bd<br />
                    admission@rajshahihadit.edu.bd
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    অফিস সময়
                  </h3>
                  <p className="text-muted-foreground">
                    রবিবার - বৃহস্পতিবার: সকাল ৯টা - বিকাল ৫টা<br />
                    শুক্রবার ও শনিবার: বন্ধ
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full">
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
