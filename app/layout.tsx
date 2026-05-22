import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Nunito, Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Link from 'next/link'
import { Home, BookOpen, Bookmark, User } from 'lucide-react'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  title: {
    template: '%s | Cozy Stitches',
    default: 'Cozy Stitches - Free Crochet Patterns & Tutorials',
  },
  description: 'Discover free crochet patterns, beginner-friendly tutorials, and expert tips. From amigurumi to blankets, learn to crochet with our step-by-step guides.',
  keywords: ['crochet', 'crochet patterns', 'free patterns', 'amigurumi', 'beginner crochet', 'yarn crafts', 'handmade'],
  authors: [{ name: 'Cozy Stitches' }],
  creator: 'Cozy Stitches',
  publisher: 'Cozy Stitches',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    siteName: 'Cozy Stitches',
    title: 'Cozy Stitches - Free Crochet Patterns & Tutorials',
    description: 'Discover free crochet patterns, beginner-friendly tutorials, and expert tips for all skill levels.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cozy Stitches - Crochet Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cozy Stitches - Free Crochet Patterns & Tutorials',
    description: 'Discover free crochet patterns, beginner-friendly tutorials, and expert tips.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFBFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1419' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${nunito.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-stone-100/60 text-foreground selection:bg-ami-forest/10 selection:text-ami-forest">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Site-wide centering wrapper — keeps everything within 1280px, centered */}
          <div className="site-wrapper">
            <div className="flex flex-col min-h-screen bg-background shadow-sm">
              <Header />
              <main className="flex-1 pb-16 md:pb-0">{children}</main>
              <Footer />
            </div>
          </div>

          {/* Sticky Bottom Nav for Mobile */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border py-2 px-6 flex justify-around items-center shadow-lg">
            <Link href="/" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors">
              <Home className="h-5 w-5" />
              <span className="text-[10px] font-medium">Home</span>
            </Link>
            <Link href="/blog" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors">
              <BookOpen className="h-5 w-5" />
              <span className="text-[10px] font-medium">Patterns</span>
            </Link>
            <Link href="/search" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors">
              <Bookmark className="h-5 w-5" />
              <span className="text-[10px] font-medium">Saved</span>
            </Link>
            <Link href="/about" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors">
              <User className="h-5 w-5" />
              <span className="text-[10px] font-medium">About</span>
            </Link>
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
