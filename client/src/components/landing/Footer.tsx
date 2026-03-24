import { Facebook, Instagram, Phone, MapPin, Star, HelpCircle } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-24 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <img
              src="/logo-footer.png"
              alt="Grand Oaks Logo"
              width={400}
              height={400}
              loading="lazy"
              className="h-32 w-auto object-contain mb-6"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Grand Oaks Property Maintenance is your trusted local partner for professional tree care, land clearing, and property development in Pasco County.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-green">Services</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/services/tree-removal" className="hover:text-white transition-colors" data-testid="link-footer-tree-removal">Tree Removal</Link></li>
              <li><Link href="/services/tree-trimming" className="hover:text-white transition-colors" data-testid="link-footer-tree-trimming">Tree Trimming</Link></li>
              <li><Link href="/services/stump-grinding" className="hover:text-white transition-colors" data-testid="link-footer-stump-grinding">Stump Grinding</Link></li>
              <li><Link href="/services/land-clearing" className="hover:text-white transition-colors" data-testid="link-footer-land-clearing">Land Clearing</Link></li>
              <li><Link href="/services/emergency-tree-service" className="hover:text-white transition-colors" data-testid="link-footer-emergency">Emergency Tree Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-green">Service Areas</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Pasco County</li>
              <li>Wesley Chapel</li>
              <li>Land O' Lakes</li>
              <li>Dade City</li>
              <li>Zephyrhills</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-green">Contact Us</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-orange" />
                <a href="tel:8135443721" onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8135443721'); }} className="hover:text-white font-bold">(813) 544-3721</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <span>Wesley Chapel, FL</span>
              </li>
              <li className="flex items-center gap-3">
                <Star className="w-5 h-5 text-brand-orange" />
                <Link href="/reviews/" className="hover:text-white transition-colors" data-testid="link-footer-reviews">Reviews</Link>
              </li>
              <li className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-brand-orange" />
                <Link href="/frequently-asked-questions/" className="hover:text-white transition-colors" data-testid="link-footer-faq">FAQ</Link>
              </li>
            </ul>
            
            <div className="flex gap-4 mt-8">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-green transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-green transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Grand Oaks Property Maintenance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
