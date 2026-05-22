import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Cozy Stitches. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const lastUpdated = 'January 1, 2025'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Privacy Policy', url: `${siteUrl}/privacy-policy` },
        ]}
      />

      <div className="px-6 md:px-12 lg:px-20 py-10">
        <Breadcrumb items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />

        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              At Cozy Stitches (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Subscribe to our newsletter</li>
              <li>Fill out a contact form</li>
              <li>Leave comments on our blog posts</li>
              <li>Register for an account</li>
            </ul>
            <p>
              This information may include your name, email address, and any other information you choose to provide.
            </p>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device and your visit, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages you view</li>
              <li>Time spent on pages</li>
              <li>Date and time of your visit</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are stored on your device.
            </p>
            <h3>Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
              <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track ad campaign performance.</li>
            </ul>

            <h2>Google AdSense</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
              . Alternatively, you can opt out of third-party vendors&apos; use of cookies by visiting the{' '}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
                Network Advertising Initiative opt-out page
              </a>
              .
            </p>

            <h2>Google Analytics</h2>
            <p>
              We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website.
            </p>
            <p>
              Google&apos;s privacy policy is available at:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                https://policies.google.com/privacy
              </a>
            </p>

            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Send you newsletters and marketing communications (with your consent)</li>
              <li>Find and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with:
            </p>
            <ul>
              <li>Service providers who assist us in operating our website</li>
              <li>Analytics and advertising partners (in anonymized or aggregated form)</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2>Your Rights (GDPR)</h2>
            <p>
              If you are a resident of the European Union, you have certain data protection rights under the General Data Protection Regulation (GDPR). These include the right to:
            </p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request restriction of processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
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
