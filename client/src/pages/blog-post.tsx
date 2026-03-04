import { useEffect, useMemo } from "react";
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
import { Phone, CalendarCheck, Calendar, MapPin, ChevronRight, ArrowRight, List, BookOpen, HelpCircle, TreePine } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-offwhite font-sans">
        <Header />
        <div className="pt-32 pb-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-8"></div>
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
              {[...Array(8)].map((_, i) => <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>)}
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
    <div className="min-h-screen bg-brand-offwhite font-sans selection:bg-brand-green selection:text-white">
      <Header />
      <BlogPostStructuredData post={post} category={category} />

      <main>
        <section className="relative pt-28 md:pt-36 pb-10 md:pb-14 bg-gradient-to-b from-brand-green to-[#1a3d18] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)" }}></div>
          </div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center flex-wrap gap-1 text-sm text-white/70 mb-6" aria-label="Breadcrumb" data-testid="breadcrumbs">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/blog/" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href={`/blog/${categorySlug}/`} className="hover:text-white transition-colors">{category?.name || categorySlug}</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white font-medium truncate max-w-[200px]">{post.title}</span>
              </nav>

              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <Badge className="bg-white/20 text-white border-white/30 font-semibold backdrop-blur-sm">
                  {category?.name || categorySlug}
                </Badge>
                {post.locationTags?.map((tag) => (
                  <Badge key={tag} className="bg-white/10 text-white/90 border-white/20 flex items-center gap-1 backdrop-blur-sm">
                    <MapPin className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight [text-shadow:_0_2px_8px_rgba(0,0,0,0.3)]" data-testid="text-post-title">
                {post.title}
              </h1>

              <div className="flex items-center text-sm text-white/60 mb-6">
                <Calendar className="w-4 h-4 mr-1.5" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl" data-testid="text-post-excerpt">
                {post.excerpt}
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-10">
                {headings.length > 3 && (
                  <aside className="lg:w-56 lg:shrink-0 lg:order-2">
                    <div className="lg:sticky lg:top-24 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-7 h-7 rounded-lg bg-brand-green/10 flex items-center justify-center">
                          <List className="w-4 h-4 text-brand-green" />
                        </div>
                        <h2 className="font-bold text-brand-charcoal text-sm">In This Article</h2>
                      </div>
                      <nav>
                        <ul className="space-y-1">
                          {headings.map((h, i) => (
                            <li key={i} className={cn(h.level === 3 && "pl-3")}>
                              <a href={`#${h.id}`} className="block py-1.5 text-[13px] leading-snug text-gray-500 hover:text-brand-green transition-colors border-l-2 border-transparent hover:border-brand-green pl-3">
                                {h.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </aside>
                )}

                <article className="flex-1 min-w-0 lg:order-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 md:p-12 lg:p-14">
                    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:text-brand-charcoal prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-5 prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3 prose-h3:text-xl md:prose-h3:text-2xl prose-p:text-gray-600 prose-p:leading-[1.8] prose-a:text-brand-green prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-charcoal prose-li:text-gray-600 prose-li:leading-[1.8] prose-ul:space-y-2 prose-ol:space-y-2 prose-blockquote:border-brand-green prose-blockquote:bg-brand-green/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:not-italic" data-testid="post-content">
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
                  </div>

                  {post.primaryServiceLink && (
                    <div className="mt-8 bg-gradient-to-br from-brand-green via-[#2a5024] to-[#1a3d18] rounded-2xl p-7 sm:p-8 text-white shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 opacity-10">
                        <TreePine className="w-32 h-32 -mt-4 -mr-4" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold">When to Call a Pro</h3>
                        </div>
                        <p className="text-white/85 mb-6 max-w-lg leading-relaxed">
                          Need professional help? Our certified arborists are ready to assist with {serviceNames[post.primaryServiceLink]?.toLowerCase() || "your tree care needs"} in Pasco and Hillsborough County.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-full h-12 px-6 shadow-md">
                            <Link href={post.primaryServiceLink}>
                              Learn About {serviceNames[post.primaryServiceLink] || "Our Services"} <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/15 font-bold rounded-full h-12 px-6">
                            <a href="tel:8135443721">
                              <Phone className="w-4 h-4 mr-2" /> (813) 544-3721
                            </a>
                          </Button>
                          <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/15 font-bold rounded-full h-12 px-6">
                            <a href="#estimate-form">
                              <CalendarCheck className="w-4 h-4 mr-2" /> Free Estimate
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {faqs.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                          <HelpCircle className="w-5 h-5 text-brand-orange" />
                        </div>
                        <h2 className="text-2xl font-bold text-brand-charcoal">Frequently Asked Questions</h2>
                      </div>
                      <Accordion type="multiple" className="space-y-2">
                        {faqs.map((faq, i) => (
                          <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-100 rounded-xl px-5 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                            <AccordionTrigger className="text-left font-semibold text-brand-charcoal hover:text-brand-green py-4 text-[15px]">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </article>
              </div>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="py-12 md:py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-brand-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-charcoal">Related Articles</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.id} href={`/blog/${rp.categorySlug}/${rp.slug}/`} className="block no-underline">
                      <Card className="group border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-green/20 transition-all rounded-xl bg-white h-full cursor-pointer">
                        <CardContent className="p-5">
                          <Badge className="bg-brand-green/10 text-brand-green border-none font-medium text-xs mb-3">
                            {rp.categorySlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <h3 className="font-bold text-brand-charcoal group-hover:text-brand-green transition-colors text-sm leading-snug mb-2">
                            {rp.title}
                          </h3>
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{rp.excerpt}</p>
                          <span className="inline-flex items-center text-xs text-brand-green font-semibold mt-3 group-hover:gap-2 transition-all gap-1">
                            Read more <ArrowRight className="w-3 h-3" />
                          </span>
                        </CardContent>
                      </Card>
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
