'use client'

import Script from 'next/script'

interface BreadcrumbItem {
  name: string
  url: string
}

interface ArticleStructuredDataProps {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    url?: string
  }
  url: string
  breadcrumbs?: BreadcrumbItem[]
}

export function ArticleStructuredData({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
  breadcrumbs,
}: ArticleStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cozystitches.com'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image.startsWith('http') ? image : `${siteUrl}${image}`,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url || siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cozy Stitches',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${siteUrl}${url}`,
    },
  }

  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
        })),
      }
    : null

  return (
    <>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  )
}

interface WebsiteStructuredDataProps {
  name?: string
  description?: string
  url?: string
}

export function WebsiteStructuredData({
  name = 'Cozy Stitches',
  description = 'Free crochet patterns, tutorials, and tips for all skill levels',
  url,
}: WebsiteStructuredDataProps) {
  const siteUrl = url || process.env.NEXT_PUBLIC_SITE_URL || 'https://cozystitches.com'

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    description: description,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cozy Stitches',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://pinterest.com/cozystitches',
      'https://instagram.com/cozystitches',
      'https://youtube.com/@cozystitches',
    ],
  }

  return (
    <>
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQStructuredDataProps {
  items: FAQItem[]
}

export function FAQStructuredData({ items }: FAQStructuredDataProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

interface HowToStep {
  name: string
  text: string
  image?: string
}

interface HowToStructuredDataProps {
  name: string
  description: string
  image?: string
  totalTime?: string
  steps: HowToStep[]
}

export function HowToStructuredData({
  name,
  description,
  image,
  totalTime,
  steps,
}: HowToStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cozystitches.com'

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    image: image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : undefined,
    totalTime: totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image
        ? step.image.startsWith('http')
          ? step.image
          : `${siteUrl}${step.image}`
        : undefined,
    })),
  }

  return (
    <Script
      id="howto-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  )
}
