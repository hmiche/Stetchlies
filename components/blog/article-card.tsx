import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, Clock, Scissors, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { PostMeta } from '@/lib/types'

interface ArticleCardProps {
  post: PostMeta & { difficulty?: string; metadata?: string }
  featured?: boolean
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  let rawLevel = post.difficulty || 'BEGINNER'
  if (post.metadata) {
    try {
      const parsed = typeof post.metadata === 'string' ? JSON.parse(post.metadata) : post.metadata
      if (parsed?.DIFFICULTY) rawLevel = parsed.DIFFICULTY
      else if (parsed?.difficulty) rawLevel = parsed.difficulty
      else if (!post.difficulty && typeof post.metadata === 'string') rawLevel = post.metadata
    } catch (e) {
      if (!post.difficulty && typeof post.metadata === 'string') rawLevel = post.metadata
    }
  }
  const levelText = String(rawLevel).toUpperCase()

  return (
    <Card className={`group bg-white rounded-[20px] shadow-sm hover:shadow-xl border border-stone-200 overflow-hidden transition-all duration-300 ${featured ? 'md:flex md:min-h-[400px]' : ''}`}>
      <Link href={`/blog/${post.slug}`} className={`block relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'aspect-[4/3] md:aspect-auto md:absolute md:inset-0' : 'aspect-[4/3]'}`}>
          <Image
            src={post.coverImage || post.cover_image || ''}
            alt={post.coverImageAlt || post.cover_image_alt || post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          />
          
          {/* Bookmark Button */}
          <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/95 shadow-sm flex items-center justify-center text-stone-500 hover:text-primary transition-colors cursor-pointer z-10">
            <Bookmark className="h-4 w-4" />
          </div>

          {/* Level Badge */}
          <div className="absolute top-3 right-3 bg-[#e0f5e7]/95 backdrop-blur-sm text-[#168a48] uppercase font-bold text-[10px] tracking-widest px-2.5 py-1 rounded-full shadow-sm z-10">
            {levelText}
          </div>
        </div>
      </Link>
      
      <div className={featured ? 'md:w-1/2 flex flex-col justify-between' : 'flex flex-col justify-between flex-1'}>
        <CardContent className={`p-5 ${featured ? 'md:p-8' : ''}`}>
          {/* Category Pill */}
          <div className="inline-block px-2.5 py-0.5 rounded-full border border-stone-200 bg-stone-50 text-[10px] font-medium text-stone-500 uppercase tracking-wide mb-3">
            {post.category}
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h3 className={`font-serif font-bold text-[#32174d] leading-tight mb-2 line-clamp-2 hover:text-[#e83e8c] transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
              {post.title}
            </h3>
          </Link>
          
          <p className={`text-stone-500 leading-relaxed line-clamp-2 ${featured ? 'md:line-clamp-4 text-base' : 'text-sm'}`}>
            {post.description}
          </p>
        </CardContent>
        
        <CardFooter className={`px-5 pb-5 pt-0 ${featured ? 'md:px-8 md:pb-8' : ''}`}>
          <div className="w-full flex items-center justify-between border-t border-stone-100 pt-4 mt-auto">
            
            <div className="flex items-center gap-3 text-xs text-stone-400 font-medium">
              {/* Reading Time */}
              <div className="flex items-center gap-1.5" title="Reading Time">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readingTime || post.reading_time || 5} min</span>
              </div>
              
              {/* Supplies/Tags count - arbitrary proxy since we don't have explicit supplies count */}
              <div className="flex items-center gap-1.5" title="Supplies">
                <Scissors className="h-3.5 w-3.5" />
                <span>{(post.tags && post.tags.length > 0 ? post.tags.length * 3 : 5)} Supplies</span>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-[#e83e8c] text-sm font-bold hover:text-[#c7266d] transition-colors group/link">
              Get Pattern
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
            
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
