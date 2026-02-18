import { Phone, Menu, ChevronDown, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

function CompanyDropdown({ isScrolled, companyLinks }: { isScrolled: boolean; companyLinks: { name: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={cn(
          "inline-flex items-center gap-1 text-lg font-semibold transition-colors h-auto px-4 py-2 rounded-md",
          open
            ? "bg-white/90 backdrop-blur-sm text-brand-orange shadow-sm"
            : isScrolled 
              ? "bg-transparent text-brand-charcoal hover:text-brand-orange" 
              : "bg-transparent text-white hover:text-brand-orange drop-shadow-md"
        )}
        data-testid="nav-company-dropdown"
        onClick={() => setOpen(!open)}
      >
        Company
        <ChevronDown className={cn("relative top-[1px] h-3 w-3 transition duration-300", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-2 w-[220px]">
            {companyLinks.map((item) => (
              <WouterLink
                key={item.name}
                href={item.href}
                className="flex items-center gap-2.5 select-none rounded-md p-3 no-underline outline-none transition-colors hover:bg-brand-offwhite group"
                data-testid={`link-company-${item.name.toLowerCase()}`}
                onClick={() => setOpen(false)}
              >
                <Star className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="space-y-1">
                  <div className="text-sm font-bold leading-none text-brand-charcoal group-hover:text-brand-charcoal">
                    {item.name}
                  </div>
                  <p className="text-xs leading-snug text-gray-500">
                    See What Our Customers Say
                  </p>
                </div>
              </WouterLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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

  const companyLinks = [
    { name: "About Us", href: "/about-us/" },
    { name: "Reviews", href: "/reviews/" },
  ];

  const navLinks = [
    { name: "Services", href: "#services", type: "dropdown" },
    { name: "Company", href: "#company", type: "company-dropdown" },
    { name: "Our Work", href: "/#gallery", type: "link" },
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
                  ) : link.type === "company-dropdown" ? (
                    <CompanyDropdown isScrolled={isScrolled} companyLinks={companyLinks} />
                  ) : (
                    <NavigationMenuLink asChild>
                      <a 
                        href={link.href}
                        className={cn(
                          "font-semibold transition-colors text-lg block px-4 py-2",
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

        <div className="hidden xl:flex items-center gap-5">
          <a 
            href="tel:8138607086" 
            onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8138607086'); }}
            className={cn(
              "flex items-center gap-2 font-bold text-lg transition-colors whitespace-nowrap",
              isScrolled 
                ? "text-brand-charcoal hover:text-brand-green" 
                : "text-white hover:text-brand-orange drop-shadow-md"
            )}
          >
            <Phone className="w-5 h-5" />
            (813) 860-7086
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
          <a 
            href="tel:8138607086"
            onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8138607086'); }}
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

                  {navLinks.filter(l => l.type !== 'dropdown' && l.type !== 'company-dropdown').map((link) => (
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
                    <a href="tel:8138607086" onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8138607086'); }}>Call (813) 860-7086</a>
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
