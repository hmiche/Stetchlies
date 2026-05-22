import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  // Validate secret to prevent abuse
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { slug } = body

    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }

    // Revalidate the specific article page
    revalidatePath(`/blog/${slug}`)

    // Revalidate listing pages that show this article
    revalidatePath('/blog')
    revalidatePath('/')

    // Revalidate sitemap so Google sees the new article
    revalidatePath('/sitemap.xml')

    return NextResponse.json({
      revalidated: true,
      slug,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
