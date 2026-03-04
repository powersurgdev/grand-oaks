import type { Express, Request, Response, NextFunction } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification } from "./email";
import { seedBlogData } from "./seed-blog";
import crypto from "crypto";

function hashToken(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const adminPassword = process.env.BLOG_ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ message: "Admin not configured" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.slice(7);
  const expectedToken = hashToken(adminPassword);

  if (token !== expectedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Please fill in all required fields.",
          errors: result.error.flatten().fieldErrors 
        });
      }
      const contact = await storage.createContact(result.data);

      sendContactNotification(contact).catch((err) => {
        console.error("Email notification failed (non-blocking):", err);
      });

      sendToPulse(contact).catch((err) => {
        console.error("Pulse webhook failed (non-blocking):", err);
      });

      return res.status(201).json({ 
        message: "Thank you! We'll get back to you shortly.",
        id: contact.id 
      });
    } catch (error) {
      console.error("Contact submission error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  app.get("/api/gallery", async (_req, res) => {
    try {
      const images = await storage.getGalleryImages();
      return res.json(images);
    } catch (error) {
      console.error("Gallery fetch error:", error);
      return res.status(500).json({ message: "Failed to load gallery." });
    }
  });

  app.get("/api/blog/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      return res.json(categories);
    } catch (error) {
      console.error("Blog categories fetch error:", error);
      return res.status(500).json({ message: "Failed to load categories." });
    }
  });

  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { category, search, page, sort } = req.query;
      const result = await storage.getAllPublishedPosts({
        category: category as string | undefined,
        search: search as string | undefined,
        page: page ? parseInt(page as string, 10) : 1,
        sort: sort as string | undefined,
      });
      return res.json(result);
    } catch (error) {
      console.error("Blog posts fetch error:", error);
      return res.status(500).json({ message: "Failed to load posts." });
    }
  });

  app.get("/api/blog/posts/:categorySlug/:postSlug", async (req, res) => {
    try {
      const { categorySlug, postSlug } = req.params;
      const post = await storage.getPostBySlug(categorySlug, postSlug);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
      const category = await storage.getCategoryBySlug(categorySlug);
      const relatedPosts = await storage.getRelatedPosts(categorySlug, post.id, 6);
      return res.json({ post, category, relatedPosts });
    } catch (error) {
      console.error("Blog post fetch error:", error);
      return res.status(500).json({ message: "Failed to load post." });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = process.env.BLOG_ADMIN_PASSWORD;

      if (!adminPassword) {
        return res.status(500).json({ message: "Admin not configured" });
      }

      if (password !== adminPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = hashToken(adminPassword);
      return res.json({ token });
    } catch (error) {
      console.error("Admin login error:", error);
      return res.status(500).json({ message: "Login failed." });
    }
  });

  app.get("/api/admin/posts", requireAdmin, async (_req, res) => {
    try {
      const posts = await storage.getAllPosts();
      return res.json(posts);
    } catch (error) {
      console.error("Admin posts fetch error:", error);
      return res.status(500).json({ message: "Failed to load posts." });
    }
  });

  app.post("/api/admin/posts", requireAdmin, async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Validation failed.",
          errors: result.error.flatten().fieldErrors,
        });
      }
      const post = await storage.createPost(result.data);
      return res.status(201).json(post);
    } catch (error) {
      console.error("Create post error:", error);
      return res.status(500).json({ message: "Failed to create post." });
    }
  });

  app.put("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID." });
      }
      const updateSchema = insertBlogPostSchema.partial();
      const validated = updateSchema.safeParse(req.body);
      if (!validated.success) {
        return res.status(400).json({
          message: "Validation failed.",
          errors: validated.error.flatten().fieldErrors,
        });
      }
      const post = await storage.updatePost(id, validated.data);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
      return res.json(post);
    } catch (error) {
      console.error("Update post error:", error);
      return res.status(500).json({ message: "Failed to update post." });
    }
  });

  app.delete("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID." });
      }
      const deleted = await storage.deletePost(id);
      if (!deleted) {
        return res.status(404).json({ message: "Post not found." });
      }
      return res.json({ message: "Post deleted." });
    } catch (error) {
      console.error("Delete post error:", error);
      return res.status(500).json({ message: "Failed to delete post." });
    }
  });

  const SITE_URL = "https://grandoakspropertymaintenance.com";
  const today = new Date().toISOString().split('T')[0];

  app.get("/sitemap.xml", async (_req, res) => {
    const pages = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/about-us/", priority: "0.8", changefreq: "monthly" },
      { loc: "/reviews/", priority: "0.8", changefreq: "weekly" },
      { loc: "/contact/", priority: "0.8", changefreq: "monthly" },
      { loc: "/frequently-asked-questions/", priority: "0.7", changefreq: "monthly" },
      { loc: "/services/", priority: "0.8", changefreq: "monthly" },
      { loc: "/services/tree-removal", priority: "0.9", changefreq: "monthly" },
      { loc: "/services/tree-trimming", priority: "0.9", changefreq: "monthly" },
      { loc: "/services/stump-grinding", priority: "0.9", changefreq: "monthly" },
      { loc: "/services/land-clearing", priority: "0.9", changefreq: "monthly" },
      { loc: "/services/emergency-tree-service", priority: "0.9", changefreq: "monthly" },
      { loc: "/blog/", priority: "0.8", changefreq: "daily" },
    ];

    try {
      const categories = await storage.getCategories();
      for (const cat of categories) {
        pages.push({ loc: `/blog/${cat.slug}/`, priority: "0.7", changefreq: "weekly" });
      }

      const { posts } = await storage.getAllPublishedPosts({ limit: 1000 });
      for (const post of posts) {
        pages.push({ loc: `/blog/${post.categorySlug}/${post.slug}/`, priority: "0.6", changefreq: "monthly" });
      }
    } catch (error) {
      console.error("Error building blog sitemap entries:", error);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.set("Content-Type", "application/xml");
    res.send(xml);
  });

  app.get("/robots.txt", (_req, res) => {
    const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`;
    res.set("Content-Type", "text/plain");
    res.send(robots);
  });

  await seedGalleryData();
  await seedBlogData();

  return httpServer;
}

async function sendToPulse(contact: {
  fullName: string;
  phone: string;
  service: string;
  message?: string | null;
  deviceType?: string | null;
  formSource?: string | null;
}) {
  const webhookUrl = process.env.PULSE_WEBHOOK_URL;
  const apiKey = process.env.PULSE_API_KEY;

  if (!webhookUrl || !apiKey) {
    console.warn("Pulse webhook not configured — skipping CRM sync");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      fullName: contact.fullName,
      phone: contact.phone,
      service: contact.service,
      message: contact.message || "",
      deviceType: contact.deviceType || "desktop",
      formSource: contact.formSource || "website",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pulse webhook returned ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  console.log("Lead sent to Pulse Analytics:", data);
  return data;
}

async function seedGalleryData() {
  const defaultImages = [
    { src: "/images/optimized/gallery-residential-job.webp", alt: "Tight Access Work", span: "col-span-1 md:col-span-1 row-span-2", sortOrder: 1 },
    { src: "/images/optimized/gallery-crane-pool.webp", alt: "Zero-Impact Removal", span: "col-span-1 md:col-span-1", sortOrder: 2 },
    { src: "/images/optimized/gallery-crane-setup.webp", alt: "Crane Operations", span: "col-span-1 md:col-span-1", sortOrder: 3 },
    { src: "/images/optimized/gallery-team-work.webp", alt: "Tree Crew", span: "col-span-1 md:col-span-1", sortOrder: 4 },
    { src: "/images/optimized/gallery-bucket-truck.webp", alt: "Bucket Truck Service", span: "col-span-1 md:col-span-1 row-span-2", sortOrder: 5 },
    { src: "/images/optimized/gallery-machinery.webp", alt: "Land Clearing", span: "col-span-1 md:col-span-2", sortOrder: 6 },
    { src: "/images/optimized/gallery-crane-lift.webp", alt: "Sectional Removal", span: "col-span-1 md:col-span-1", sortOrder: 7 },
    { src: "/images/optimized/gallery-climber-action.webp", alt: "Expert Climbing", span: "col-span-1 md:col-span-1", className: "object-[50%_25%]", sortOrder: 8 },
    { src: "/images/optimized/gallery-stump-removal.webp", alt: "Stump Removal", span: "col-span-1 md:col-span-1", sortOrder: 9 },
  ];

  try {
    await storage.seedGalleryImages(defaultImages);
    console.log("Gallery images seeded successfully");
  } catch (error) {
    console.error("Error seeding gallery:", error);
  }
}
