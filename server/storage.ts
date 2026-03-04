import { eq, asc, desc, and, or, ilike, sql, count } from "drizzle-orm";
import { db } from "./db";
import {
  users, contactSubmissions, galleryImages, blogCategories, blogPosts,
  type User, type InsertUser,
  type Contact, type InsertContact,
  type GalleryImage, type InsertGalleryImage,
  type BlogCategory, type InsertBlogCategory,
  type BlogPost, type InsertBlogPost,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getGalleryImages(): Promise<GalleryImage[]>;
  seedGalleryImages(images: InsertGalleryImage[]): Promise<void>;

  getCategories(): Promise<BlogCategory[]>;
  getCategoryBySlug(slug: string): Promise<BlogCategory | undefined>;
  seedCategories(categories: InsertBlogCategory[]): Promise<void>;

  createPost(post: InsertBlogPost): Promise<BlogPost>;
  updatePost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deletePost(id: number): Promise<boolean>;
  getPostById(id: number): Promise<BlogPost | undefined>;
  getPostBySlug(categorySlug: string, postSlug: string): Promise<BlogPost | undefined>;
  getAllPublishedPosts(options: { category?: string; search?: string; page?: number; limit?: number; sort?: string }): Promise<{ posts: BlogPost[]; total: number }>;
  getAllPosts(): Promise<BlogPost[]>;
  getRelatedPosts(categorySlug: string, excludeId: number, limit?: number): Promise<BlogPost[]>;
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

  async getCategories(): Promise<BlogCategory[]> {
    return db.select().from(blogCategories).orderBy(asc(blogCategories.sortOrder));
  }

  async getCategoryBySlug(slug: string): Promise<BlogCategory | undefined> {
    const [category] = await db.select().from(blogCategories).where(eq(blogCategories.slug, slug));
    return category;
  }

  async seedCategories(categories: InsertBlogCategory[]): Promise<void> {
    const existing = await db.select().from(blogCategories);
    if (existing.length === 0) {
      await db.insert(blogCategories).values(categories as (typeof blogCategories.$inferInsert)[]);
    }
  }

  async createPost(post: InsertBlogPost): Promise<BlogPost> {
    const [result] = await db.insert(blogPosts).values(post as typeof blogPosts.$inferInsert).returning();
    return result;
  }

  async updatePost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const updateData = { ...post, updatedAt: new Date() };
    const [result] = await db.update(blogPosts).set(updateData as any).where(eq(blogPosts.id, id)).returning();
    return result;
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getPostBySlug(categorySlug: string, postSlug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(
      and(eq(blogPosts.categorySlug, categorySlug), eq(blogPosts.slug, postSlug), eq(blogPosts.published, true))
    );
    return post;
  }

  async getAllPublishedPosts(options: { category?: string; search?: string; page?: number; limit?: number; sort?: string }): Promise<{ posts: BlogPost[]; total: number }> {
    const { category, search, page = 1, limit = 12, sort = "newest" } = options;
    const conditions = [eq(blogPosts.published, true)];

    if (category) {
      conditions.push(eq(blogPosts.categorySlug, category));
    }

    if (search) {
      conditions.push(
        or(
          ilike(blogPosts.title, `%${search}%`),
          ilike(blogPosts.content, `%${search}%`),
          ilike(blogPosts.excerpt, `%${search}%`)
        )!
      );
    }

    const whereClause = and(...conditions);
    const orderBy = sort === "oldest" ? asc(blogPosts.publishedAt) : desc(blogPosts.publishedAt);

    const [totalResult] = await db.select({ count: count() }).from(blogPosts).where(whereClause);
    const total = totalResult?.count ?? 0;

    const posts = await db.select().from(blogPosts)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(limit)
      .offset((page - 1) * limit);

    return { posts, total };
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getRelatedPosts(categorySlug: string, excludeId: number, limit: number = 6): Promise<BlogPost[]> {
    return db.select().from(blogPosts)
      .where(and(eq(blogPosts.categorySlug, categorySlug), eq(blogPosts.published, true), sql`${blogPosts.id} != ${excludeId}`))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
