import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification } from "./email";

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

  const SITE_URL = "https://grandoakspropertymaintenance.com";
  const today = new Date().toISOString().split('T')[0];

  app.get("/sitemap.xml", (_req, res) => {
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
    ];

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

Sitemap: ${SITE_URL}/sitemap.xml
`;
    res.set("Content-Type", "text/plain");
    res.send(robots);
  });

  await seedGalleryData();

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
