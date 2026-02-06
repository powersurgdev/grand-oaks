import { Phone, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { servicesData } from "@/data/services";
import { Link as WouterLink } from "wouter";

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
    { name: "Services", href: "#services", type: "dropdown" },
    { name: "About Us", href: "/about", type: "link" },
    { name: "Why Us", href: "/#why-us", type: "link" },
    { name: "Our Work", href: "/#gallery", type: "link" },
    { name: "Reviews", href: "/#reviews", type: "link" },
    { name: "Contact", href: "/#contact", type: "link" },
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
            src="/logo-text-cropped.png" 
            alt="Grand Oaks Property Maintenance" 
            className={cn(
              "w-auto object-contain transition-all duration-300",
              isScrolled ? "h-8 md:h-9" : "h-10 md:h-16 drop-shadow-md"
            )}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  {link.type === "dropdown" ? (
                    <>
                      <NavigationMenuTrigger 
                        className={cn(
                          "bg-transparent text-lg font-medium transition-colors h-auto hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent px-3 py-2",
                          isScrolled 
                            ? "text-brand-charcoal hover:text-brand-green data-[state=open]:text-brand-green" 
                            : "text-white hover:text-brand-orange data-[state=open]:text-brand-orange drop-shadow-md"
                        )}
                      >
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-xl shadow-xl">
                          {Object.entries(servicesData).map(([slug, service]) => (
                            <li key={slug}>
                              <NavigationMenuLink asChild>
                                <WouterLink
                                  href={`/services/${slug}`}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-offwhite hover:text-brand-green focus:bg-brand-offwhite focus:text-brand-green group"
                                >
                                  <div className="flex items-center gap-2 text-sm font-bold leading-none text-brand-charcoal group-hover:text-brand-green">
                                    <service.icon className="w-4 h-4" />
                                    {service.title}
                                  </div>
                                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1 text-gray-500">
                                    {service.subtitle}
                                  </p>
                                </WouterLink>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <a 
                        href={link.href}
                        className={cn(
                          "font-medium transition-colors text-lg block",
                          isScrolled 
                            ? "text-brand-charcoal hover:text-brand-green" 
                            : "text-white hover:text-brand-orange drop-shadow-md"
                        )}
                      >
                        {link.name}
                      </a>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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
                : "bg-white text-brand-green hover:bg-brand-orange hover:text-white"
            )}
            size="lg"
            asChild
          >
            <a href="#estimate-form">Free Estimate</a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <a 
            href="tel:8138607086"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 border",
              isScrolled
                ? "bg-green-50 border-green-200 text-brand-charcoal"
                : "bg-white/90 backdrop-blur-sm border-white/40 text-brand-charcoal shadow-lg"
            )}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wide text-brand-charcoal pt-[1px]">Available Now</span>
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-brand-green" : "text-white"}>
                <Menu className="w-8 h-8 drop-shadow-md" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <div className="flex flex-col gap-6 mt-10">
                <nav className="flex flex-col gap-4">
                  {/* Mobile Services Section */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg text-brand-green">Services</h4>
                    <div className="pl-4 space-y-3 border-l-2 border-gray-100">
                      {Object.entries(servicesData).map(([slug, service]) => (
                        <WouterLink
                          key={slug}
                          href={`/services/${slug}`}
                          className="block text-base font-medium text-gray-600 hover:text-brand-green"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </WouterLink>
                      ))}
                    </div>
                  </div>

                  {navLinks.filter(l => l.type !== 'dropdown').map((link) => (
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
                    <a href="#estimate-form">Get Free Estimate</a>
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
