import type { Metadata } from 'next'
import { Mail, MessageSquare, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Cozy Stitches. Have questions about patterns, want to collaborate, or just want to say hello? We would love to hear from you!',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Contact', url: `${siteUrl}/contact` },
        ]}
      />

      <div className="px-6 md:px-12 lg:px-20 py-10">
        <Breadcrumb items={[{ name: 'Contact', href: '/contact' }]} />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about patterns, want to collaborate, or just want to say hello? We&apos;d love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                <p className="text-muted-foreground text-sm">
                  hello@cozystitches.com
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond within 24-48 hours
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-chart-3" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground text-sm">
                  Based in Portugal, serving worldwide
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="jane@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your question or idea..."
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" className="rounded-full w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ teaser */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Looking for quick answers? Check out our{' '}
              <a href="/blog" className="text-primary hover:underline">
                tutorials
              </a>{' '}
              and{' '}
              <a href="/category/beginner-guides" className="text-primary hover:underline">
                beginner guides
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
