import { eq, asc } from "drizzle-orm";
import { db } from "./db";
import {
  users, contactSubmissions, galleryImages,
  type User, type InsertUser,
  type Contact, type InsertContact,
  type GalleryImage, type InsertGalleryImage,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getGalleryImages(): Promise<GalleryImage[]>;
  seedGalleryImages(images: InsertGalleryImage[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await db.insert(contactSubmissions).values(contact as typeof contactSubmissions.$inferInsert).returning();
    return result;
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contactSubmissions).orderBy(asc(contactSubmissions.createdAt));
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return db.select().from(galleryImages).orderBy(asc(galleryImages.sortOrder));
  }

  async seedGalleryImages(images: InsertGalleryImage[]): Promise<void> {
    const existing = await db.select().from(galleryImages);
    if (existing.length === 0) {
      await db.insert(galleryImages).values(images as (typeof galleryImages.$inferInsert)[]);
    }
  }
}

export const storage = new DatabaseStorage();
