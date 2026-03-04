# Grand Oaks Property Maintenance Website

## Overview

This is a conversion-focused business website for **Grand Oaks Property Maintenance**, a professional tree removal and certified arborist service based in Pasco County, Florida. The site is designed mobile-first with a premium but approachable feel, optimized for driving phone calls and estimate requests.

The application follows a full-stack architecture with a React frontend and Express backend, using PostgreSQL for data persistence. Key business features include service pages (tree removal, trimming, stump grinding, land clearing, emergency services), a contact/estimate form, a project gallery, customer reviews, FAQ sections, and a full SEO-first blog system with admin panel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built with Vite
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS v4 with CSS variables for brand theming (green, orange, red, charcoal, off-white)
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives
- **Animations**: Framer Motion for gallery and hero transitions
- **Data Fetching**: TanStack React Query for server state management
- **Fonts**: Google Fonts (Inter for body, Montserrat for headings)
- **Image Optimization**: Custom sharp-based script generates WebP and optimized JPG variants; lazy loading via custom `LazyImage` component
- **Markdown Rendering**: react-markdown with remark-gfm for blog post content

### Page Structure
- **Home** (`/`): Hero with rotating background images, services grid, why-us section, gallery, reviews carousel, contact form, FAQ
- **Service Pages** (`/services/[slug]`): Dynamic pages for each service with hero, description, process steps, FAQ, sidebar navigation, and inline contact form
- **About Page** (`/about-us/`): Company story, team info, Florida-specific expertise
- **Reviews** (`/reviews/`): Google Reviews widget, contact form
- **Contact** (`/contact/`): Contact/estimate form
- **FAQ** (`/frequently-asked-questions/`): Frequently asked questions
- **Blog Home** (`/blog/`): Search bar, category filter chips, post cards with pagination
- **Blog Category** (`/blog/:categorySlug/`): Category-filtered post listing with search
- **Blog Post** (`/blog/:categorySlug/:postSlug/`): Full article with breadcrumbs, TOC, markdown content, "When to Call a Pro" CTA, FAQ accordion, related posts, structured data (BlogPosting, FAQPage, BreadcrumbList)
- **Blog Admin** (`/admin/`): Password-protected admin panel for creating/editing/deleting blog posts
- **404**: Simple not-found page

### Blog System
- **9 Categories**: tree-trimming, tree-removal, stump-grinding, land-clearing, storm-prep, emergency-storm-cleanup, tree-health-pests, permits-pricing, safety-diy-vs-pro
- **Admin Panel** (`/admin/`): Simple password auth (BLOG_ADMIN_PASSWORD env var), markdown editor with live preview, auto-slug generation, category/service link dropdowns, FAQ builder, publish/draft toggle
- **SEO Features**: BlogPosting JSON-LD, FAQPage JSON-LD, BreadcrumbList JSON-LD, dynamic meta tags, canonical URLs, sitemap integration
- **Content stored in PostgreSQL**: blog_categories and blog_posts tables
- **Seed data**: 9 sample posts (one per category) seeded on first startup

### Mobile-First Design Priorities
- Sticky header with logo + call button + hamburger menu
- Persistent bottom sticky CTA bar on mobile (Call Now + Estimate buttons)
- All layouts optimized for phone screens first, scaling up for desktop
- Rounded corners, generous padding, clean spacing throughout

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx for dev, esbuild for production)
- **API Routes**: RESTful endpoints under `/api/`
  - `POST /api/contact` — Submit contact/estimate form (validated with Zod)
  - `GET /api/gallery` — Fetch gallery images from database
  - `GET /api/blog/categories` — List blog categories
  - `GET /api/blog/posts` — List published posts (supports category, search, page, sort params)
  - `GET /api/blog/posts/:categorySlug/:postSlug` — Get single post with category and related posts
  - `POST /api/admin/login` — Admin login (validates against BLOG_ADMIN_PASSWORD)
  - `GET /api/admin/posts` — List all posts including drafts (auth required)
  - `POST /api/admin/posts` — Create blog post (auth required)
  - `PUT /api/admin/posts/:id` — Update blog post (auth required)
  - `DELETE /api/admin/posts/:id` — Delete blog post (auth required)
- **Static Serving**: In production, serves built client from `dist/public`; in development, Vite dev server with HMR

### Database
- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema** (in `shared/schema.ts`):
  - `users` — Basic user table (id, username, password)
  - `contact_submissions` — Form submissions (fullName, phone, service, message, createdAt, read)
  - `gallery_images` — Gallery image entries (src, alt, span, className, sortOrder)
  - `blog_categories` — Blog categories (id, name, slug, description, sortOrder)
  - `blog_posts` — Blog posts (id, title, slug, categorySlug, excerpt, content, publishedAt, updatedAt, metaTitle, metaDescription, primaryServiceLink, locationTags, published, faqs)
- **Migrations**: Managed via `drizzle-kit push` (schema-push approach, not migration files)
- Gallery data and blog data are seeded automatically on server startup if tables are empty

### Shared Code
- `shared/schema.ts` contains all database table definitions, Zod validation schemas, and TypeScript types used by both frontend and backend

### Build System
- **Development**: `tsx server/index.ts` runs the Express server which sets up Vite middleware for HMR
- **Production Build**: Custom `script/build.ts` runs Vite build for client and esbuild for server, outputting to `dist/`
- **Image Optimization**: `scripts/optimize-images.ts` uses sharp to create WebP/JPG variants at max 1200px width

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### Database
- **PostgreSQL**: Required. Connection via `DATABASE_URL` environment variable. Uses `pg` driver with `connect-pg-simple` for session storage capability.

### Key NPM Packages
- **Drizzle ORM + drizzle-zod**: Database ORM and schema validation
- **Express**: HTTP server framework
- **TanStack React Query**: Client-side data fetching/caching
- **Framer Motion**: Animations
- **shadcn/ui + Radix UI**: Component library
- **Wouter**: Client-side routing
- **Zod**: Schema validation (shared between client and server)
- **Sharp**: Image optimization (build-time tooling)
- **Embla Carousel**: Review carousel component
- **react-markdown + remark-gfm**: Markdown rendering for blog posts

### External Services
- **Google Fonts**: Inter and Montserrat font families loaded via CDN
- **SendGrid**: Email notifications for contact form submissions (from info@vergaelectric.com)
- **Pulse Analytics**: CRM webhook integration for lead tracking
- **Google Tag Manager**: GTM-PHNPFMSH for analytics
- **Google Ads**: AW-17492567607 for conversion tracking (click-to-call + form submissions)

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string (must be set for the app to start)
- `BLOG_ADMIN_PASSWORD`: Password for the blog admin panel at /admin/
- `PULSE_API_KEY`: API key for Pulse Analytics CRM webhook
- `PULSE_WEBHOOK_URL`: Webhook URL for Pulse Analytics CRM
