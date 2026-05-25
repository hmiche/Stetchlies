import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleGrid } from '@/components/blog/article-grid'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'
import { getPostsByTag, getAllPosts } from '@/lib/posts'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = new Set(posts.flatMap((post) => post.tags.map((tag) => tag.toLowerCase().replace(/\s+/g, '-'))))
  return Array.from(tags).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const displayName = tag.replace(/-/g, ' ')

  return {
    title: `${displayName} - Tagged Articles`,
    description: `Browse all crochet articles tagged with "${displayName}". Find tutorials, patterns, and guides related to ${displayName}.`,
    alternates: {
      canonical: `/tag/${tag}`,
    },
    openGraph: {
      title: `${displayName} - Tagged Articles`,
      description: `Browse all crochet articles tagged with "${displayName}".`,
      type: 'website',
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const displayName = tag.replace(/-/g, ' ')

  // Get posts that have this tag
  const allPosts = await getAllPosts()
  const posts = allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase().replace(/\s+/g, '-') === tag)
  )

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Tags', url: `${siteUrl}/blog` },
          { name: displayName, url: `${siteUrl}/tag/${tag}` },
        ]}
      />

      <div className="container mx-auto py-10">
        <Breadcrumb
          items={[
            { name: 'Blog', href: '/blog' },
            { name: `#${displayName}`, href: `/tag/${tag}` },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
            Tag
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            #{displayName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            All articles tagged with &quot;{displayName}&quot;
          </p>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} with this tag
        </p>

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <ArticleGrid posts={posts} />
        ) : (
          <div className="text-center py-16 bg-card rounded-xl">
            <p className="text-muted-foreground text-lg mb-4">
              No articles found with this tag.
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
