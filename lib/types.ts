// Type definitions for blog posts supporting both original camelCase and Supabase snake_case fields
export interface Post {
  id?: string
  title: string
  slug: string
  description: string
  body: string
  date: string
  published?: boolean
  featured: boolean
  category: string
  tags: string[]
  
  // Author information
  author: string
  authorBio?: string | null
  author_bio?: string | null
  authorImage?: string | null
  author_image?: string | null
  
  // Cover image
  coverImage: string
  cover_image?: string
  coverImageAlt: string
  cover_image_alt?: string
  
  // Timing / modification
  readingTime?: number | null
  reading_time?: number | null
  lastModified?: string | null
  last_modified?: string | null
}

export type PostMeta = Omit<Post, 'body'>
