import Fuse from 'fuse.js'
import type { PostMeta } from './types'

export interface SearchResult extends PostMeta {
  score?: number
}

export function buildSearchIndex(posts: PostMeta[]) {
  return new Fuse(posts, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'tags', weight: 0.15 },
      { name: 'category', weight: 0.05 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
  })
}

export function searchPosts(query: string, posts: PostMeta[]): SearchResult[] {
  if (!query.trim()) return []

  const fuse = buildSearchIndex(posts)
  const results = fuse.search(query)

  return results.map((result) => ({
    ...result.item,
    score: result.score,
  }))
}
