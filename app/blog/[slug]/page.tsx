import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { ShareButtons } from '@/components/blog/share-buttons'
import { RelatedPosts } from '@/components/blog/related-posts'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { CldImage } from '@/components/ui/cld-image'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { mdxComponents } from '@/components/mdx/MdxComponents'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, 3)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  // Sample headings for the article (in real app, extracted from MDX)
  const headings = [
    { id: 'introduction', text: 'Introduction', level: 2 },
    { id: 'materials-needed', text: 'Materials Needed', level: 2 },
    { id: 'step-by-step', text: 'Step-by-Step Instructions', level: 2 },
    { id: 'tips-and-tricks', text: 'Tips and Tricks', level: 2 },
    { id: 'conclusion', text: 'Conclusion', level: 2 },
  ]

  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${siteUrl}${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      description: post.authorBio,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cozy Stitches',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  }

  return (
    <>
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Blog', url: `${siteUrl}/blog` },
          { name: post.title, url: `${siteUrl}/blog/${post.slug}` },
        ]}
      />

      <article className="min-h-screen px-6 md:px-12 lg:px-20 py-10">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { name: 'Blog', href: '/blog' },
              { name: post.category, href: `/category/${post.category.toLowerCase().replace(/\s+/g, '-')}` },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="bg-accent/10 text-accent mb-4 uppercase tracking-wider text-xs font-bold">
            {post.category}
          </Badge>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 text-balance">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-3xl">
            {post.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-stone-200">
            <div className="flex items-center gap-3">
              {post.authorImage && (
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <span className="font-medium text-foreground">Designed by {post.author}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>

            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <div className="space-y-8">
            {/* Cover Image inside container */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <MDXRemote
                source={post.body}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: 'wrap',
                          properties: {
                            className: ['anchor'],
                          },
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>

            {/* Tags */}
            <div className="pt-8 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Badge variant="outline" className="hover:bg-secondary cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Share buttons */}
            <div className="pt-6 border-t border-border">
              <ShareButtons
                title={post.title}
                url={`${siteUrl}/blog/${post.slug}`}
                description={post.description}
              />
            </div>

            {/* Author bio */}
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-start gap-4">
                {post.authorImage && (
                  <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Written by</p>
                  <h3 className="font-serif text-lg font-bold text-foreground">{post.author}</h3>
                  {post.authorBio && (
                    <p className="mt-2 text-sm text-muted-foreground">{post.authorBio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <TableOfContents headings={headings} />
              </div>

              {/* Newsletter signup */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-serif font-bold text-foreground mb-2">Get Free Patterns</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe for weekly patterns and tutorials delivered to your inbox.
                </p>
                <Link
                  href="#newsletter"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Subscribe Now
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  )
}
