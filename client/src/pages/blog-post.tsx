import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import ContactForm from "@/components/landing/ContactForm";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
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
      "@id": `https://grandoakspropertymaintenance.com/blog/${post.categorySlug}/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://grandoakspropertymaintenance.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://grandoakspropertymaintenance.com/blog" },
      { "@type": "ListItem", position: 3, name: category?.name || post.categorySlug, item: `https://grandoakspropertymaintenance.com/blog/${post.categorySlug}` },
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
      canonical.href = `https://grandoakspropertymaintenance.com/blog/${categorySlug}/${postSlug}`;
    }
  }, [post, categorySlug, postSlug]);

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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug max-w-3xl mx-auto" data-testid="text-post-title">
              {post.title}
            </h1>
            <p className="text-white/80 mt-3 text-sm">
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </section>

        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="max-w-[680px] mx-auto py-4 flex items-center flex-wrap gap-1.5 text-[13px]" aria-label="Breadcrumb" data-testid="breadcrumbs">
              <Link href="/blog" className="text-gray-500 hover:text-brand-green">Home</Link>
              <span className="text-gray-400">›</span>
              <Link href={`/blog/${categorySlug}`} className="text-gray-500 hover:text-brand-green">{category?.name || categorySlug}</Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-400 truncate max-w-[300px]">{post.title}</span>
            </nav>
          </div>
        </div>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <article className="max-w-[680px] mx-auto">
              <div data-testid="post-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => {
                      const text = typeof children === "string" ? children : String(children);
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                      return <h2 id={id} className="scroll-mt-24 text-[22px] font-bold text-[#1a1a1a] mt-10 mb-3 pb-3 border-b border-gray-200">{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const text = typeof children === "string" ? children : String(children);
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                      return <h3 id={id} className="scroll-mt-24 text-[17px] font-bold text-[#1a1a1a] mt-8 mb-2">{children}</h3>;
                    },
                    p: ({ children }) => (
                      <p className="text-[#3a3a3a] text-[15px] leading-[1.85] mb-5">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-[#1a1a1a] font-semibold">{children}</strong>
                    ),
                    a: ({ children, href }) => (
                      <a href={href} className="text-brand-green hover:underline">{children}</a>
                    ),
                    ul: ({ children }) => (
                      <ul className="my-5 ml-1 space-y-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="my-5 ml-5 space-y-2 list-decimal">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-[#3a3a3a] text-[15px] leading-[1.85] flex items-start gap-3">
                        <span className="mt-[10px] w-[5px] h-[5px] rounded-full bg-[#3a3a3a] shrink-0" />
                        <span className="flex-1">{children}</span>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-300 pl-4 my-5 italic text-gray-500">{children}</blockquote>
                    ),
                    hr: () => <hr className="border-gray-200 my-8" />,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {faqs.length > 0 && (
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-[20px] font-bold text-[#1a1a1a]">Frequently Asked Questions</h2>
                    <button
                      className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
                      data-testid="faq-open-all"
                      onClick={() => {
                        const allValues = faqs.map((_, i) => `faq-${i}`);
                        const accordion = document.querySelector('[data-testid="faq-accordion"]');
                        if (accordion) {
                          allValues.forEach((val) => {
                            const trigger = accordion.querySelector(`[data-value="${val}"] button`) as HTMLButtonElement;
                            if (trigger && trigger.getAttribute("data-state") === "closed") {
                              trigger.click();
                            }
                          });
                        }
                      }}
                    >
                      Open all
                    </button>
                  </div>
                  <Accordion type="multiple" data-testid="faq-accordion">
                    {faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} data-value={`faq-${i}`} className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-normal text-[#2a2a2a] hover:text-brand-green py-4 text-[15px] leading-snug [&>svg]:hidden">
                          <span className="flex items-center justify-between w-full">
                            {faq.question}
                            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-4 transition-transform duration-200" />
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-[#555] pb-4 text-[14px] leading-[1.75]">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {post.primaryServiceLink && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-[15px] text-[#3a3a3a] leading-[1.85] mb-4">
                    {serviceNames[post.primaryServiceLink]
                      ? `Need ${serviceNames[post.primaryServiceLink].toLowerCase()} service? Don't wait for spring to spot the damage. Schedule a ${serviceNames[post.primaryServiceLink].toLowerCase()} inspection to ensure your trees are on track for a healthy season.`
                      : "Don't wait — schedule a tree inspection to ensure your property is safe and your trees are healthy."}
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
                  <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-3">Related Articles</h2>
                  <ul className="space-y-0">
                    {relatedPosts.map((rp) => (
                      <li key={rp.id} className="border-b border-gray-100 last:border-b-0">
                        <Link
                          href={`/blog/${rp.categorySlug}/${rp.slug}`}
                          className="block py-3 text-brand-green hover:underline text-[15px]"
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

        <ContactForm formSource="blog-post" />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
