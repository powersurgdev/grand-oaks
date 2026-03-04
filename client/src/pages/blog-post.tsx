import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, CalendarCheck, Calendar, MapPin, ChevronRight, ArrowRight, ChevronDown, ChevronUp, BookOpen, HelpCircle, TreePine, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/not-found";
import type { BlogPost, BlogCategory } from "@shared/schema";

const serviceNames: Record<string, string> = {
  "/services/tree-removal": "Tree Removal",
  "/services/tree-trimming": "Tree Trimming",
  "/services/stump-grinding": "Stump Grinding",
  "/services/land-clearing": "Land Clearing",
  "/services/emergency-tree-service": "Emergency Tree Services",
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

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
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

function TableOfContents({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const [open, setOpen] = useState(false);

  if (headings.length < 3) return null;

  return (
    <div className="mb-10 border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-semibold text-brand-charcoal text-base">Table of Contents</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {open && (
        <nav className="px-6 py-4 bg-white">
          <ol className="space-y-2 list-decimal list-inside">
            {headings.filter(h => h.level === 2).map((h, i) => {
              const subheadings = [];
              const startIdx = headings.indexOf(h);
              for (let j = startIdx + 1; j < headings.length; j++) {
                if (headings[j].level === 2) break;
                if (headings[j].level === 3) subheadings.push(headings[j]);
              }
              return (
                <li key={i} className="text-[15px]">
                  <a href={`#${h.id}`} className="text-brand-green hover:text-brand-green/80 transition-colors font-medium">
                    {h.text}
                  </a>
                  {subheadings.length > 0 && (
                    <ol className="mt-1.5 ml-5 space-y-1.5 list-[lower-alpha] list-inside">
                      {subheadings.map((sh, si) => (
                        <li key={si} className="text-sm">
                          <a href={`#${sh.id}`} className="text-gray-500 hover:text-brand-green transition-colors">
                            {sh.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </div>
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
  const readTime = useMemo(() => post ? estimateReadTime(post.content) : 0, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <div className="pt-32 pb-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-pulse space-y-6">
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            <div className="h-12 bg-gray-100 rounded w-3/4"></div>
            <div className="h-5 bg-gray-100 rounded w-full"></div>
            <div className="h-px bg-gray-100 w-full my-8"></div>
            <div className="space-y-4">
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
    <div className="min-h-screen bg-white font-sans selection:bg-brand-green/20 selection:text-brand-green">
      <Header />
      <BlogPostStructuredData post={post} category={category} />

      <main>
        <section className="pt-28 md:pt-36 pb-10 md:pb-14 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <nav className="flex items-center flex-wrap gap-1.5 text-sm text-gray-400 mb-8" aria-label="Breadcrumb" data-testid="breadcrumbs">
                <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/blog/" className="hover:text-brand-green transition-colors">Blog</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href={`/blog/${categorySlug}/`} className="hover:text-brand-green transition-colors">{category?.name || categorySlug}</Link>
              </nav>

              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Link href={`/blog/${categorySlug}/`}>
                  <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 font-semibold hover:bg-brand-green/20 transition-colors cursor-pointer">
                    {category?.name || categorySlug}
                  </Badge>
                </Link>
                {post.locationTags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-gray-400 border-gray-200 font-normal flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-brand-charcoal mb-6 leading-[1.2] tracking-tight" data-testid="text-post-title">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-6" data-testid="text-post-excerpt">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
                <span className="text-gray-200">|</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {readTime} min read
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <TableOfContents headings={headings} />

              <article>
                <div className="
                  prose prose-lg max-w-none
                  prose-headings:text-brand-charcoal prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-600 prose-p:leading-[1.85] prose-p:text-[17px]
                  prose-a:text-brand-green prose-a:font-medium prose-a:underline prose-a:underline-offset-2 prose-a:decoration-brand-green/30 hover:prose-a:decoration-brand-green
                  prose-strong:text-brand-charcoal prose-strong:font-semibold
                  prose-li:text-gray-600 prose-li:leading-[1.85] prose-li:text-[17px] prose-li:marker:text-brand-green
                  prose-ul:space-y-1 prose-ol:space-y-1
                  prose-blockquote:border-l-4 prose-blockquote:border-brand-green prose-blockquote:bg-brand-green/5 prose-blockquote:rounded-r-lg prose-blockquote:py-0.5 prose-blockquote:not-italic prose-blockquote:text-gray-600
                  prose-hr:border-gray-100
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
              </article>

              {post.primaryServiceLink && (
                <div className="mt-14 rounded-2xl overflow-hidden">
                  <div className="bg-brand-green p-8 sm:p-10 relative">
                    <div className="absolute top-0 right-0 opacity-[0.07]">
                      <TreePine className="w-40 h-40 -mt-6 -mr-6" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-brand-orange font-bold text-sm uppercase tracking-wider mb-2">Need Professional Help?</p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Talk to a Certified Arborist</h3>
                      <p className="text-white/80 mb-8 max-w-xl text-[17px] leading-relaxed">
                        Our team specializes in {serviceNames[post.primaryServiceLink]?.toLowerCase() || "professional tree care"} throughout Pasco and Hillsborough County. Get a free estimate today.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-full px-8 shadow-lg shadow-brand-orange/20">
                          <a href="tel:8135443721">
                            <Phone className="w-5 h-5 mr-2" /> (813) 544-3721
                          </a>
                        </Button>
                        <Button asChild size="lg" className="bg-white text-brand-green hover:bg-white/90 font-bold rounded-full px-8">
                          <Link href={post.primaryServiceLink}>
                            Learn About {serviceNames[post.primaryServiceLink] || "Our Services"} <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {faqs.length > 0 && (
                <div className="mt-14">
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl font-bold text-brand-charcoal">Frequently Asked Questions</h2>
                  </div>
                  <Accordion type="multiple" className="space-y-3">
                    {faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-200 rounded-xl px-6 data-[state=open]:bg-gray-50/50 transition-colors">
                        <AccordionTrigger className="text-left font-semibold text-brand-charcoal hover:text-brand-green py-5 text-[16px] leading-snug">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-5 text-[15px] leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="py-14 md:py-20 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-brand-charcoal mb-8 text-center">More Articles You Might Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.id} href={`/blog/${rp.categorySlug}/${rp.slug}/`} className="block no-underline group">
                      <div className="bg-white rounded-xl p-6 h-full border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all">
                        <Badge className="bg-brand-green/10 text-brand-green border-none font-medium text-xs mb-4">
                          {rp.categorySlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                        <h3 className="font-bold text-brand-charcoal group-hover:text-brand-green transition-colors text-base leading-snug mb-3">
                          {rp.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{rp.excerpt}</p>
                        <span className="inline-flex items-center text-sm text-brand-green font-semibold group-hover:gap-2 transition-all gap-1">
                          Read article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
