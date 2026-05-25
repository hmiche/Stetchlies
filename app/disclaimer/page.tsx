import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'Disclaimer | Stetchlies',
  description: 'Disclaimer for Stetchlies. Read about affiliate links, sponsored content, advertising, and product recommendations.',
  alternates: {
    canonical: '/disclaimer',
  },
}

export default function DisclaimerPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stetchlies.com'
  const lastUpdated = 'May 25, 2025'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Disclaimer', url: `${siteUrl}/disclaimer` },
        ]}
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
        <Breadcrumb items={[{ name: 'Disclaimer', href: '/disclaimer' }]} />

        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Disclaimer
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-lg max-w-none">
            <h2>General Disclaimer</h2>
            <p>
              The information provided on <strong>Stetchlies</strong> is for general informational and educational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of any information contained on the website.
            </p>

            <h2>Advertising Disclosure</h2>
            <p>
              This website participates in the <strong>Google AdSense</strong> advertising program. This means Google may display advertisements on our pages. These ads are served by Google and may be personalized based on your browsing behavior. We receive compensation when ads are displayed or clicked, which helps us fund the free content on this site.
            </p>
            <p>
              We have no control over the specific ads displayed by Google AdSense. The presence of an ad does not constitute our endorsement of the advertised product or service.
            </p>

            <h2>Affiliate Disclosure</h2>
            <p>
              Cozy Stitches is a participant in various affiliate marketing programs, which means we may earn commissions on purchases made through links on our website. These affiliate relationships include, but are not limited to:
            </p>
            <ul>
              <li>Amazon Associates Program</li>
              <li>Yarn manufacturer affiliate programs</li>
              <li>Craft supply company partnerships</li>
            </ul>
            <p>
              When you click on an affiliate link and make a purchase, we may receive a small commission at no additional cost to you. These commissions help support the running of this website and allow us to continue creating free content.
            </p>
            <p>
              <strong>Important:</strong> Our affiliate relationships do not influence our editorial content. We only recommend products we genuinely believe in and have often used ourselves. Our priority is always to provide honest, helpful information to our readers.
            </p>

            <h2>Sponsored Content</h2>
            <p>
              From time to time, we may publish sponsored content or reviews of products provided by brands. When content is sponsored or products are received for free, we will clearly disclose this at the beginning of the post.
            </p>
            <p>
              Even with sponsored content, all opinions expressed are our own. We only partner with brands whose products we genuinely recommend and believe will benefit our readers.
            </p>

            <h2>Product Reviews</h2>
            <p>
              Our product reviews and recommendations are based on our personal experience and research. Individual results may vary based on factors including:
            </p>
            <ul>
              <li>Personal skill level and technique</li>
              <li>Materials and tools used</li>
              <li>Individual preferences</li>
              <li>Product variations between batches or lots</li>
            </ul>

            <h2>Craft Safety</h2>
            <p>
              When following our patterns and tutorials, please use appropriate safety measures:
            </p>
            <ul>
              <li>Keep small parts (like safety eyes) away from children under 3</li>
              <li>Use scissors and needles with care</li>
              <li>Ensure finished items are safe for their intended recipients</li>
              <li>Follow yarn care instructions to prevent fire hazards</li>
            </ul>
            <p>
              We are not responsible for any injuries or damages resulting from the use of our patterns or following our advice.
            </p>

            <h2>Professional Advice</h2>
            <p>
              The content on this website does not constitute professional advice. For specific questions about:
            </p>
            <ul>
              <li><strong>Health concerns:</strong> Consult a medical professional</li>
              <li><strong>Legal matters:</strong> Consult a qualified attorney</li>
              <li><strong>Business decisions:</strong> Consult appropriate professionals</li>
            </ul>

            <h2>External Links</h2>
            <p>
              Our website contains links to external websites. We are not responsible for the content, accuracy, or privacy practices of these external sites. The inclusion of any link does not imply endorsement or recommendation.
            </p>

            <h2>Changes to This Disclaimer</h2>
            <p>
              We reserve the right to update this disclaimer at any time. Changes will be posted on this page with an updated revision date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this disclaimer or our affiliate relationships, please contact us at:
            </p>
            <ul>
              <li>Email: <a href="mailto:hello@stetchlies.com">hello@stetchlies.com</a></li>
              <li>Contact form: <a href="/contact">/contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
