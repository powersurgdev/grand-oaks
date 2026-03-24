import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogCategory, BlogPost } from "@shared/schema";
const blogHeroImage = "/images/blog-hero.jpg";
import imgTreeTrimming from "@assets/stock_images/tree_trimming.jpg";
import imgTreeRemoval from "@assets/stock_images/tree_removal.jpg";
import imgStumpGrinding from "@assets/stock_images/stump_grinding.jpg";
import imgLandClearing from "@assets/stock_images/land_clearing.jpg";
import imgStormPrep from "@assets/stock_images/storm_prep.jpg";
import imgEmergencyCleanup from "@assets/stock_images/emergency_cleanup.jpg";
import imgTreeHealth from "@assets/stock_images/tree_health.jpg";
import imgPermitsPricing from "@assets/stock_images/permits_pricing.jpg";
import imgSafetyPro from "@assets/stock_images/safety_pro.jpg";

const categoryImages: Record<string, string> = {
  "tree-trimming": imgTreeTrimming,
  "tree-removal": imgTreeRemoval,
  "stump-grinding": imgStumpGrinding,
  "land-clearing": imgLandClearing,
  "storm-prep": imgStormPrep,
  "emergency-storm-cleanup": imgEmergencyCleanup,
  "tree-health-pests": imgTreeHealth,
  "permits-pricing": imgPermitsPricing,
  "safety-diy-vs-pro": imgSafetyPro,
};

const seasons = ["Spring", "Summer", "Fall", "Winter"];

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
    canonical.href = "https://grandoakspropertymaintenance.com/blog";
  }, [title, description]);
}

export default function BlogHome() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

  const categoryFilter = selectedCategories.length > 0 ? selectedCategories[0] : null;

  const { data: postsData, isLoading } = useQuery<{ posts: BlogPost[]; total: number }>({
    queryKey: ["/api/blog/posts", categoryFilter, search, page, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryFilter) params.set("category", categoryFilter);
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

  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [slug]
    );
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-green selection:text-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${blogHeroImage}')` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug max-w-3xl mx-auto [text-shadow:_0_2px_12px_rgba(0,0,0,0.4)]" data-testid="text-blog-heading">
              Grand Oaks Blog
            </h1>
            <p className="text-white/80 mt-3 text-base md:text-lg max-w-xl mx-auto">
              Expert tree care advice from certified arborists in Pasco & Hillsborough County.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Search */}
              <div>
                <h2 className="text-lg font-bold text-brand-charcoal mb-3">Search Blog</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 h-10 text-sm rounded-md bg-gray-50 border border-gray-200 text-brand-charcoal"
                    data-testid="input-blog-search"
                  />
                </div>
              </div>

              {/* Filters */}
              <div>
                <h3 className="text-base font-bold text-brand-charcoal mb-4 pb-2 border-b-2 border-brand-green">Filters</h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-brand-charcoal mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories?.map((cat) => (
                      <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => handleCategoryToggle(cat.slug)}
                          className="w-4 h-4 rounded border-gray-300 text-brand-green"
                          data-testid={`checkbox-category-${cat.slug}`}
                        />
                        <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Seasons */}
                <div>
                  <h4 className="font-semibold text-sm text-brand-charcoal mb-3">Seasons</h4>
                  <div className="space-y-2">
                    {seasons.map((season) => (
                      <label key={season} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          disabled
                          className="w-4 h-4 rounded border-gray-300 text-brand-green"
                        />
                        <span className="text-sm text-gray-400">
                          {season}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div>
              {/* Sort Dropdown */}
              <div className="flex justify-end mb-6">
                <div className="relative inline-block">
                  <select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                    className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 pr-8"
                    data-testid="select-sort"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Posts Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
                  ))}
                </div>
              ) : postsData?.posts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold text-brand-charcoal mb-2">No articles found</h3>
                  <p className="text-gray-500 mb-6">Try a different search term or browse by category.</p>
                  <Button
                    onClick={() => { setSearch(""); setSelectedCategories([]); }}
                    className="bg-brand-green hover:bg-brand-green/90 text-white rounded-md"
                    data-testid="btn-clear-search"
                  >
                    View All Articles
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {postsData?.posts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.categorySlug}/${post.slug}`}
                        className="block no-underline group"
                      >
                        <div
                          className="relative h-64 rounded-lg overflow-hidden mb-4 bg-gray-200"
                          style={{
                            backgroundImage: `url('${categoryImages[post.categorySlug] || categoryImages["tree-removal"]}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <h3 className="text-lg font-bold text-brand-charcoal group-hover:text-brand-green transition-colors mb-2 leading-snug">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <button
                          className="text-brand-orange font-semibold text-sm hover:underline"
                          data-testid={`btn-read-more-${post.id}`}
                        >
                          Read More
                        </button>
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
                        className="rounded-md"
                        data-testid="btn-page-prev"
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-500">
                        Page {page} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-md"
                        data-testid="btn-page-next"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
