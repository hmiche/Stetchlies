import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchContent } from './search-content'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for crochet patterns, tutorials, and guides across our entire blog.',
  alternates: {
    canonical: '/search',
  },
}

import { getAllPosts } from '@/lib/posts'

export default async function SearchPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Search', url: `${siteUrl}/search` },
        ]}
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
        <Breadcrumb items={[{ name: 'Search', href: '/search' }]} />

        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Search Articles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find crochet patterns, tutorials, yarn reviews, and tips across our entire collection.
          </p>
        </div>

        <Suspense fallback={<div className="animate-pulse h-96 bg-card rounded-xl" />}>
          <SearchContent initialPosts={posts} />
        </Suspense>
      </div>
    </div>
  )
}
