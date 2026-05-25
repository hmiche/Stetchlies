import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbJsonLd } from '@/components/layout/breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'GDPR & CCPA Compliance | Stetchlies',
  description: 'Learn about your data privacy rights under GDPR and CCPA, and how Stetchlies handles your personal information.',
  alternates: {
    canonical: '/gdpr-ccpa',
  },
}

export default function GdprCcpaPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stetchlies.com'
  const lastUpdated = 'May 25, 2025'

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'GDPR & CCPA', url: `${siteUrl}/gdpr-ccpa` },
        ]}
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10">
        <Breadcrumb items={[{ name: 'GDPR & CCPA', href: '/gdpr-ccpa' }]} />

        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            GDPR & CCPA Compliance
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none text-[#4b5563]">

            <p>
              At <strong>Stetchlies</strong>, we are committed to protecting your privacy and ensuring you have control over your personal data. This page explains your rights under the <strong>General Data Protection Regulation (GDPR)</strong> for European Union residents and the <strong>California Consumer Privacy Act (CCPA)</strong> for California residents.
            </p>

            <h2>Part 1: GDPR (European Union Residents)</h2>

            <h3>What is GDPR?</h3>
            <p>
              The GDPR is a European Union regulation that gives EU residents control over their personal data and standardizes data privacy laws across Europe. It applies to any organization that processes personal data of EU residents, regardless of where the organization is located.
            </p>

            <h3>Legal Basis for Processing Your Data</h3>
            <p>We process your personal data on the following legal bases:</p>
            <ul>
              <li><strong>Consent:</strong> When you subscribe to our newsletter or accept cookies on our website.</li>
              <li><strong>Legitimate Interests:</strong> For analytics and improving our website experience.</li>
              <li><strong>Legal Obligation:</strong> When required by applicable laws.</li>
            </ul>

            <h3>Your GDPR Rights</h3>
            <p>As an EU resident, you have the following rights:</p>
            <ul>
              <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal data.</li>
              <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data.</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
              <li><strong>Right to Object:</strong> Object to processing of your data for direct marketing or legitimate interest purposes.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
              <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local Data Protection Authority.</li>
            </ul>

            <h3>Data Retention</h3>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Newsletter subscribers are retained until they unsubscribe. Contact form submissions are retained for 12 months.
            </p>

            <h3>International Data Transfers</h3>
            <p>
              Your personal data may be transferred to and processed in countries outside the EU/EEA. When we transfer data internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.
            </p>

            <h3>Cookies and Google AdSense (GDPR)</h3>
            <p>
              Our website uses cookies, including those placed by <strong>Google AdSense</strong> to display personalized advertisements. Under GDPR, we obtain your explicit consent before placing non-essential cookies. You can manage your cookie preferences at any time through our cookie settings.
            </p>
            <p>
              Google AdSense may use cookies to serve ads based on your prior visits to our site or other websites. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>

            <hr />

            <h2>Part 2: CCPA (California Residents)</h2>

            <h3>What is CCPA?</h3>
            <p>
              The California Consumer Privacy Act (CCPA) gives California residents specific rights regarding their personal information. It applies to businesses that collect personal information from California residents.
            </p>

            <h3>Categories of Personal Information We Collect</h3>
            <p>In the past 12 months, we have collected the following categories of personal information:</p>
            <ul>
              <li><strong>Identifiers:</strong> Email addresses (when provided for newsletter sign-up or contact).</li>
              <li><strong>Internet Activity:</strong> Browsing history, pages visited, interactions on our website.</li>
              <li><strong>Geolocation Data:</strong> General geographic region (not precise location).</li>
              <li><strong>Inferences:</strong> Preferences and interests drawn from your activity on the site.</li>
            </ul>

            <h3>How We Use Your Personal Information</h3>
            <p>We use your personal information for:</p>
            <ul>
              <li>Operating and improving our website</li>
              <li>Sending newsletters (when subscribed)</li>
              <li>Responding to inquiries</li>
              <li>Displaying relevant advertisements via Google AdSense</li>
              <li>Analytics to understand website usage</li>
            </ul>

            <h3>Do We Sell Personal Information?</h3>
            <p>
              <strong>We do not sell your personal information</strong> to third parties for monetary consideration. However, we do allow advertising partners such as Google AdSense to collect information through cookies for targeted advertising, which may constitute a "sale" under CCPA. You have the right to opt out of this.
            </p>

            <h3>Your CCPA Rights</h3>
            <ul>
              <li><strong>Right to Know:</strong> Request disclosure of the personal information we have collected about you and how it is used and shared.</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of the "sale" of your personal information to third parties.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
              <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information.</li>
              <li><strong>Right to Limit Use:</strong> Limit the use and disclosure of sensitive personal information.</li>
            </ul>

            <h3>Opt-Out of Data Sharing for Advertising</h3>
            <p>
              To opt out of personalized advertising through Google, visit{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or{' '}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a>.
            </p>

            <h3>Shine the Light Law</h3>
            <p>
              California Civil Code Section 1798.83 allows California residents to request information regarding our disclosures of personal information to third parties for their direct marketing purposes. To make such a request, please contact us using the information below.
            </p>

            <hr />

            <h2>Google AdSense & Third-Party Advertising</h2>
            <p>
              We participate in the Google AdSense advertising program. Google uses cookies and similar technologies to show you ads based on your interests and previous visits to our site and other websites. The DoubleClick cookie enables Google and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.
            </p>
            <p>Key points about Google AdSense:</p>
            <ul>
              <li>Google AdSense uses cookies to personalize ads.</li>
              <li>Third-party vendors, including Google, use cookies to serve ads based on prior visits.</li>
              <li>You can opt out of personalized ads through <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices/</a>.</li>
              <li>EU users can opt out at <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">www.youronlinechoices.eu</a>.</li>
            </ul>

            <h2>How to Exercise Your Rights</h2>
            <p>To exercise any of your rights under GDPR or CCPA, please contact us:</p>
            <ul>
              <li>Email: <a href="mailto:hello@stetchlies.com">hello@stetchlies.com</a></li>
              <li>Contact form: <Link href="/contact">/contact</Link></li>
            </ul>
            <p>
              We will respond to your request within <strong>30 days</strong> (GDPR) or <strong>45 days</strong> (CCPA). We may need to verify your identity before fulfilling your request.
            </p>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this page to reflect changes in laws or our data practices. We encourage you to review this page periodically. The "Last updated" date at the top indicates when this policy was last revised.
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
