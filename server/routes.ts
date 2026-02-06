import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

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

  await seedGalleryData();

  return httpServer;
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
