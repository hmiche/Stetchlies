import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { v2 as cloudinary } from 'cloudinary'
import matter from 'gray-matter'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY
const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
  console.error('Missing Cloudinary credentials in .env.local')
  process.exit(1)
}

// Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Initialize Cloudinary
cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
})

async function migrate() {
  const postsDir = path.join(process.cwd(), 'content', 'posts')
  
  if (!fs.existsSync(postsDir)) {
    console.error(`Posts directory not found: ${postsDir}`)
    return
  }

  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'))
  console.log(`Found ${files.length} MDX files to migrate.`)

  for (const file of files) {
    const filePath = path.join(postsDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Parse MDX file
    const { data: frontmatter, content: body } = matter(fileContent)
    
    console.log(`\nProcessing post: ${frontmatter.title} (${frontmatter.slug || file})`)

    let coverImageUrl = frontmatter.image
    let authorImageUrl = frontmatter.authorImage

    // 1. Upload cover image to Cloudinary if it's a local file path
    if (coverImageUrl && coverImageUrl.startsWith('/')) {
      const localImagePath = path.join(process.cwd(), 'public', coverImageUrl)
      if (fs.existsSync(localImagePath)) {
        console.log(`Uploading cover image: ${localImagePath}`)
        try {
          const uploadResult = await cloudinary.uploader.upload(localImagePath, {
            folder: 'crochet-blog/posts',
            public_id: path.basename(coverImageUrl, path.extname(coverImageUrl)),
            tags: ['crochet-blog', 'post-cover', 'migrated'],
          })
          coverImageUrl = uploadResult.secure_url
          console.log(`  Cover image uploaded: ${coverImageUrl}`)
        } catch (err: any) {
          console.error(`  Failed to upload cover image: ${err.message}`)
        }
      } else {
        console.warn(`  Cover image file not found locally: ${localImagePath}`)
      }
    }

    // 2. Upload author image to Cloudinary if it's a local file path
    if (authorImageUrl && authorImageUrl.startsWith('/')) {
      const localAuthorImagePath = path.join(process.cwd(), 'public', authorImageUrl)
      if (fs.existsSync(localAuthorImagePath)) {
        console.log(`Uploading author image: ${localAuthorImagePath}`)
        try {
          const uploadResult = await cloudinary.uploader.upload(localAuthorImagePath, {
            folder: 'crochet-blog/authors',
            public_id: path.basename(authorImageUrl, path.extname(authorImageUrl)),
            tags: ['crochet-blog', 'author-image', 'migrated'],
          })
          authorImageUrl = uploadResult.secure_url
          console.log(`  Author image uploaded: ${authorImageUrl}`)
        } catch (err: any) {
          console.error(`  Failed to upload author image: ${err.message}`)
        }
      } else {
        console.warn(`  Author image file not found locally: ${localAuthorImagePath}`)
      }
    }

    const slug = frontmatter.slug || path.basename(file, '.mdx')

    // 3. Save post metadata and body to Supabase
    const postData = {
      title: frontmatter.title,
      slug: slug,
      description: frontmatter.description || '',
      body: body,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      author: frontmatter.author || 'Emma Wilson',
      author_bio: frontmatter.authorBio || null,
      author_image: authorImageUrl || null,
      cover_image: coverImageUrl || '',
      cover_image_alt: frontmatter.coverImageAlt || frontmatter.title,
      category: frontmatter.category || 'Tutorials',
      tags: frontmatter.tags || [],
      featured: frontmatter.featured || false,
      reading_time: frontmatter.readingTime || null,
      published: true,
    }

    console.log(`Upserting post to Supabase: ${slug}`)
    const { error } = await supabase
      .from('posts')
      .upsert(postData, { onConflict: 'slug' })

    if (error) {
      console.error(`  Error upserting post to Supabase: ${error.message}`)
    } else {
      console.log(`  Successfully migrated post: ${slug}`)
    }
  }

  console.log('\nMigration complete!')
}

migrate().catch(err => {
  console.error('Migration crashed:', err)
})
