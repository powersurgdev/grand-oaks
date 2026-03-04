import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogCategory, BlogPost } from "@shared/schema";

function useSEO(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://grandoakspropertymaintenance.com/blog/";
  }, [title, description]);
}

export default function BlogHome() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");

  useSEO(
    "Tree Care Blog | Grand Oaks Property Maintenance",
    "Tree care answers for Pasco & Hillsborough County. Expert advice on tree trimming, removal, storm prep, and more from certified arborists."
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: categories } = useQuery<BlogCategory[]>({
    queryKey: ["/api/blog/categories"],
  });

  const { data: postsData, isLoading } = useQuery<{ posts: BlogPost[]; total: number }>({
    queryKey: ["/api/blog/posts", activeCategory, search, page, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeCategory) params.set("category", activeCategory);
      if (search) params.set("search", search);
      params.set("page", page.toString());
      params.set("sort", sort);
      const res = await fetch(`/api/blog/posts?${params}`);
      return res.json();
    },
  });

  const totalPages = postsData ? Math.ceil(postsData.total / 12) : 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryClick = (slug: string | null) => {
    setActiveCategory(slug);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-green selection:text-white">
      <Header />

      <main>
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-brand-green to-[#1a3d18] text-white text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)" }}></div>
          </div>
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)] uppercase leading-tight text-white [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]" data-testid="text-blog-heading">
              Tree Care Answers for Pasco & Hillsborough County
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Expert advice from certified arborists. Find answers to your tree care questions.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 h-14 text-lg rounded-full bg-white text-brand-charcoal border-none shadow-xl"
                data-testid="input-blog-search"
              />
            </div>
          </div>
        </section>

        <section className="py-8 bg-brand-offwhite border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center items-center">
              <button
                onClick={() => handleCategoryClick(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                  !activeCategory
                    ? "bg-brand-green text-white"
                    : "bg-white text-brand-charcoal hover:bg-brand-green/10 border border-gray-200"
                )}
                data-testid="btn-category-all"
              >
                All Topics
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                    activeCategory === cat.slug
                      ? "bg-brand-green text-white"
                      : "bg-white text-brand-charcoal hover:bg-brand-green/10 border border-gray-200"
                  )}
                  data-testid={`btn-category-${cat.slug}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => { setSort("newest"); setPage(1); }}
                className={cn("text-sm font-medium px-3 py-1 rounded transition-colors", sort === "newest" ? "text-brand-green underline underline-offset-4" : "text-gray-500 hover:text-brand-green")}
                data-testid="btn-sort-newest"
              >
                Newest
              </button>
              <button
                onClick={() => { setSort("oldest"); setPage(1); }}
                className={cn("text-sm font-medium px-3 py-1 rounded transition-colors", sort === "oldest" ? "text-brand-green underline underline-offset-4" : "text-gray-500 hover:text-brand-green")}
                data-testid="btn-sort-oldest"
              >
                Oldest
              </button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-brand-offwhite">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse border-none shadow-md rounded-2xl">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : postsData?.posts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-2">No articles found</h3>
                <p className="text-gray-500 mb-6">Try a different search term or browse by category.</p>
                <Button onClick={() => { setSearch(""); setActiveCategory(null); }} className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full" data-testid="btn-clear-search">
                  View All Articles
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {postsData?.posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.categorySlug}/${post.slug}/`} className="block no-underline">
                      <Card className="group border-none shadow-md hover:shadow-xl transition-all rounded-2xl bg-white h-full cursor-pointer" data-testid={`card-post-${post.id}`}>
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <Badge variant="secondary" className="bg-brand-green/10 text-brand-green font-semibold text-xs">
                              {categories?.find(c => c.slug === post.categorySlug)?.name || post.categorySlug}
                            </Badge>
                            {post.locationTags?.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-lg font-bold text-brand-charcoal mb-2 group-hover:text-brand-green transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-gray-400 mt-auto">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-10">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-full"
                      data-testid="btn-page-prev"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>
                    <span className="text-sm text-gray-500">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="rounded-full"
                      data-testid="btn-page-next"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
