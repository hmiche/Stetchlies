import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.slug('posts'),
    description: s.string().max(200),
    date: s.isodate(),
    lastModified: s.isodate().optional(),
    author: s.string(),
    authorBio: s.string().optional(),
    authorImage: s.string().optional(),
    coverImage: s.string(),
    coverImageAlt: s.string(),
    category: s.string(),
    tags: s.array(s.string()),
    featured: s.boolean().default(false),
    readingTime: s.number().optional(),
    body: s.mdx(),
  }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
