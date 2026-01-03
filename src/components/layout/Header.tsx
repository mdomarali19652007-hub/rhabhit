import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, User, Shield, LogOut } from "lucide-react";
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
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#")) {
      // If on home page, scroll to section; otherwise navigate to home first
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
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container-main">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-lg md:text-xl text-foreground leading-tight">
                রাজশাহী হাদিত
              </h1>
              <p className="text-xs text-muted-foreground">Rajshahi HADIT</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
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
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <Shield className="w-4 h-4 mr-2" />
                        অ্যাডমিন প্যানেল
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    লগ আউট
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : !loading ? (
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                লগইন
              </Button>
            ) : null}
            <Button variant="accent" size="lg" onClick={() => navigate("/admission")}>
              ভর্তি আবেদন
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-3 px-4 space-y-2 border-t border-border mt-2">
                {!loading && user ? (
                  <>
                    <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{user.user_metadata?.full_name || user.email?.split("@")[0]}</span>
                    </div>
                    {isAdmin && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start gap-2"
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate("/admin");
                        }}
                      >
                        <Shield className="w-4 h-4" />
                        অ্যাডমিন প্যানেল
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start gap-2 text-destructive"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      লগ আউট
                    </Button>
                  </>
                ) : !loading ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/auth");
                    }}
                  >
                    লগইন
                  </Button>
                ) : null}
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/admission");
                  }}
                >
                  ভর্তি আবেদন
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
