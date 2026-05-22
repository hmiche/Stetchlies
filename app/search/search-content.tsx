'use client'

import { useState, useMemo, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArticleGrid } from '@/components/blog/article-grid'
import { searchPosts } from '@/lib/search'
import type { Post } from '@/lib/types'

export function SearchContent({ initialPosts }: { initialPosts: Post[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  const allPosts = initialPosts

  const results = useMemo(() => {
    if (!query.trim()) return []
    return searchPosts(query, allPosts)
  }, [query, allPosts])

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value)
      // Update URL without full page reload
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      router.replace(`/search?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const clearSearch = () => {
    handleSearch('')
  }

  return (
    <div>
      {/* Search Input */}
      <div className="relative max-w-2xl mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for patterns, tutorials, yarn types..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 h-14 text-lg"
          autoFocus
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Results */}
      {query.trim() ? (
        <>
          <p className="text-sm text-muted-foreground mb-6">
            {results.length} {results.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
          </p>

          {results.length > 0 ? (
            <ArticleGrid posts={results} />
          ) : (
            <div className="text-center py-16 bg-card rounded-xl">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try searching for different keywords or browse our categories.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['beginner', 'blanket', 'amigurumi', 'yarn'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-card rounded-xl">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Start searching</h3>
          <p className="text-muted-foreground mb-6">
            Enter keywords to find patterns, tutorials, and tips.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <p className="text-sm text-muted-foreground mr-2">Popular searches:</p>
            {['beginner crochet', 'blanket pattern', 'amigurumi', 'yarn guide'].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => handleSearch(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
