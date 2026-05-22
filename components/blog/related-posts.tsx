import Link from 'next/link'
import { CldImage } from '@/components/ui/cld-image'
import { Card, CardContent } from '@/components/ui/card'
import type { PostMeta } from '@/lib/types'

interface RelatedPostsProps {
  posts: PostMeta[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.slug} className="overflow-hidden article-card">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative aspect-[16/10]">
                <CldImage
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  crop="fill"
                  gravity="auto"
                  format="auto"
                  quality="auto"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <span className="text-xs text-accent font-medium">{post.category}</span>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-serif font-bold text-foreground hover:text-primary transition-colors mt-1 line-clamp-2">
                  {post.title}
                </h3>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
