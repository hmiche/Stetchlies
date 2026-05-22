import { ArticleCard } from '@/components/blog/article-card'
import type { PostMeta } from '@/lib/types'

interface ArticleGridProps {
  posts: PostMeta[]
  columns?: 2 | 3
}

export function ArticleGrid({ posts, columns = 3 }: ArticleGridProps) {
  return (
    <div className={`grid gap-6 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
      {posts.map((post) => (
        <ArticleCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
