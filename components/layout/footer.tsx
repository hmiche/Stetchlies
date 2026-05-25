import Image from 'next/image'
import Link from 'next/link'

const quickLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Condition', href: '/terms-of-service' },
  { name: 'GDPR & CCPA', href: '/gdpr-ccpa' },
  { name: 'Disclaimer', href: '/disclaimer' },
  { name: 'Contact us', href: '/contact' },
]

const footerLinks = {
  patterns: [
    { name: 'Free Patterns', href: '/category/free-patterns' },
    { name: 'Beginner Guides', href: '/category/beginner-guides' },
    { name: 'Amigurumi', href: '/category/amigurumi' },
    { name: 'Home Decor', href: '/category/home-decor' },
  ],
  explore: [
    { name: 'About', href: '/about' },
    { name: 'Yarn Reviews', href: '/category/yarn-reviews' },
    { name: 'Contact Me', href: '/contact' },
    { name: 'Search Patterns', href: '/search' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-stone-200/60 bg-stone-50/50 py-16 mt-auto">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand column */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group py-1">
              <Image
                src="/nav-icon.png"
                alt="Stetchlies Icon"
                width={60}
                height={60}
                className="h-10 w-auto object-contain group-hover:-rotate-[8deg] transition-transform duration-500 drop-shadow-md"
              />
              <div className="flex">
                <span className="font-sans text-2xl font-black tracking-tight text-[#32174d] group-hover:opacity-90 transition-opacity">
                  STETCH
                </span>
                <span className="font-sans text-2xl font-black tracking-tight text-[#e83e8c] group-hover:opacity-90 transition-opacity">
                  LIES
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              A dedicated space for the modern maker. We provide high-quality, free amigurumi and crochet patterns with an editorial soul. Handcrafted with care for your creative journey.
            </p>
            <p className="text-xs text-muted-foreground font-semibold italic">
              — Emma Wilson, Creative Director
            </p>
          </div>

          {/* Patterns */}
          <div className="md:col-span-2">
            <h3 className="font-serif font-bold text-foreground mb-4 text-base">Free Patterns</h3>
            <ul className="space-y-3">
              {footerLinks.patterns.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h3 className="font-serif font-bold text-foreground mb-4 text-base">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-serif font-bold text-[#e83e8c] mb-4 text-base">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href} className="flex items-center gap-2">
                  <span className="text-[#e83e8c] font-bold text-xs">›</span>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif font-bold text-foreground text-base">Join the Archive</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Monthly patterns and craft inspiration to your inbox. Bail anytime.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-2.5 text-xs bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
                required
              />
              <button
                type="button"
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#e83e8c] hover:bg-[#d8327d] transition-colors rounded-full uppercase tracking-wider cursor-pointer border-0"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-stone-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Stetchlies. All rights reserved.</span>
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            <Link href="/gdpr-ccpa" className="hover:text-primary transition-colors">GDPR & CCPA</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://pinterest.com/Stetchlies/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#E60023] transition-colors"
              aria-label="Pinterest"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#E1306C] transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
