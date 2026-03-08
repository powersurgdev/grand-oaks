import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import ContactForm from "@/components/landing/ContactForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, ChevronRight, ArrowRight } from "lucide-react";
import NotFound from "@/pages/not-found";
import type { BlogPost, BlogCategory } from "@shared/schema";

const serviceNames: Record<string, string> = {
  "/services/tree-removal": "Tree Removal",
  "/services/tree-trimming": "Tree Trimming",
  "/services/stump-grinding": "Stump Grinding",
  "/services/land-clearing": "Land Clearing",
  "/services/emergency-tree-service": "Emergency Tree Services",
};

const categoryHeroImages: Record<string, string> = {
  "tree-trimming": "/images/optimized/service-tree-trimming.webp",
  "tree-removal": "/images/optimized/service-tree-removal.webp",
  "stump-grinding": "/images/optimized/service-stump-grinding.webp",
  "land-clearing": "/images/optimized/service-land-clearing.webp",
  "storm-prep": "/images/optimized/service-emergency.webp",
  "emergency-storm-cleanup": "/images/optimized/service-cleanup.webp",
  "tree-health-pests": "/images/optimized/service-tree-trimming.webp",
  "permits-pricing": "/images/optimized/service-forestry.webp",
  "safety-diy-vs-pro": "/images/optimized/gallery-climbing.webp",
};

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      headings.push({ id, text, level });
    }
  }
  return headings;
}

function BlogPostStructuredData({ post, category }: { post: BlogPost; category?: BlogCategory }) {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: { "@type": "Organization", name: "Grand Oaks Property Maintenance" },
    publisher: {
      "@type": "Organization",
      name: "Grand Oaks Property Maintenance",
      url: "https://grandoakspropertymaintenance.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://grandoakspropertymaintenance.com/blog/${post.categorySlug}/${post.slug}/`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://grandoakspropertymaintenance.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://grandoakspropertymaintenance.com/blog/" },
      { "@type": "ListItem", position: 3, name: category?.name || post.categorySlug, item: `https://grandoakspropertymaintenance.com/blog/${post.categorySlug}/` },
      { "@type": "ListItem", position: 4, name: post.title },
    ],
  };

  const faqSchema = post.faqs && (post.faqs as any[]).length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (post.faqs as { question: string; answer: string }[]).map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </>
  );
}

