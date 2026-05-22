import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      title,
      slug,
      description,
      body: mdxBody,
      date,
      author,
      author_bio,
      author_image,
      cover_image,
      cover_image_alt,
      category,
      tags,
      featured,
      reading_time,
    } = body

    if (!title || !slug || !mdxBody) {
      return NextResponse.json({ error: 'title, slug, and body are required' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Insert to database (matches Step 3 Postgres schema)
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        slug,
        description,
        body: mdxBody,
        date: date || new Date().toISOString().split('T')[0],
        author: author || 'Emma Wilson',
        author_bio: author_bio || null,
        author_image: author_image || null,
        cover_image,
        cover_image_alt: cover_image_alt || title,
        category: category || 'Tutorials',
        tags: tags || [],
        featured: featured || false,
        reading_time: reading_time || null,
        published: true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Trigger instant ISR cache purge
    try {
      revalidatePath(`/blog/${slug}`)
      revalidatePath('/blog')
      revalidatePath('/')
      revalidatePath('/sitemap.xml')
    } catch (revalError) {
      console.error('Failed to trigger on-demand revalidation:', revalError)
    }

    return NextResponse.json({
      success: true,
      message: 'Article published and cache purged successfully',
      post: data,
    })
  } catch (error) {
    console.error('Publish API error:', error)
    return NextResponse.json({ error: 'Publish failed' }, { status: 500 })
  }
}
