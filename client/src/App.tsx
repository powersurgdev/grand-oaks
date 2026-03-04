import { Switch, Route, useParams } from "wouter";
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
import BlogHome from "@/pages/blog-home";
import BlogCategoryPage from "@/pages/blog-category";
import BlogPostPage from "@/pages/blog-post";
import BlogAdmin from "@/pages/blog-admin";

function BlogCategoryRoute() {
  const params = useParams<{ categorySlug: string }>();
  return <BlogCategoryPage slug={params.categorySlug} />;
}

function BlogPostRoute() {
  const params = useParams<{ categorySlug: string; postSlug: string }>();
  return <BlogPostPage categorySlug={params.categorySlug} postSlug={params.postSlug} />;
}

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

      <Route path="/admin" component={BlogAdmin} />
      <Route path="/admin/" component={BlogAdmin} />

      <Route path="/blog" component={BlogHome} />
      <Route path="/blog/" component={BlogHome} />
      <Route path="/blog/:categorySlug" component={BlogCategoryRoute} />
      <Route path="/blog/:categorySlug/" component={BlogCategoryRoute} />
      <Route path="/blog/:categorySlug/:postSlug" component={BlogPostRoute} />
      <Route path="/blog/:categorySlug/:postSlug/" component={BlogPostRoute} />

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
