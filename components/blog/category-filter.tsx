'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Beginner Guides', slug: 'beginner-guides' },
  { name: 'Free Patterns', slug: 'free-patterns' },
  { name: 'Yarn Reviews', slug: 'yarn-reviews' },
  { name: 'Amigurumi', slug: 'amigurumi' },
  { name: 'Home Decor', slug: 'home-decor' },
  { name: 'Wearables', slug: 'wearables' },
  { name: 'Tips & Tricks', slug: 'tips-tricks' },
  { name: 'Tools & Supplies', slug: 'tools-supplies' },
]

interface CategoryFilterProps {
  baseUrl?: string
  activeCategory?: string
}

export function CategoryFilter({ baseUrl = '/blog', activeCategory = 'all' }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const isActive = activeCategory.toLowerCase() === category.slug.toLowerCase()
        const href = category.slug === 'all' ? baseUrl : `${baseUrl}?category=${category.slug}`
        
        return (
          <Link
            key={category.slug}
            href={href}
            className={cn(
              'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {category.name}
          </Link>
        )
      })}
    </div>
  )
}
