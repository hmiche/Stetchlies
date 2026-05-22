# Cozy Stitches Crochet Blog – Project Documentation

## Overview
Cozy Stitches is a modern, feature-rich blog platform for sharing free crochet patterns, tutorials, and crafting tips. It is built with Next.js (App Router), TypeScript, Tailwind CSS, and Velite for content management. The project is designed for scalability, SEO, and a delightful user experience.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Main Features](#main-features)
3. [Technologies Used](#technologies-used)
4. [Folder & File Breakdown](#folder--file-breakdown)
5. [Content Management](#content-management)
6. [SEO & Analytics](#seo--analytics)
7. [How to Run](#how-to-run)

---

## Project Structure

```
components.json
next-env.d.ts
next.config.mjs
package.json
pnpm-lock.yaml
postcss.config.mjs
tsconfig.json
velite.config.ts
app/
components/
content/
hooks/
lib/
public/
styles/
```

- **app/**: Main application pages and routing (Next.js App Router)
- **components/**: Reusable UI and layout components
- **content/**: MDX blog posts and content
- **hooks/**: Custom React hooks
- **lib/**: Utility libraries (data, search, types)
- **public/**: Static assets (images, icons, etc.)
- **styles/**: Global and component CSS

---

## Main Features
- Blog with categories, tags, and featured articles
- MDX-based content for rich formatting
- Category, tag, and search navigation
- Responsive, accessible UI with dark mode
- SEO-optimized (Open Graph, Twitter cards, JSON-LD)
- Newsletter signup and contact form
- Privacy, terms, and disclaimer pages
- Analytics integration (Vercel Analytics)

---

## Technologies Used
- **Next.js** (App Router, TypeScript)
- **React 19**
- **Tailwind CSS** (with custom themes)
- **Velite** (content collections, MDX)
- **Radix UI** (accessible UI primitives)
- **Lucide-react** (icons)
- **Vercel Analytics**
- **Fuse.js** (search)
- **date-fns** (date formatting)

---

## Folder & File Breakdown

### app/
- **layout.tsx**: Root layout, global providers, metadata, header/footer
- **page.tsx**: Home page (hero, featured, categories, latest, newsletter)
- **blog/**: Blog listing, article pages, dynamic routing by slug
- **category/**, **tag/**: Filtered article lists
- **about/**, **contact/**, **disclaimer/**, **privacy-policy/**, **terms-of-service/**: Informational pages
- **search/**: Search UI and logic

### components/
- **blog/**: Article cards, grids, category filter, reading progress, related posts, share buttons, table of contents
- **layout/**: Header, footer, breadcrumb, theme toggle
- **seo/**: Structured data (JSON-LD for SEO)
- **ui/**: Button, card, input, dialog, toast, etc. (Radix UI-based)
- **theme-provider.tsx**: Theme context (light/dark)

### content/
- **posts/**: MDX files for each article (pattern, tutorial, guide)

### hooks/
- Custom React hooks (e.g., use-toast, use-mobile)

### lib/
- **posts.ts**: Blog post data and helpers (getAllPosts, getFeaturedPosts, etc.)
- **search.ts**: Search logic (Fuse.js)
- **types.ts**: TypeScript types for posts
- **utils.ts**: Utility functions

### public/
- **images/**: Authors, categories, posts
- **ads.txt**: For ad network verification

### styles/
- **globals.css**: Tailwind base and custom styles

### velite.config.ts
- Velite content collection and MDX config

---

## Content Management
- **MDX posts** are stored in `content/posts/` and defined by the schema in `velite.config.ts`.
- Velite processes MDX files and outputs data for the blog.
- Posts include metadata (title, slug, description, date, author, tags, etc.) and body content.

---

## SEO & Analytics
- **SEO**: Open Graph, Twitter cards, and JSON-LD structured data for articles, breadcrumbs, website, FAQ, and HowTo.
- **Analytics**: Vercel Analytics integration for production.

---

## How to Run
1. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```
2. **Start development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
3. **Build for production:**
   ```sh
   pnpm build
   # or
   npm run build
   ```
4. **Start production server:**
   ```sh
   pnpm start
   # or
   npm start
   ```

---

## Notes
- Environment variables (e.g., `NEXT_PUBLIC_SITE_URL`) should be set for correct metadata and analytics.
- For content editing, add or update MDX files in `content/posts/`.
- For custom styles, edit `styles/globals.css` or extend Tailwind config.

---

## License
Content and code are for educational and personal use. See Terms of Service and Disclaimer pages for details.
