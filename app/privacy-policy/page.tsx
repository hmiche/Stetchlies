import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Stetchlies',
  description: 'Privacy Policy for Stetchlies. Learn how we collect, use, and protect your personal information in compliance with GDPR and Google AdSense requirements.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stetchlies.com'
  const lastUpdated = 'May 25, 2025'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Privacy Policy', url: `${siteUrl}/privacy-policy` },
        ]}
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
        <Breadcrumb items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />

        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none text-[#4b5563]">

            <h2>Introduction</h2>
            <p>
              Welcome to <strong>Stetchlies</strong> ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit <strong>stetchlies.com</strong>. Please read this policy carefully. By using our site, you agree to the practices described below.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information You Provide</h3>
            <p>We may collect personal information that you voluntarily provide when you:</p>
            <ul>
              <li>Subscribe to our newsletter</li>
              <li>Fill out a contact form</li>
              <li>Leave comments on blog posts</li>
            </ul>
            <p>This information may include your name and email address.</p>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>IP address and general location</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages you view and time spent on pages</li>
              <li>Referring website</li>
              <li>Date and time of your visit</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to operate our website, analyze usage, and deliver personalized advertisements. A cookie is a small file placed on your device.
            </p>
            <h3>Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (e.g., Google Analytics).</li>
              <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track ad campaign performance (e.g., Google AdSense).</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However, disabling certain cookies may limit your experience on the site.
            </p>

            <h2>Google AdSense & Third-Party Advertising</h2>
            <p>
              We use <strong>Google AdSense</strong> to display advertisements on our website. Google AdSense uses cookies, including the DoubleClick cookie, to serve ads based on your prior visits to our website or other websites on the Internet.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites. You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or{' '}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a>.
            </p>
            <p>
              For more information on how Google processes your data, see{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
            </p>

            <h2>Google Analytics</h2>
            <p>
              We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered is used to create reports about the use of our website. Google's privacy policy is available at{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Send you newsletters (only with your consent)</li>
              <li>Display relevant advertising through Google AdSense</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>We do not sell or rent your personal information to third parties. We may share information with:</p>
            <ul>
              <li>Service providers who assist in operating our website (e.g., hosting)</li>
              <li>Advertising and analytics partners (Google AdSense, Google Analytics) — under their own privacy policies</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2>Your Rights (GDPR & CCPA)</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data. Please see our{' '}
              <Link href="/gdpr-ccpa">GDPR & CCPA page</Link> for a full explanation of your rights under EU and California privacy laws.
            </p>

            <h2>Affiliate Disclosure</h2>
            <p>
              Some links on Stetchlies may be affiliate links. This means we may earn a small commission if you click the link and make a purchase. This comes at no extra cost to you and helps support our free content.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our website is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain personal data only as long as necessary for the purposes described in this policy, or as required by law.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this page periodically.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li>Email: <a href="mailto:hello@stetchlies.com">hello@stetchlies.com</a></li>
              <li>Contact form: <Link href="/contact">/contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
