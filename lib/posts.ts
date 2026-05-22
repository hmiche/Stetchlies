import { createServerClient } from './supabase/server'
import type { Post } from './types'

// Helper to map snake_case database fields to camelCase properties for backward compatibility
export function mapPost(post: any): Post {
  if (!post) return post
  return {
    ...post,
    coverImage: post.cover_image ?? post.coverImage,
    coverImageAlt: post.cover_image_alt ?? post.coverImageAlt,
    authorBio: post.author_bio ?? post.authorBio,
    authorImage: post.author_image ?? post.authorImage,
    lastModified: post.last_modified ?? post.lastModified,
    readingTime: post.reading_time ?? post.readingTime,
  }
}

// Check if Supabase client is properly configured with real credentials
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  return !!(
    url && 
    key && 
    url !== 'https://your-project.supabase.co' && 
    !url.includes('your-project') &&
    key !== 'your-secret-key'
  )
}

const mockPosts: Post[] = [
  {
    id: 'mock-1',
    title: 'Welcome to Cozy Stitches (Mock Post)',
    slug: 'welcome-to-cozy-stitches',
    description: 'This is a mock post shown because Supabase is not configured yet. Configure your .env.local file to fetch live articles.',
    body: '# Welcome to Cozy Stitches!\n\nThis is **MDX** content rendering correctly. Please update `.env.local` with your real Supabase credentials to begin loading actual posts from your database.\n\n```ts\n// Update .env.local with your real keys:\nNEXT_PUBLIC_SUPABASE_URL=https://abc.supabase.co\nSUPABASE_SECRET_KEY=sb_secret_...\n```',
    date: '2026-05-19',
    author: 'Emma Wilson',
    authorBio: 'Crochet designer and pattern writer with a love for amigurumi and cozy home crafts.',
    authorImage: 'https://res.cloudinary.com/dzmxgqty7/image/upload/v1779317562/Gemini_Generated_Image_9v35ii9v35ii9v35_twhpdz.png',
    category: 'Guides',
    tags: ['crochet', 'beginner', 'guides'],
    featured: true,
    coverImage: 'https://res.cloudinary.com/dzmxgqty7/image/upload/v1779317540/cover_ywb4qq.avif',
    coverImageAlt: 'Beautiful crochet amigurumi piece',
    published: true,
    readingTime: 4,
  }
]

// All published posts — used for blog index, sitemap, category pages
export async function getAllPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase URL is not configured. Falling back to local mock data.')
    return mockPosts
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })

    if (error) {
      console.warn(`⚠️ Supabase error: ${error.message}. Falling back to local mock data.`)
      return mockPosts
    }
    return (data ?? []).map(mapPost)
  } catch (err: any) {
    console.warn(`⚠️ Failed to connect to Supabase: ${err.message}. Falling back to local mock data.`)
    return mockPosts
  }
}

// Single post by slug — used on article pages
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    const post = mockPosts.find(p => p.slug === slug)
    return post || null
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.warn(`⚠️ Supabase error fetching post ${slug}: ${error.message}. Falling back to local mock data.`)
      const post = mockPosts.find(p => p.slug === slug)
      return post || null
    }
    return mapPost(data)
  } catch (err: any) {
    console.warn(`⚠️ Failed to fetch post ${slug} from Supabase: ${err.message}. Falling back to local mock data.`)
    const post = mockPosts.find(p => p.slug === slug)
    return post || null
  }
}

// Featured posts — used on homepage
export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return mockPosts.filter(p => p.featured).slice(0, limit)
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('date', { ascending: false })
      .limit(limit)

    if (error) {
      console.warn(`⚠️ Supabase error fetching featured posts: ${error.message}. Falling back to local mock data.`)
      return mockPosts.filter(p => p.featured).slice(0, limit)
    }
    return (data ?? []).map(mapPost)
  } catch (err: any) {
    console.warn(`⚠️ Failed to fetch featured posts from Supabase: ${err.message}. Falling back to local mock data.`)
    return mockPosts.filter(p => p.featured).slice(0, limit)
  }
}

// Posts by category
export async function getPostsByCategory(category: string): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return mockPosts.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === category)
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .order('date', { ascending: false })

    if (error) {
      console.warn(`⚠️ Supabase error fetching posts for category ${category}: ${error.message}. Falling back to local mock data.`)
      return mockPosts.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === category)
    }
    return (data ?? []).map(mapPost)
  } catch (err: any) {
    console.warn(`⚠️ Failed to fetch posts by category from Supabase: ${err.message}. Falling back to local mock data.`)
    return mockPosts.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === category)
  }
}

// Posts by tag
export async function getPostsByTag(tag: string): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return mockPosts.filter(p => p.tags.some(t => t.toLowerCase().replace(/\s+/g, '-') === tag))
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .contains('tags', [tag])
      .order('date', { ascending: false })

    if (error) {
      console.warn(`⚠️ Supabase error fetching posts for tag ${tag}: ${error.message}. Falling back to local mock data.`)
      return mockPosts.filter(p => p.tags.some(t => t.toLowerCase().replace(/\s+/g, '-') === tag))
    }
    return (data ?? []).map(mapPost)
  } catch (err: any) {
    console.warn(`⚠️ Failed to fetch posts by tag from Supabase: ${err.message}. Falling back to local mock data.`)
    return mockPosts.filter(p => p.tags.some(t => t.toLowerCase().replace(/\s+/g, '-') === tag))
  }
}

// All slugs — used in generateStaticParams
export async function getAllSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return mockPosts.map(p => p.slug)
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('slug')
      .eq('published', true)

    if (error) {
      console.warn(`⚠️ Supabase error fetching slugs: ${error.message}. Falling back to local mock data.`)
      return mockPosts.map(p => p.slug)
    }
    return (data ?? []).map(p => p.slug)
  } catch (err: any) {
    console.warn(`⚠️ Failed to fetch slugs from Supabase: ${err.message}. Falling back to local mock data.`)
    return mockPosts.map(p => p.slug)
  }
}

// Alias for compatibility
export const getAllPostSlugs = getAllSlugs

// All unique categories
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map(p => p.category))
  return Array.from(categories).sort()
}

// All unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set(posts.flatMap(p => p.tags))
  return Array.from(tags).sort()
}

// Related posts — same category, exclude current slug
export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const currentPost = await getPostBySlug(slug)
  if (!currentPost) return []

  if (!isSupabaseConfigured()) {
    return mockPosts
      .filter(p => p.category === currentPost.category && p.slug !== slug)
      .slice(0, limit)
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .eq('category', currentPost.category)
      .neq('slug', slug)
      .order('date', { ascending: false })
      .limit(limit)

    if (error) {
      console.warn(`⚠️ Supabase error fetching related posts: ${error.message}. Falling back to local mock data.`)
      return mockPosts
        .filter(p => p.category === currentPost.category && p.slug !== slug)
        .slice(0, limit)
    }
    return (data ?? []).map(mapPost)
  } catch (err: any) {
    console.warn(`⚠️ Failed to fetch related posts from Supabase: ${err.message}. Falling back to local mock data.`)
    return mockPosts
      .filter(p => p.category === currentPost.category && p.slug !== slug)
      .slice(0, limit)
  }
}
