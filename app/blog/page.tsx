import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ArticleGrid } from '@/components/blog/article-grid'
import { CategoryFilter } from '@/components/blog/category-filter'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Browse all crochet tutorials, patterns, and guides. Find beginner-friendly projects, yarn reviews, and expert tips.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Crochet Blog - All Articles',
    description: 'Browse all crochet tutorials, patterns, and guides. Find beginner-friendly projects, yarn reviews, and expert tips.',
    type: 'website',
  },
}

interface BlogPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const allPosts = await getAllPosts()
  const categoryFilter = params?.category

  const filteredPosts = categoryFilter
    ? allPosts.filter(
        (post) =>
          post.category.toLowerCase().replace(/\s+/g, '-') === categoryFilter.toLowerCase()
      )
    : allPosts

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Blog', url: `${siteUrl}/blog` },
        ]}
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
        <Breadcrumb items={[{ name: 'Blog', href: '/blog' }]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Crochet Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our collection of tutorials, free patterns, and crafting guides. Whether you&apos;re a beginner or expert, find your next project here.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/search" className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 cursor-pointer"
                readOnly
              />
            </Link>
          </div>
          
          <CategoryFilter activeCategory={categoryFilter || 'all'} />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          {categoryFilter && ` in ${categoryFilter.replace(/-/g, ' ')}`}
        </p>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <ArticleGrid posts={filteredPosts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No articles found in this category.
            </p>
            <Link href="/blog" className="text-primary hover:underline">
              View all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
