'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload image to Cloudinary from server side
export async function uploadImage(base64Data: string, folder = 'crochet-blog') {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized')
  }
  
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder,
      use_filename: true,
      unique_filename: true,
      tags: ['crochet-blog'],
      overwrite: false,
    })
    
    return {
      url: result.secure_url,
      public_id: result.public_id,
    }
  } catch (error: any) {
    console.error('Server action Cloudinary upload error:', error)
    throw new Error(`Upload failed: ${error.message}`)
  }
}

// Verify if the password matches the REVALIDATION_SECRET
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const isValid = password === process.env.REVALIDATION_SECRET
  if (isValid) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
  }
  return isValid
}

// Check if the current user session is authorized
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return session === process.env.REVALIDATION_SECRET
}

// Log out the admin user
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

// Fetch all posts (both draft and published)
export async function getAdminPosts() {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized')
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch admin posts: ${error.message}`)
  }

  return data || []
}

// Upsert an article in Supabase and purge page caches
export async function saveAdminPost(postData: any) {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized')
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('posts')
    .upsert(postData, { onConflict: 'slug' })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save post: ${error.message}`)
  }

  // Trigger cache revalidation
  try {
    revalidatePath(`/blog/${postData.slug}`)
    revalidatePath('/blog')
    revalidatePath('/')
    revalidatePath('/sitemap.xml')
  } catch (revalError) {
    console.error('Failed to trigger on-demand revalidation:', revalError)
  }

  return data
}

// Delete an article in Supabase and purge caches
export async function deleteAdminPost(slug: string) {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized')
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('slug', slug)

  if (error) {
    throw new Error(`Failed to delete post: ${error.message}`)
  }

  // Trigger cache revalidation
  try {
    revalidatePath(`/blog/${slug}`)
    revalidatePath('/blog')
    revalidatePath('/')
    revalidatePath('/sitemap.xml')
  } catch (revalError) {
    console.error('Failed to trigger on-demand revalidation:', revalError)
  }

  return { success: true }
}
