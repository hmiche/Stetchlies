import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArticleGrid } from '@/components/blog/article-grid'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'
import { getAllCategories, getPostsByCategory, getAllPosts } from '@/lib/posts'
import { slugify } from '@/lib/utils'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Map slugs to display names
const categoryNames: Record<string, string> = {
  'beginner-guides': 'Beginner Guides',
  'free-patterns': 'Free Patterns',
  'yarn-reviews': 'Yarn Reviews',
  'tools-supplies': 'Tools & Supplies',
  'amigurumi': 'Amigurumi',
  'home-decor': 'Home Decor',
  'wearables': 'Wearables',
  'tips-tricks': 'Tips & Tricks',
  'kids': 'Kids',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced',
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = new Set(posts.map((post) => slugify(post.category)))
  return Array.from(categories).map((category) => ({ category }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const displayName = categoryNames[category] || category.replace(/-/g, ' ')

  return {
    title: `${displayName} - Crochet Articles`,
    description: `Browse all ${displayName.toLowerCase()} crochet articles, tutorials, and patterns. Find helpful guides and inspiration for your next project.`,
    alternates: {
      canonical: `/category/${category}`,
    },
    openGraph: {
      title: `${displayName} - Crochet Articles`,
      description: `Browse all ${displayName.toLowerCase()} crochet articles, tutorials, and patterns.`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const displayName = categoryNames[category] || category.replace(/-/g, ' ')

  // Get posts that match this category (fuzzy match on slug)
  const allPosts = await getAllPosts()
  const posts = allPosts.filter(
    (post) => slugify(post.category) === category
  )

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Categories', url: `${siteUrl}/blog` },
          { name: displayName, url: `${siteUrl}/category/${category}` },
        ]}
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
        <Breadcrumb
          items={[
            { name: 'Blog', href: '/blog' },
            { name: displayName, href: `/category/${category}` },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full mb-4">
            Category
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {displayName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our collection of {displayName.toLowerCase()} articles, tutorials, and patterns to inspire your next crochet project.
          </p>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
        </p>

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <ArticleGrid posts={posts} />
        ) : (
          <div className="text-center py-16 bg-card rounded-xl">
            <p className="text-muted-foreground text-lg mb-4">
              No articles found in this category yet.
            </p>
            <Link href="/blog" className="text-primary hover:underline">
              Browse all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
