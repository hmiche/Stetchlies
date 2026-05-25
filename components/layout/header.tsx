'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, Heart } from 'lucide-react'
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
    <>
      {/* Top Colorful Border */}
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(90deg,#65bcae_0%,#65bcae_25%,#f49e65_25%,#f49e65_50%,#e83e8c_50%,#e83e8c_75%,#8bb2d4_75%,#8bb2d4_100%)]" />
      
      {/* Top Social/CTA Bar */}
      <div className="w-full bg-[#65bcae]">
        <div className="container mx-auto h-10 flex items-center justify-between">
          {/* Social Icons */}
          <div className="flex h-full items-center pl-4 sm:pl-0">
            <a href="#" className="flex items-center justify-center w-10 h-full bg-[#f49e65] text-white hover:bg-[#e08f5a] transition-colors">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-full bg-[#e83e8c] text-white hover:bg-[#d8327d] transition-colors">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345l-.288 1.178c-.046.19-.152.232-.35.139-1.309-.607-2.129-2.522-2.129-4.062 0-3.308 2.403-6.347 6.937-6.347 3.639 0 6.471 2.593 6.471 6.059 0 3.615-2.277 6.525-5.441 6.525-1.063 0-2.062-.553-2.403-1.205l-.655 2.497c-.237.904-.877 2.036-1.307 2.727 1.054.321 2.168.495 3.32.495 6.621 0 11.988-5.365 11.988-11.987C24 5.367 18.638 0 12.017 0z"/></svg>
            </a>
          </div>
          
          {/* Join CTA */}
          <div className="relative h-full hidden sm:block">
            <a href="#newsletter-signup" className="absolute top-0 right-4 lg:right-0 flex items-center justify-center bg-[#e83e8c] text-white px-6 h-[46px] font-bold text-[13px] tracking-wider uppercase hover:bg-[#d8327d] transition-colors rounded-b-2xl shadow-md z-50 whitespace-nowrap">
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Join Our Crochet Corner!
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto">
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
    </>
  )
}
