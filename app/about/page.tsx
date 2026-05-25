import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Stetchlies, my mission to share the joy of crochet, and the story behind your favorite patterns and tutorials.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'About', url: `${siteUrl}/about` },
        ]}
      />

      <div className="container mx-auto py-10">
        <Breadcrumb items={[{ name: 'About', href: '/about' }]} />

        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center py-12">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Sharing the Joy of Handmade Creations
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Hi, I&apos;m Sarah — the hands and heart behind Stetchlies. At 40 years old, I&apos;ve turned my lifelong love for crochet into a cozy little space where creativity, comfort, and handmade charm come together.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              What started as a relaxing hobby quickly became a true passion, inspiring me to create patterns, tutorials, and crochet ideas for makers of all skill levels.
            </p>
            <Link href="/contact">
              <Button className="rounded-full">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/images/about-author.jpg"
              alt="Sarah, the hands and heart behind Stetchlies"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </section>


        {/* Mission */}
        <section className="py-12">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">Share the Love</h3>
                <p className="text-muted-foreground">
                  Every pattern is created with love and tested multiple times to ensure you have the best crafting experience possible.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">Build Community</h3>
                <p className="text-muted-foreground">
                  Connect with fellow crafters, share your creations, and be part of a supportive community that celebrates handmade.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-chart-3" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">Quality First</h3>
                <p className="text-muted-foreground">
                  From beginner guides to adorable amigurumi designs, I ensure every piece of content meets the highest standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">My Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Through Stetchlies, I share adorable amigurumi designs, simple step-by-step guides, and creative inspiration to help others discover the joy of crochet. I believe every stitch tells a story, and there&apos;s something special about creating handmade pieces filled with love and personality.
            </p>
            <p>
              When I&apos;m not crocheting with a warm cup of coffee nearby, you&apos;ll usually find me exploring new yarns, testing fresh ideas, or connecting with fellow crochet lovers from around the world.
            </p>
            <p>
              Thank you for being here and supporting this creative journey — I hope Stetchlies inspires you to pick up your hook and create something beautiful. 💕
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Ready to Start Creating?</h2>
          <p className="opacity-90 mb-8 max-w-2xl mx-auto">
            Join fellow crafters who are learning to crochet and creating beautiful handmade pieces with my patterns and tutorials.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/blog">
              <Button variant="secondary" className="rounded-full">
                Browse Patterns
              </Button>
            </Link>
            <Link href="/category/beginner-guides">
              <Button variant="outline" className="rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Start Learning
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
