import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Pencil, Trash2, ArrowLeft, Eye, X } from "lucide-react";
import type { BlogCategory, BlogPost } from "@shared/schema";

const SERVICE_LINKS = [
  { value: "/services/tree-removal", label: "Tree Removal" },
  { value: "/services/tree-trimming", label: "Tree Trimming" },
  { value: "/services/stump-grinding", label: "Stump Grinding" },
  { value: "/services/land-clearing", label: "Land Clearing" },
  { value: "/services/emergency-tree-service", label: "Emergency Tree Services" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Invalid password");
        return;
      }
      const data = await res.json();
      onLogin(data.token);
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-brand-green" />
          </div>
          <CardTitle className="text-2xl font-bold text-brand-charcoal">Blog Admin</CardTitle>
          <p className="text-gray-500 text-sm mt-1">Enter your password to manage blog posts</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              autoFocus
              data-testid="input-admin-password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full h-12 bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-xl" disabled={loading} data-testid="btn-admin-login">
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

interface PostFormData {
  title: string;
  slug: string;
  categorySlug: string;
  excerpt: string;
  content: string;
  primaryServiceLink: string;
  locationTags: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  faqs: { question: string; answer: string }[];
}

const emptyForm: PostFormData = {
  title: "",
  slug: "",
  categorySlug: "",
  excerpt: "",
  content: "",
  primaryServiceLink: "",
  locationTags: "",
  metaTitle: "",
  metaDescription: "",
  published: true,
  faqs: [],
};

function PostForm({
  initial,
  categories,
  token,
  onSaved,
  onCancel,
}: {
  initial?: BlogPost;
  categories: BlogCategory[];
  token: string;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const { toast } = useToast();
  const [form, setForm] = useState<PostFormData>(() => {
    if (initial) {
      return {
        title: initial.title,
        slug: initial.slug,
        categorySlug: initial.categorySlug,
        excerpt: initial.excerpt,
        content: initial.content,
        primaryServiceLink: initial.primaryServiceLink || "",
        locationTags: (initial.locationTags || []).join(", "),
        metaTitle: initial.metaTitle || "",
        metaDescription: initial.metaDescription || "",
        published: initial.published,
        faqs: (initial.faqs as { question: string; answer: string }[]) || [],
      };
    }
    return { ...emptyForm };
  });
  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const updateField = useCallback(<K extends keyof PostFormData>(key: K, value: PostFormData[K]) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugManuallyEdited) {
        next.slug = slugify(value as string);
        if (!prev.metaTitle || prev.metaTitle === prev.title) {
          next.metaTitle = value as string;
        }
      }
      if (key === "excerpt") {
        if (!prev.metaDescription || prev.metaDescription === prev.excerpt) {
          next.metaDescription = value as string;
        }
      }
      return next;
    });
  }, [slugManuallyEdited]);

  const addFaq = () => {
    setForm(prev => ({ ...prev, faqs: [...prev.faqs, { question: "", answer: "" }] }));
  };

  const removeFaq = (index: number) => {
    setForm(prev => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    setForm(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => i === index ? { ...faq, [field]: value } : faq),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      title: form.title,
      slug: form.slug,
      categorySlug: form.categorySlug,
      excerpt: form.excerpt,
      content: form.content,
      primaryServiceLink: form.primaryServiceLink || null,
      locationTags: form.locationTags ? form.locationTags.split(",").map(t => t.trim()).filter(Boolean) : [],
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
      published: form.published,
      faqs: form.faqs.filter(f => f.question.trim() && f.answer.trim()),
    };

    try {
      const url = initial ? `/api/admin/posts/${initial.id}` : "/api/admin/posts";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        toast({ title: "Error", description: data.message || "Failed to save post", variant: "destructive" });
        return;
      }

      toast({ title: "Success", description: initial ? "Post updated" : "Post created" });
      onSaved();
    } catch {
      toast({ title: "Error", description: "Failed to save post", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={onCancel} className="flex items-center gap-1 text-gray-500 hover:text-brand-green transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Posts
        </button>
        <h2 className="text-xl font-bold text-brand-charcoal">{initial ? "Edit Post" : "New Post"}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-brand-charcoal">Title</Label>
            <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="e.g., When Is the Best Time to Trim Trees in Florida?" className="mt-1" required data-testid="input-post-title" />
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-charcoal">Slug</Label>
            <Input value={form.slug} onChange={(e) => { setSlugManuallyEdited(true); updateField("slug", e.target.value); }} placeholder="auto-generated-from-title" className="mt-1 font-mono text-sm" data-testid="input-post-slug" />
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-charcoal">Category</Label>
            <Select value={form.categorySlug} onValueChange={(v) => updateField("categorySlug", v)}>
              <SelectTrigger className="mt-1" data-testid="select-post-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-charcoal">Excerpt</Label>
            <Textarea value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} placeholder="1-2 sentence summary" className="mt-1" rows={2} required data-testid="input-post-excerpt" />
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-charcoal">Primary Service Link</Label>
            <Select value={form.primaryServiceLink} onValueChange={(v) => updateField("primaryServiceLink", v)}>
              <SelectTrigger className="mt-1" data-testid="select-post-service">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_LINKS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-charcoal">Location Tags</Label>
            <Input value={form.locationTags} onChange={(e) => updateField("locationTags", e.target.value)} placeholder="Pasco County, Hillsborough County" className="mt-1" data-testid="input-post-locations" />
            <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-charcoal">Meta Title</Label>
            <Input value={form.metaTitle} onChange={(e) => updateField("metaTitle", e.target.value)} placeholder="SEO title" className="mt-1" data-testid="input-post-meta-title" />
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-charcoal">Meta Description</Label>
            <Textarea value={form.metaDescription} onChange={(e) => updateField("metaDescription", e.target.value)} placeholder="SEO description" className="mt-1" rows={2} data-testid="input-post-meta-desc" />
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={(v) => updateField("published", v)} id="published" data-testid="switch-published" />
            <Label htmlFor="published" className="font-semibold text-brand-charcoal">Published</Label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label className="text-sm font-semibold text-brand-charcoal">Content (Markdown)</Label>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Eye className="w-3 h-3" /> Live Preview Below
              </div>
            </div>
            <Textarea
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="Write your blog post in Markdown..."
              className="mt-1 font-mono text-sm min-h-[300px]"
              rows={15}
              required
              data-testid="input-post-content"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-brand-charcoal mb-2 block">Preview</Label>
            <div className="border border-gray-200 rounded-xl p-5 bg-white max-h-[400px] overflow-y-auto prose prose-sm max-w-none prose-headings:text-brand-charcoal prose-p:text-gray-700">
              {form.content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content}</ReactMarkdown>
              ) : (
                <p className="text-gray-400 italic">Start typing to see preview...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-sm font-semibold text-brand-charcoal">FAQs</Label>
          <Button type="button" variant="outline" size="sm" onClick={addFaq} className="rounded-full" data-testid="btn-add-faq">
            <Plus className="w-4 h-4 mr-1" /> Add FAQ
          </Button>
        </div>
        <div className="space-y-4">
          {form.faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 relative bg-gray-50">
              <button type="button" onClick={() => removeFaq(i)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-2">
                <Input value={faq.question} onChange={(e) => updateFaq(i, "question", e.target.value)} placeholder="Question" className="bg-white" data-testid={`input-faq-question-${i}`} />
                <Textarea value={faq.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} placeholder="Answer" rows={2} className="bg-white" data-testid={`input-faq-answer-${i}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl" data-testid="btn-cancel-post">Cancel</Button>
        <Button type="submit" className="bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-xl px-8" disabled={saving} data-testid="btn-save-post">
          {saving ? "Saving..." : initial ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

function PostsList({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [postsRes, catsRes] = await Promise.all([
        fetch("/api/admin/posts", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/blog/categories"),
      ]);
      const postsData = await postsRes.json();
      const catsData = await catsRes.json();
      setPosts(postsData);
      setCategories(catsData);
    } catch {
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [token, toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast({ title: "Deleted", description: "Post deleted" });
        fetchData();
      }
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  const getCategoryName = (slug: string) => categories.find(c => c.slug === slug)?.name || slug;

  if (view === "create") {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <PostForm categories={categories} token={token} onSaved={() => { setView("list"); fetchData(); }} onCancel={() => setView("list")} />
        </div>
      </div>
    );
  }

  if (view === "edit" && editingPost) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <PostForm initial={editingPost} categories={categories} token={token} onSaved={() => { setView("list"); fetchData(); }} onCancel={() => { setView("list"); setEditingPost(null); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-charcoal">Blog Posts</h1>
            <p className="text-gray-500 text-sm">{posts.length} posts total</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setView("create")} className="bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-xl" data-testid="btn-new-post">
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
            <Button variant="outline" onClick={onLogout} className="rounded-xl text-sm" data-testid="btn-logout">
              Log Out
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl p-4 h-16"></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <Card className="border-none shadow-md rounded-2xl">
            <CardContent className="py-16 text-center">
              <h3 className="text-xl font-bold text-brand-charcoal mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-6">Create your first blog post to get started.</p>
              <Button onClick={() => setView("create")} className="bg-brand-green hover:bg-brand-green/90 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" /> Create Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-xl bg-white" data-testid={`admin-post-${post.id}`}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-brand-charcoal truncate">{post.title}</h3>
                      <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="font-medium text-gray-500">{getCategoryName(post.categorySlug)}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span className="font-mono text-gray-400">/{post.categorySlug}/{post.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingPost(post); setView("edit"); }} data-testid={`btn-edit-${post.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50" data-testid={`btn-delete-${post.id}`}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogAdmin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("admin_token"));

  useEffect(() => {
    document.title = "Blog Admin | Grand Oaks";
  }, []);

  const handleLogin = (t: string) => {
    sessionStorage.setItem("admin_token", t);
    setToken(t);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
  };

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <PostsList token={token} onLogout={handleLogout} />;
}
