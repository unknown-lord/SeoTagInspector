# SEO Meta Tag Analyzer

## Overview

This is an SEO Meta Tag Analyzer application that allows users to analyze websites for SEO meta tags and receive optimization recommendations. Users enter a URL, and the application fetches and parses the webpage to extract meta tags, displays visual previews (Google search results and social media cards), and provides actionable recommendations for improving SEO. The application is built with a React frontend using shadcn/ui components and an Express backend that scrapes and analyzes web pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React with TypeScript for type safety and component-based development
- Vite as the build tool and development server for fast hot module replacement
- Single-page application (SPA) using Wouter for client-side routing

**UI Component System**
- shadcn/ui component library (New York style) for consistent, accessible components
- Radix UI primitives as the foundation for interactive components
- Tailwind CSS for utility-first styling with custom design tokens
- Design approach focuses on utility and data visualization, inspired by Linear and Vercel Analytics

**State Management**
- TanStack React Query for server state management, caching, and API interactions
- Local component state using React hooks for UI-specific state
- Custom query client configuration with strict caching policies (no refetch on window focus, infinite stale time)

**Component Organization**
- Feature components in `client/src/components/` for domain-specific UI (StatusCard, GooglePreview, SocialMediaPreviews, etc.)
- Shared UI primitives in `client/src/components/ui/` from shadcn/ui
- Page components in `client/src/pages/` (Home, NotFound)
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for the REST API
- Custom middleware for request logging with response capture
- JSON body parsing with raw body preservation for webhook compatibility
- SSRF protection implemented to prevent access to private IP ranges and localhost

**Web Scraping & Analysis**
- Axios for HTTP requests to fetch target websites
- Cheerio for HTML parsing and meta tag extraction
- Schema validation using Zod for request/response type safety
- Extracts: title, description, canonical URL, Open Graph tags, Twitter Card tags, robots, viewport

**API Design**
- RESTful endpoint: `POST /api/analyze-seo` accepts a URL and returns parsed SEO data
- Request validation against private URLs/IP ranges to prevent SSRF attacks
- Structured error handling with descriptive error messages
- Response format follows defined TypeScript interfaces from shared schema

### Data Storage Solutions

**Current Implementation**
- No persistent storage required - application is stateless
- MemStorage stub implementation exists but is unused
- All data is request/response based with no user accounts or saved analyses

**Database Configuration**
- Drizzle ORM configured for PostgreSQL (via `@neondatabase/serverless`)
- Database schema defined in `shared/schema.ts`
- Migrations output to `./migrations` directory
- Database connection via `DATABASE_URL` environment variable
- Note: Database infrastructure is configured but not actively used for core SEO analysis features

### Design System

**Typography**
- Inter font family from Google Fonts
- Hierarchical font weights: 400 (body), 500 (medium), 600 (headings), 700 (bold)
- Monospace font for code/URLs

**Color System**
- HSL-based color tokens with CSS custom properties
- Separate light/dark mode color definitions
- Semantic color naming (primary, secondary, muted, accent, destructive)
- Card and popover variants with separate border colors

**Spacing & Layout**
- Tailwind spacing scale (2, 4, 6, 8, 12, 16)
- Max-width constraint of 5xl for content focus
- Single-column vertical layout for easy scanning
- Responsive design with mobile-first approach

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of accessible component primitives (accordion, dialog, dropdown, popover, tabs, toast, etc.)
- **shadcn/ui**: Pre-built components using Radix UI with Tailwind styling
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant API for component styling
- **tailwind-merge & clsx**: Utility functions for conditional className merging

### Data Fetching & State
- **TanStack React Query**: Server state management and caching
- **Axios**: HTTP client for making requests to target websites
- **Cheerio**: Server-side HTML parsing and DOM manipulation (jQuery-like API)

### Form Handling & Validation
- **Zod**: TypeScript-first schema validation for API requests/responses
- **React Hook Form**: Form state management and validation
- **@hookform/resolvers**: Zod integration for React Hook Form

### Development Tools
- **TypeScript**: Static typing across the entire application
- **Vite**: Fast build tool with HMR for development
- **Replit plugins**: Development banner, error modal overlay, and cartographer for Replit integration
- **esbuild**: Server bundling for production builds

### Routing & Navigation
- **Wouter**: Lightweight client-side routing library

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **@neondatabase/serverless**: Neon Postgres serverless driver
- **drizzle-kit**: CLI tools for schema management and migrations

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation