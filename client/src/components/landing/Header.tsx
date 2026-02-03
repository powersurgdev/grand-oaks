import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Our Work", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="Grand Oaks Property Maintenance" 
            className="h-12 md:h-16 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-foreground font-medium hover:text-brand-green transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:8138607086" className="font-bold text-lg text-brand-charcoal hover:text-brand-green transition-colors">
            (813) 860-7086
          </a>
          <Button 
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-full px-6"
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
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-full"
            asChild
          >
            <a href="tel:8138607086">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </a>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-brand-green">
                <Menu className="w-6 h-6" />
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
