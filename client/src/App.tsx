import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ServicePage from "@/pages/service-page";
import AboutPage from "@/pages/about-page";
import ReviewsPage from "@/pages/reviews-page";
import ServicesPage from "@/pages/services-page";
import ContactPage from "@/pages/contact-page";
import FAQPage from "@/pages/faq-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about-us" component={AboutPage} />
      <Route path="/about-us/" component={AboutPage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/reviews/" component={ReviewsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/contact/" component={ContactPage} />
      <Route path="/contact/#" component={ContactPage} />
      <Route path="/frequently-asked-questions" component={FAQPage} />
      <Route path="/frequently-asked-questions/" component={FAQPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/" component={ServicesPage} />
      
      {/* Service Routes */}
      <Route path="/services/tree-removal">
        <ServicePage slug="tree-removal" />
      </Route>
      <Route path="/services/tree-trimming">
        <ServicePage slug="tree-trimming" />
      </Route>
      <Route path="/services/stump-grinding">
        <ServicePage slug="stump-grinding" />
      </Route>
      <Route path="/services/land-clearing">
        <ServicePage slug="land-clearing" />
      </Route>
      <Route path="/services/emergency-tree-service">
        <ServicePage slug="emergency-tree-service" />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
