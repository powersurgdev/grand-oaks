import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Our Work", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur shadow-sm border-b border-gray-100 py-2" 
          : "bg-transparent border-b border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img 
            src="/logo-text.png" 
            alt="Grand Oaks Property Maintenance" 
            className={cn(
              "w-auto object-contain transition-all duration-300",
              isScrolled ? "h-12 md:h-14" : "h-14 md:h-20 filter brightness-0 invert drop-shadow-md"
            )}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "font-medium transition-colors text-lg",
                isScrolled 
                  ? "text-brand-charcoal hover:text-brand-green" 
                  : "text-white hover:text-brand-orange drop-shadow-md"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:8138607086" 
            className={cn(
              "font-bold text-lg transition-colors",
              isScrolled 
                ? "text-brand-charcoal hover:text-brand-green" 
                : "text-white hover:text-brand-orange drop-shadow-md"
            )}
          >
            (813) 860-7086
          </a>
          <Button 
            className={cn(
              "font-bold rounded-full px-6 transition-all shadow-lg",
              isScrolled
                ? "bg-brand-orange hover:bg-brand-orange/90 text-white"
                : "bg-white text-brand-green hover:bg-gray-100"
            )}
            size="lg"
          >
            Call Now
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <Button 
            variant="default" 
            size="sm" 
            className={cn(
              "font-bold rounded-full transition-colors",
              isScrolled
                ? "bg-brand-orange hover:bg-brand-orange/90 text-white"
                : "bg-white text-brand-green hover:bg-gray-100"
            )}
            asChild
          >
            <a href="tel:8138607086">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </a>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-brand-green" : "text-white"}>
                <Menu className="w-8 h-8 drop-shadow-md" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-10">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href}
                      className="text-xl font-medium text-foreground hover:text-brand-green transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 mt-4">
                  <Button 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-xl h-12 text-lg"
                    asChild
                  >
                    <a href="tel:8138607086">Call (813) 860-7086</a>
                  </Button>
                  <Button 
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-xl h-12 text-lg"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <a href="#contact">Get Free Estimate</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
