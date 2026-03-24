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
    { name: "About Us", href: "/about-us/", type: "page-link" },
    { name: "Reviews", href: "/reviews/", type: "page-link" },
    { name: "Blog", href: "/blog", type: "page-link" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex-shrink-0">
          <img
            src="/logo-text-cropped.png"
            alt="Grand Oaks Property Maintenance"
            width={300}
            height={88}
            loading="eager"
            className={cn(
              "w-auto object-contain transition-all duration-300",
              isScrolled ? "h-8 md:h-10" : "h-10 md:h-14 drop-shadow-md"
            )}
          />
        </a>

        <nav className="hidden xl:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  {link.type === "dropdown" ? (
                    <>
                      <NavigationMenuTrigger 
                        className={cn(
                          "bg-transparent text-lg font-semibold transition-colors h-auto hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent px-4 py-2",
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
                      <WouterLink 
                        href={link.href}
                        className={cn(
                          "font-semibold transition-colors text-lg block px-4 py-2",
                          isScrolled 
                            ? "text-brand-charcoal hover:text-brand-green" 
                            : "text-white hover:text-brand-orange drop-shadow-md"
                        )}
                      >
                        {link.name}
                      </WouterLink>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden xl:flex items-center gap-5">
          <a 
            href="tel:8135443721" 
            onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8135443721'); }}
            className={cn(
              "flex items-center gap-2 font-bold text-lg transition-colors whitespace-nowrap",
              isScrolled 
                ? "text-brand-charcoal hover:text-brand-green" 
                : "text-white hover:text-brand-orange drop-shadow-md"
            )}
          >
            <Phone className="w-5 h-5" />
            (813) 544-3721
          </a>
          <Button 
            className={cn(
              "font-bold rounded-full px-8 text-base transition-all shadow-lg h-12",
              isScrolled
                ? "bg-brand-orange hover:bg-brand-orange/90 text-white"
                : "bg-brand-orange hover:bg-brand-orange/80 text-white"
            )}
            size="lg"
            asChild
          >
            <a href="#estimate-form">Free Estimate</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
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

                  <WouterLink
                    href="/about-us/"
                    className="text-xl font-medium text-foreground hover:text-brand-green transition-colors"
                    onClick={() => setIsOpen(false)}
                    data-testid="mobile-link-about"
                  >
                    About Us
                  </WouterLink>

                  <WouterLink
                    href="/reviews/"
                    className="text-xl font-medium text-foreground hover:text-brand-green transition-colors"
                    onClick={() => setIsOpen(false)}
                    data-testid="mobile-link-reviews"
                  >
                    Reviews
                  </WouterLink>

                  <WouterLink
                    href="/blog"
                    className="text-xl font-medium text-foreground hover:text-brand-green transition-colors"
                    onClick={() => setIsOpen(false)}
                    data-testid="mobile-link-blog"
                  >
                    Blog
                  </WouterLink>

                </nav>
                <div className="flex flex-col gap-3 mt-4">
                  <Button 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-xl h-12 text-lg"
                    asChild
                  >
                    <a href="tel:8135443721" onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8135443721'); }}>Call (813) 544-3721</a>
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
