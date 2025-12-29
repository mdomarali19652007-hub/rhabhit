import { GraduationCap, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "হোম", href: "#" },
  { label: "পরিচিতি", href: "#about" },
  { label: "একাডেমিক", href: "#academics" },
  { label: "ভর্তি", href: "#admission" },
  { label: "নোটিশ", href: "#notices" },
  { label: "যোগাযোগ", href: "#contact" },
];

const importantLinks = [
  { label: "ফলাফল", href: "#" },
  { label: "ডাউনলোড", href: "#" },
  { label: "একাডেমিক ক্যালেন্ডার", href: "#" },
  { label: "লাইব্রেরি", href: "#" },
  { label: "গ্যালারি", href: "#" },
  { label: "ক্যারিয়ার", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-background">
                  রাজশাহী হাদিত
                </h3>
                <p className="text-xs text-background/60">মহাবিদ্যালয়</p>
              </div>
            </a>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              জ্ঞান, মূল্যবোধ ও দক্ষতার সমন্বয়ে গড়ে তুলছি আগামীর সফল নাগরিক।
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-background mb-4">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-heading font-bold text-background mb-4">
              গুরুত্বপূর্ণ লিংক
            </h4>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-background mb-4">
              যোগাযোগ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  রাজশাহী হাদিত মহাবিদ্যালয়, রাজশাহী, বাংলাদেশ
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  +880 1234-567890
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  info@rajshahihadit.edu.bd
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-main py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>
              © ২০২৫ রাজশাহী হাদিত মহাবিদ্যালয়। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p>
              ডিজাইন ও উন্নয়ন:{" "}
              <a href="#" className="text-primary hover:underline">
                Lovable
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
