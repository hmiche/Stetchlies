import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Cozy Stitches. Read our terms and conditions for using our website and content.',
  alternates: {
    canonical: '/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const lastUpdated = 'January 1, 2025'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Terms of Service', url: `${siteUrl}/terms-of-service` },
        ]}
      />

      <div className="container mx-auto py-10">
        <Breadcrumb items={[{ name: 'Terms of Service', href: '/terms-of-service' }]} />

        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-lg max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the Cozy Stitches website (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, you may not access the Service.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Cozy Stitches and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            <h3>Our Content</h3>
            <p>
              All patterns, tutorials, articles, images, and other content published on this website are protected by copyright. You may:
            </p>
            <ul>
              <li>Use our free patterns for personal use</li>
              <li>Sell finished items made from our free patterns (with attribution)</li>
              <li>Share links to our content on social media</li>
            </ul>
            <p>You may NOT:</p>
            <ul>
              <li>Redistribute, copy, or sell our patterns</li>
              <li>Claim our content as your own</li>
              <li>Use our images without permission</li>
              <li>Scrape or automatically collect content from our website</li>
            </ul>

            <h2>User Content</h2>
            <p>
              If you submit content to our website (such as comments or photos of your finished projects), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content in connection with our Service.
            </p>

            <h2>Prohibited Uses</h2>
            <p>You agree not to use the Service:</p>
            <ul>
              <li>For any unlawful purpose</li>
              <li>To solicit others to perform unlawful acts</li>
              <li>To violate any regulations, rules, or laws</li>
              <li>To infringe upon others&apos; intellectual property rights</li>
              <li>To harass, abuse, or harm another person</li>
              <li>To submit false or misleading information</li>
              <li>To upload viruses or malicious code</li>
              <li>To interfere with the security features of the Service</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Service.
            </p>
            <p>
              Crochet patterns and tutorials are provided &quot;as is.&quot; Results may vary based on materials used, skill level, and individual technique. We are not responsible for any errors in finished projects.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall Cozy Stitches, its affiliates, directors, employees, or agents be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages arising out of or in connection with your use of the Service.
            </p>

            <h2>External Links</h2>
            <p>
              Our Service may contain links to third-party websites or services that are not owned or controlled by Cozy Stitches. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Portugal, without regard to its conflict of law provisions.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul>
              <li>Email: hello@cozystitches.com</li>
              <li>Contact form: <a href="/contact">/contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
