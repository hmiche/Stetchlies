import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Sparkles, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ArticleCard } from '@/components/blog/article-card'
import { ArticleGrid } from '@/components/blog/article-grid'
import { getAllPosts, getFeaturedPosts } from '@/lib/posts'

const categories = [
  { 
    name: 'Animals', 
    slug: 'amigurumi', 
    description: 'Cute animal patterns from beavers to whales.',
    patternCount: 71,
    images: [
      'https://images.unsplash.com/photo-1584984279586-7e44a70bcf47?w=800&q=80',
      'https://images.unsplash.com/photo-1628045952136-1e0e8548c7d3?w=400&q=80',
      'https://images.unsplash.com/photo-1628045951804-0c5a3d758c0c?w=400&q=80'
    ]
  },
  { 
    name: 'Fantasy', 
    slug: 'advanced', 
    description: 'Dragons, unicorns, and magical creatures.',
    patternCount: 8,
    images: [
      'https://images.unsplash.com/photo-1590487005858-6932a3928151?w=800&q=80',
      'https://images.unsplash.com/photo-1590487005953-62c1cfbb0302?w=400&q=80',
      'https://images.unsplash.com/photo-1583091916960-9f5b61517441?w=400&q=80'
    ]
  },
  { 
    name: 'Home Decor', 
    slug: 'home-decor', 
    description: 'Cozy blankets, pillows, and aesthetic accents.',
    patternCount: 24,
    images: [
      'https://images.unsplash.com/photo-1585897621453-294713aef1be?w=800&q=80',
      'https://images.unsplash.com/photo-1616853229712-16e6eb123e4e?w=400&q=80',
      'https://images.unsplash.com/photo-1594968840615-568eb4061a99?w=400&q=80'
    ]
  },
  { 
    name: 'Beginner', 
    slug: 'beginner-guides', 
    description: 'Simple patterns perfect for your first project.',
    patternCount: 156,
    images: [
      'https://images.unsplash.com/photo-1605370966952-441fdfc7de29?w=800&q=80',
      'https://images.unsplash.com/photo-1614216781283-a75d5e9b3117?w=400&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=400&q=80'
    ]
  }
]