export default function BlogPostPage({ categorySlug, postSlug }: { categorySlug: string; postSlug: string }) {
  useEffect(() => { window.scrollTo(0, 0); }, [categorySlug, postSlug]);

  const { data, isLoading, error } = useQuery<{ post: BlogPost; category: BlogCategory; relatedPosts: BlogPost[] }>({
    queryKey: [`/api/blog/posts/${categorySlug}/${postSlug}`],
    queryFn: async () => {
      const res = await fetch(`/api/blog/posts/${categorySlug}/${postSlug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  const post = data?.post;
  const category = data?.category;
  const relatedPosts = data?.relatedPosts || [];

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle || `${post.title} | Grand Oaks Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const descContent = post.metaDescription || post.excerpt;
      if (metaDesc) metaDesc.setAttribute("content", descContent);
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `https://grandoakspropertymaintenance.com/blog/${categorySlug}/${postSlug}/`;
    }
  }, [post, categorySlug, postSlug]);

  const headings = useMemo(() => post ? extractHeadings(post.content) : [], [post]);
  const faqs = (post?.faqs as { question: string; answer: string }[]) || [];

  const heroImage = categoryHeroImages[categorySlug] || "/images/optimized/hero-bg.webp";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <div className="pt-32 pb-16 container mx-auto px-4">
          <div className="max-w-[750px] mx-auto animate-pulse space-y-6">
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            <div className="h-12 bg-gray-100 rounded w-3/4"></div>
            <div className="h-5 bg-gray-100 rounded w-full"></div>
            <div className="space-y-4 mt-8">
              {[...Array(10)].map((_, i) => <div key={i} className="h-4 bg-gray-100 rounded" style={{ width: `${85 + Math.random() * 15}%` }}></div>)}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <BlogPostStructuredData post={post} category={category} />

      <main>
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 flex items-center justify-center text-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto [text-shadow:_0_2px_12px_rgba(0,0,0,0.4)]" data-testid="text-post-title">
              {post.title}
            </h1>
            <p className="text-white/70 mt-4 text-sm">
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </section>

        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="max-w-[750px] mx-auto py-4 flex items-center flex-wrap gap-1.5 text-sm" aria-label="Breadcrumb" data-testid="breadcrumbs">
              <Link href="/" className="text-brand-green hover:underline">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link href={`/blog/${categorySlug}/`} className="text-brand-green hover:underline">{category?.name || categorySlug}</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-500 truncate max-w-[300px]">{post.title}</span>
            </nav>
          </div>
        </div>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <article className="max-w-[750px] mx-auto">
              <div className="
                prose max-w-none
                prose-p:text-[#444] prose-p:text-[17px] prose-p:leading-[1.85]
                prose-headings:text-brand-green prose-headings:font-bold
                prose-h2:text-[22px] prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-[19px] prose-h3:mt-8 prose-h3:mb-3
                prose-a:text-brand-green prose-a:underline prose-a:underline-offset-2
                prose-strong:text-[#333] prose-strong:font-semibold
                prose-li:text-[#444] prose-li:text-[17px] prose-li:leading-[1.85]
                prose-ul:my-4 prose-ol:my-4
                prose-li:my-1
                prose-blockquote:border-l-4 prose-blockquote:border-brand-green prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-hr:border-gray-200
              " data-testid="post-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, ...props }) => {
                      const text = typeof children === "string" ? children : String(children);
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                      return <h2 id={id} className="scroll-mt-24" {...props}>{children}</h2>;
                    },
                    h3: ({ children, ...props }) => {
                      const text = typeof children === "string" ? children : String(children);
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                      return <h3 id={id} className="scroll-mt-24" {...props}>{children}</h3>;
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {faqs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-[22px] font-bold text-brand-green mb-6">Frequently Asked Questions</h2>
                  <Accordion type="multiple" className="space-y-0 divide-y divide-gray-200 border-t border-b border-gray-200">
                    {faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="border-none">
                        <AccordionTrigger className="text-left font-medium text-[#333] hover:text-brand-green py-4 text-[16px] leading-snug">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#555] pb-4 text-[15px] leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {post.primaryServiceLink && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-[17px] text-[#444] leading-relaxed mb-4">
                    Need help with {serviceNames[post.primaryServiceLink]?.toLowerCase() || "your tree care needs"}? Our certified arborists serve Pasco and Hillsborough County. Schedule a free inspection today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-md px-6">
                      <a href="tel:8135443721">
                        <Phone className="w-4 h-4 mr-2" /> (813) 544-3721
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green/5 font-bold rounded-md px-6">
                      <Link href={post.primaryServiceLink}>
                        {serviceNames[post.primaryServiceLink] || "Our Services"} <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <h2 className="text-[22px] font-bold text-brand-green mb-1 uppercase">Related Articles</h2>
                  <ul className="space-y-0 divide-y divide-gray-100">
                    {relatedPosts.map((rp) => (
                      <li key={rp.id}>
                        <Link
                          href={`/blog/${rp.categorySlug}/${rp.slug}/`}
                          className="block py-3 text-brand-green hover:underline font-medium text-[16px]"
                        >
                          {rp.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </div>
        </section>

        <section id="estimate-form" className="bg-[#1a1a1a] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-2">Request A Free Consultation</h2>
              <p className="text-gray-400 text-center mb-8">Get a no-obligation estimate from our certified arborists.</p>
              <ContactForm formSource="blog-post" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
