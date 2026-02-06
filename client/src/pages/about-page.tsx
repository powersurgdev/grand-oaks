import { ArrowRight, CheckCircle2, Phone, Shield, User, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import { servicesData } from "@/data/services";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-green selection:text-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-green overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold uppercase tracking-wider mb-6 border border-white/30">
              About Grand Oaks Property Maintenance
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
              15 Years of Trusted <br className="hidden md:block" />
              Tree Care in Pasco County
            </h1>
            <p className="text-lg md:text-xl text-brand-offwhite max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
              Grand Oaks Property Maintenance is a Florida-based tree service company built on experience, safety, and a deep understanding of the trees and landscapes that make our state unique. From routine trimming to emergency storm response, we’re proud to serve our local community with professional arborist-led care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-lg h-14 px-8 rounded-full shadow-lg transform transition-all hover:-translate-y-1"
                asChild
              >
                <a href="/#estimate-form">Get Free Estimate</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white hover:text-brand-green font-bold text-lg h-14 px-8 rounded-full transition-all"
                asChild
              >
                <a href="tel:8138607086">Call Now</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 md:py-28 bg-white" id="story">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-6">
                <span className="text-brand-orange font-bold uppercase tracking-wide text-sm">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal leading-tight">
                  Local Roots. <br className="hidden md:block" />
                  Professional Standards.
                </h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Grand Oaks Property Maintenance was founded with one simple goal: provide homeowners and property owners in Pasco County with reliable, high-quality tree services backed by real expertise.
                  </p>
                  <p>
                    With over 15 years of hands-on experience, our team has worked on everything from routine pruning and stump grinding to large hazardous removals and storm cleanup across Florida’s toughest conditions.
                  </p>
                  <p className="font-medium text-brand-charcoal">
                    We’re not a pop-up crew or an out-of-town operation — we’re Florida natives who understand the trees, the weather, and the responsibility that comes with working on your property.
                  </p>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="/images/service-trimming.jpg" 
                    alt="Grand Oaks Team at Work" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-brand-green/10 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-orange/20 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Florida Tree Care Different */}
        <section className="py-20 bg-brand-offwhite">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-6">
                Florida Trees Require Florida Experience
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Tree care in Florida isn’t the same as anywhere else. Our state’s mix of sandy soil, fast-growing species, hurricane seasons, and local regulations makes proper trimming and removal especially important.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 bg-brand-green/10 p-6 rounded-full text-brand-green">
                  <TreeDeciduous className="w-12 h-12" />
                </div>
                <div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our team is familiar with the tree species common throughout Pasco County — including oaks, pines, palms, and storm-sensitive growth — and we approach every job with the knowledge and care needed to keep your property safe and your trees healthy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 md:py-28 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
              <div className="flex-1 space-y-6">
                <span className="text-brand-green font-bold uppercase tracking-wide text-sm">Our Approach</span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal leading-tight">
                  Safety Comes First — Always
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Tree work is serious work. Whether we’re removing a hazardous tree near a home or trimming limbs away from power lines, every project begins with careful planning and professional execution.
                </p>
                
                <ul className="space-y-4 mt-6">
                  {[
                    "Safe, controlled removal and pruning",
                    "Protecting your home, yard, and surrounding structures",
                    "Clean job sites and thorough cleanup",
                    "Honest recommendations from certified professionals"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-lg font-medium text-brand-charcoal">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-base text-gray-500 italic mt-6 pt-6 border-t border-gray-100">
                  Grand Oaks Property Maintenance is fully licensed and insured, so you can feel confident knowing your property is protected throughout the entire process.
                </p>
              </div>
              
              <div className="flex-1 relative w-full">
                <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                  <img 
                    src="/images/service-removal.jpg" 
                    alt="Safety First Approach" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <div className="flex items-center gap-3 text-white">
                      <Shield className="w-8 h-8 text-brand-orange" />
                      <span className="font-bold text-xl">Licensed & Fully Insured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="py-20 bg-brand-charcoal text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Full-Service Tree & Property Clearing Solutions
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We offer a complete range of services to meet the needs of homeowners, landowners, and contractors across Pasco County. Whether it’s one tree or an entire property, we bring the same level of professionalism to every job.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {Object.entries(servicesData).map(([slug, service], i) => (
                <Link key={slug} href={`/services/${slug}`}>
                  <a className="block h-full bg-white/5 border border-white/10 hover:border-brand-green/50 hover:bg-white/10 rounded-xl p-8 transition-all duration-300 group">
                    <div className="bg-brand-green/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors text-brand-green">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-green transition-colors">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {service.subtitle}
                    </p>
                    <div className="flex items-center text-brand-orange text-sm font-bold mt-auto">
                      Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Homeowners Choose Grand Oaks */}
        <section className="py-20 md:py-28 bg-brand-offwhite">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">
                A Team You Can Trust
              </h2>
              <p className="text-lg text-gray-600">Why Pasco County homeowners choose Grand Oaks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "15+ Years Experience", icon: User },
                { title: "Florida Natives", icon: TreeDeciduous },
                { title: "Certified Arborist Standards", icon: Shield },
                { title: "Licensed & Fully Insured", icon: CheckCircle2 },
                { title: "Fast Scheduling", icon: Phone },
                { title: "Complete Cleanup Included", icon: CheckCircle2 },
              ].map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-shadow">
                  <div className="bg-brand-offwhite p-3 rounded-full text-brand-green">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-brand-charcoal text-lg">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA Section */}
        <section className="py-20 bg-brand-green text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Proudly Serving Pasco County and Surrounding Areas
            </h2>
            <p className="text-xl text-brand-offwhite max-w-3xl mx-auto mb-10 leading-relaxed">
              At Grand Oaks Property Maintenance, we believe tree care should be safe, professional, and stress-free. Whether you need routine trimming or urgent storm cleanup, our team is ready to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-lg h-14 px-8 rounded-full shadow-lg"
                asChild
              >
                <a href="/#estimate-form">Request Free Estimate</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-green font-bold text-lg h-14 px-8 rounded-full"
                asChild
              >
                <a href="tel:8138607086">Call (813) 860-7086</a>
              </Button>
            </div>

            <p className="text-sm text-brand-offwhite/80 font-medium">
              Serving Pasco County, Wesley Chapel, Land O’ Lakes, Trinity, Odessa, and nearby communities.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
