# Grand Oaks Property Maintenance Website

## Overview

This is a conversion-focused business website for **Grand Oaks Property Maintenance**, a professional tree removal and certified arborist service based in Pasco County, Florida. The site is designed mobile-first with a premium but approachable feel, optimized for driving phone calls and estimate requests.

The application follows a full-stack architecture with a React frontend and Express backend, using PostgreSQL for data persistence. Key business features include service pages (tree removal, trimming, stump grinding, land clearing, emergency services), a contact/estimate form, a project gallery, customer reviews, and FAQ sections.

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

### Page Structure
- **Home** (`/`): Hero with rotating background images, services grid, why-us section, gallery, reviews carousel, contact form, FAQ
- **Service Pages** (`/services/[slug]`): Dynamic pages for each service with hero, description, process steps, FAQ, sidebar navigation, and inline contact form
- **About Page** (`/about`): Company story, team info, Florida-specific expertise
- **404**: Simple not-found page

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
- **Static Serving**: In production, serves built client from `dist/public`; in development, Vite dev server with HMR

### Database
- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema** (in `shared/schema.ts`):
  - `users` — Basic user table (id, username, password)
  - `contact_submissions` — Form submissions (fullName, phone, service, message, createdAt, read)
  - `gallery_images` — Gallery image entries (src, alt, span, className, sortOrder)
- **Migrations**: Managed via `drizzle-kit push` (schema-push approach, not migration files)
- Gallery data is seeded automatically on server startup with default images

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

### External Services
- **Google Fonts**: Inter and Montserrat font families loaded via CDN
- No other third-party API integrations (no auth providers, payment processors, or analytics currently configured)

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string (must be set for the app to start)