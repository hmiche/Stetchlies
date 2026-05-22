'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'Beginner Guides', slug: 'beginner-guides' },
  { name: 'Free Patterns', slug: 'free-patterns' },
  { name: 'Yarn Reviews', slug: 'yarn-reviews' },
  { name: 'Amigurumi', slug: 'amigurumi' },
  { name: 'Home Decor', slug: 'home-decor' },
]

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 bg-background/80 backdrop-blur-md">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Main nav row */}
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group py-1">
            <Image
              src="/nav-icon.png"
              alt="Stetchies Icon"
              width={80}
              height={80}
              className="h-12 sm:h-14 w-auto object-contain group-hover:-rotate-[8deg] transition-transform duration-500 drop-shadow-md"
              priority
            />
            <span className="font-serif text-[28px] sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#d4a373] via-[#b07d62] to-[#8a5a44] bg-clip-text text-transparent group-hover:opacity-90 transition-opacity drop-shadow-sm">
              Stetchies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-semibold transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Link href="/search">
              <Button variant="ghost" size="icon" aria-label="Search" className="text-muted-foreground hover:text-primary hover:bg-stone-100/50 rounded-full transition-colors">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary py-2',
                        pathname === link.href ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <hr className="my-4 border-border" />
                  <p className="text-sm font-medium text-muted-foreground mb-2">Categories</p>
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-muted-foreground hover:text-primary py-1"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Category bar - desktop only */}
        <div className="hidden md:flex items-center gap-8 py-3 border-t border-stone-200/30 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={cn(
                'text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors hover:text-primary',
                pathname === `/category/${category.slug}` ? 'text-primary' : 'text-muted-foreground/80'
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