export default async function HomePage() {
  const allPosts = await getAllPosts()
  const featuredPosts = await getFeaturedPosts()
  const latestPosts = allPosts.slice(0, 6)
  const popularPosts = allPosts.slice(0, 5)
  const featuredPost = featuredPosts[0] || allPosts[0]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 bg-background">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-7">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm border border-pink-100">
                <Sparkles className="mr-1.5 h-3 w-3" />
                HANDCRAFTED JOY
              </span>
              <h1 className="font-sans text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-[#32174d] leading-[1.05] tracking-tight mb-6">
                Free <span className="text-[#e83e8c]">Amigurumi</span> patterns for everyone.
              </h1>
              <p className="text-lg md:text-xl text-stone-500 leading-relaxed max-w-lg mb-10">
                Browse hundreds of free crochet patterns — from tiny keychains to giant plushies. No sign-up required, just pick a pattern and start crocheting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/category/beginner-guides">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center font-bold bg-white text-stone-700 hover:text-[#e83e8c] shadow-[0_8px_30px_rgb(232,62,140,0.12)] border border-stone-100 h-14 text-[15px] transition-all duration-200 rounded-full px-8 gap-2 cursor-pointer hover:-translate-y-1">
                    Start Crocheting
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/blog">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center font-bold border border-stone-400 bg-transparent hover:bg-stone-50 text-stone-600 h-14 text-[15px] transition-all duration-200 rounded-full px-8 gap-2 cursor-pointer">
                    <BookOpen className="h-4 w-4" /> Browse All
                  </button>
                </Link>
              </div>
              
              {/* Trust/Social Stats */}
              <div className="flex items-center gap-8">
                <div>
                  <span className="block font-black text-[#e83e8c] text-[17px] leading-none">500+</span>
                  <span className="uppercase tracking-widest text-[9px] text-stone-400 font-bold mt-1.5 block">Patterns</span>
                </div>
                <div>
                  <span className="block font-black text-[#e83e8c] text-[17px] leading-none">All Levels</span>
                  <span className="uppercase tracking-widest text-[9px] text-stone-400 font-bold mt-1.5 block">Beginner Friendly</span>
                </div>
                <div>
                  <span className="block font-black text-[#e83e8c] text-[17px] leading-none">New Weekly</span>
                  <span className="uppercase tracking-widest text-[9px] text-stone-400 font-bold mt-1.5 block">Fresh Content</span>
                </div>
              </div>
            </div>

            {/* Right Card/Image Column */}
            <div className="md:col-span-5 relative mt-10 md:mt-0">
              {featuredPost ? (
                <Link 
                  href={`/blog/${featuredPost.slug}`} 
                  className="group block relative aspect-square w-full max-w-lg mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300"
                >
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.coverImageAlt}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[32px]" />
                </Link>
              ) : (
                <div className="relative aspect-square w-full max-w-lg mx-auto rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                  <Image
                    src="https://images.unsplash.com/photo-1584984279586-7e44a70bcf47?w=800&q=80"
                    alt="Beautiful handmade crochet items"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[32px]" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating blurred background circles */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 animate-float-slow" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[320px] h-[320px] bg-secondary/8 rounded-full blur-3xl -z-10 animate-float-medium" />
        <div className="absolute top-1/2 right-1/4 w-[180px] h-[180px] bg-primary/4 rounded-full blur-2xl -z-10 animate-float-fast" />
      </section>

      {/* Editorial Story Block */}
      <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-stone-200/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-black text-heading tracking-tight">What is Cozy Stitches?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cozy Stitches is a dedicated space for the modern maker. We provide high-end, free amigurumi and crochet patterns with an editorial soul. Every pattern is tested and written the way we&apos;d write it for a friend — with detailed stitch guides, clear photos, and honest estimates. First keychain or jumbo blanket, no sign-up, no paywall. Pick one and start the spiral.
          </p>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <section className="px-6 md:px-12 lg:px-20 py-16 bg-stone-50/40 border-t border-stone-200/50">
        <div className="flex items-center justify-between mb-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-[#d97706] rounded-full" />
            <h2 className="font-serif text-3xl font-black text-[#32174d] tracking-tight">Browse by Category</h2>
          </div>
          <Link href="/blog" className="text-[#e83e8c] hover:text-pink-700 text-sm font-bold flex items-center transition-colors">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex h-[280px]">
                {/* Left Large Image */}
                <div className="w-2/3 relative border-r-2 border-white">
                  <Image src={category.images[0]} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                {/* Right Stacked Images */}
                <div className="w-1/3 flex flex-col">
                  <div className="h-1/2 relative border-b-2 border-white">
                    <Image src={category.images[1]} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="h-1/2 relative">
                    <Image src={category.images[2]} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#32174d] group-hover:text-[#e83e8c] transition-colors">{category.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-[#e83e8c] text-[10px] font-bold tracking-wider uppercase">{category.patternCount} patterns</span>
                </div>
                <p className="text-stone-500 text-[15px]">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="bg-stone-50/60 py-24 border-y border-stone-200/50">
        <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              First Time Holding a Hook?
            </span>
            <h2 className="font-serif text-4xl font-black text-heading tracking-tight">
              Start Here
            </h2>
            <p className="text-muted-foreground text-lg">
              Three steps. First chain to finished plushie.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-background rounded-3xl p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow flex flex-col justify-between border-0 ring-1 ring-stone-200/50">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center text-lg">1</div>
                  <BookOpen className="text-secondary h-6 w-6 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-heading mb-4">Crack the Code</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  sc, inc, MR — reads like encryption until it doesn&apos;t. The abbreviations guide decodes every term you&apos;ll hit.
                </p>
              </div>
              <Link href="/blog/crochet-abbreviations-guide" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors group pt-2">
                Read the Abbreviations Guide <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Step 2 */}
            <div className="bg-background rounded-3xl p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow flex flex-col justify-between border-0 ring-1 ring-stone-200/50">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center text-lg">2</div>
                  <Sparkles className="text-secondary h-6 w-6 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-heading mb-4">Pick Something Easy</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  Grab a pattern tagged beginner. Simple stitches, clean photos, zero stuffing acrobatics.
                </p>
              </div>
              <Link href="/category/beginner-guides" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors group pt-2">
                Browse Beginner Patterns <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="bg-background rounded-3xl p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow flex flex-col justify-between border-0 ring-1 ring-stone-200/50">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center text-lg">3</div>
                  <Mail className="text-secondary h-6 w-6 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-heading mb-4">Get the Drop</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  New patterns drop weekly. Straight to your inbox, no spam, bail anytime.
                </p>
              </div>
              <Link href="#newsletter-signup" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors group pt-2">
                Join the Newsletter <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post Card Section */}
      {featuredPost && (
        <section className="px-6 md:px-12 lg:px-20 py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-3xl font-black text-heading tracking-tight">Featured Pattern</h2>
            <Link href="/blog" className="text-primary hover:underline text-sm font-bold flex items-center uppercase tracking-wider">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ArticleCard post={featuredPost} featured />
        </section>
      )}

      {/* Latest Articles Grid */}
      <section className="px-6 md:px-12 lg:px-20 py-20 bg-white border-t border-stone-200/50">
        <div className="flex items-center justify-between mb-12 max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1a2332] tracking-tight">Latest Articles & Tutorials</h2>
        </div>
        <div className="max-w-7xl mx-auto">
          <ArticleGrid posts={latestPosts} />
        </div>
      </section>

      {/* Spotlight: Free Pattern Spotlight + Popular list */}
      <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-stone-200/50">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Spotlight Banner */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-stone-200/40 p-8 md:p-10 shadow-sm relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl -z-10" />
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  Free Pattern Spotlight
                </span>
                <h3 className="font-serif text-3xl font-black text-heading mb-4 leading-tight">
                  Weekend Cozy Blanket
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-8">
                  Create a beautiful chunky blanket perfect for cool evenings. This beginner-friendly pattern uses simple stitches and works up quickly. Get the free pattern and start crafting tonight!
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link href="/blog/cozy-blanket-pattern-free">
                  <button className="inline-flex items-center justify-center font-bold bg-primary text-white hover:opacity-95 h-12 rounded-full px-6 gap-2 cursor-pointer shadow-md">
                    Get Free Pattern
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <div className="flex gap-4 text-xs font-bold text-muted-foreground/80 uppercase tracking-wider">
                  <span>Skill: Beginner</span>
                  <span>Time: 8-10 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular This Week */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-black text-heading mb-6 tracking-tight">Popular This Week</h3>
              <div className="space-y-6">
                {popularPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex items-start gap-4 group"
                  >
                    <span className="font-serif text-3xl font-black text-primary/20 group-hover:text-primary transition-colors leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-heading group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 block">{post.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Banner (Anchor-linked to from step 3) */}
      <section id="newsletter-signup" className="bg-primary text-primary-foreground border-y border-primary/20 relative overflow-hidden">
        <div className="px-6 md:px-12 lg:px-20 py-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Mail className="h-12 w-12 mx-auto mb-2 opacity-90" />
            <h2 className="font-serif text-3xl md:text-4xl font-black mb-4 tracking-tight">Join Our Crochet Community</h2>
            <p className="opacity-90 text-lg leading-relaxed">
              Get free patterns, tutorials, and crafting tips delivered to your inbox every week. Plus, receive an exclusive beginner&apos;s guide when you sign up!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border border-primary-foreground/20 text-white placeholder:text-primary-foreground/50 flex-1 px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                required
              />
              <button 
                type="button" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-bold rounded-full px-6 py-3 text-sm uppercase tracking-wider cursor-pointer border-0"
              >
                Subscribe Free
              </button>
            </div>
            <p className="text-xs opacity-75">
              No spam, unsubscribe anytime. Read our Privacy Policy.
            </p>
          </div>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
      </section>

      {/* About the Author Block */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative aspect-square rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/about-author.jpg"
              alt="Emma Wilson, crochet teacher and pattern designer"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="md:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-black text-heading tracking-tight">
              About Cozy Stitches
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Hi, I&apos;m Emma! After 10+ years of teaching crochet workshops and designing patterns, I created Cozy Stitches to share my love of yarn crafts with makers worldwide.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you&apos;re picking up a hook for the first time or looking for your next challenging project, you&apos;ll find clear tutorials, tested patterns, and honest yarn reviews here.
            </p>
            <div className="pt-2">
              <Link href="/about">
                <button className="inline-flex items-center justify-center font-bold border-2 border-primary/20 bg-transparent hover:bg-primary/5 text-primary h-12 rounded-full px-6 gap-2 cursor-pointer transition-colors">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Website JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Cozy Stitches',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </div>
  )
}
