import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, User, Shield, LogOut, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "হোম", labelEn: "Home", href: "/" },
  { label: "পরিচিতি", labelEn: "About", href: "/about" },
  { label: "একাডেমিক", labelEn: "Academics", href: "/#academics" },
  { label: "ভর্তি", labelEn: "Admission", href: "/admission" },
  { label: "নোটিশ", labelEn: "Notice", href: "/notices" },
  { label: "যোগাযোগ", labelEn: "Contact", href: "/#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#")) {
      if (window.location.pathname === "/") {
        const sectionId = href.replace("/#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-foreground text-background py-2">
        <div className="container-main flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+8801234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+880 1234-567890</span>
            </a>
            <a href="mailto:info@rajshahihadit.edu.bd" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@rajshahihadit.edu.bd</span>
            </a>
          </div>
          <p className="text-background/70">জ্ঞান, মূল্যবোধ ও দক্ষতার সমন্বয়</p>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-card/95 backdrop-blur-xl shadow-card border-b border-border" 
          : "bg-card/80 backdrop-blur-md"
      }`}>
        <div className="container-main">
          <div className="flex h-18 md:h-22 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elegant group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-xl md:text-2xl text-foreground leading-tight">
                  রাজশাহী হাদিত
                </h1>
                <p className="text-xs text-muted-foreground font-medium tracking-wide">RAJSHAHI HADIT COLLEGE</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-all duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA & Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {!loading && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="max-w-[100px] truncate font-medium">
                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52 rounded-xl">
                    {isAdmin && (
                      <>
                        <DropdownMenuItem onClick={() => navigate("/admin")} className="rounded-lg">
                          <Shield className="w-4 h-4 mr-2" />
                          অ্যাডমিন প্যানেল
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive rounded-lg">
                      <LogOut className="w-4 h-4 mr-2" />
                      লগ আউট
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : !loading ? (
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth")} className="rounded-xl">
                  লগইন
                </Button>
              ) : null}
              <Button variant="accent" size="lg" onClick={() => navigate("/admission")} className="rounded-xl shadow-elegant">
                ভর্তি আবেদন
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-border animate-fade-in">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="px-4 py-3.5 text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 px-4 space-y-3 border-t border-border mt-3">
                  {!loading && user ? (
                    <>
                      {isAdmin && (
                        <Button variant="outline" className="w-full justify-start gap-2 rounded-xl" onClick={() => { setIsMenuOpen(false); navigate("/admin"); }}>
                          <Shield className="w-4 h-4" />
                          অ্যাডমিন প্যানেল
                        </Button>
                      )}
                      <Button variant="ghost" className="w-full justify-start gap-2 text-destructive rounded-xl" onClick={() => { setIsMenuOpen(false); handleSignOut(); }}>
                        <LogOut className="w-4 h-4" />
                        লগ আউট
                      </Button>
                    </>
                  ) : !loading ? (
                    <Button variant="outline" className="w-full rounded-xl" onClick={() => { setIsMenuOpen(false); navigate("/auth"); }}>
                      লগইন
                    </Button>
                  ) : null}
                  <Button variant="accent" size="lg" className="w-full rounded-xl" onClick={() => { setIsMenuOpen(false); navigate("/admission"); }}>
                    ভর্তি আবেদন
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
