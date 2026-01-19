# Next.js 15 + Velite Migration Design

## Overview

Upgrade from Next.js 13.5 to 15.x and migrate from Contentlayer to Velite for MDX content management.

## Why Velite

- Contentlayer is unmaintained, doesn't support Next.js 14+
- Velite is the modern alternative with similar DX
- Type-safe schemas with Zod
- Active maintenance and Next.js 15 support

## Migration Scope

### Packages

| Action | Package | Version |
|--------|---------|---------|
| Remove | `contentlayer` | 0.3.4 |
| Remove | `next-contentlayer` | 0.3.4 |
| Add | `velite` | latest |
| Upgrade | `next` | 13.5.6 → 15.x |
| Upgrade | `react` | 18.3.1 → 19.x |
| Upgrade | `react-dom` | 18.3.1 → 19.x |
| Upgrade | `@types/react` | 18.3.13 → 19.x |
| Upgrade | `@types/react-dom` | 18.3.1 → 19.x |

### Files to Change

| File | Change |
|------|--------|
| `contentlayer.config.ts` | Delete |
| `velite.config.ts` | Create |
| `next.config.js` | Remove Contentlayer plugin |
| `tsconfig.json` | Add `#site/*` path alias |
| `src/app/posts/[slug]/page.tsx` | Update imports, MDX rendering, async params |
| `src/app/page.tsx` | Update imports |
| `src/app/sitemap.ts` | Update imports |
| `src/components/PostCard.tsx` | Update type import |
| `src/components/mdx-content.tsx` | Create (MDX renderer) |

## Velite Configuration

```ts
import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      date: s.isodate(),
      metadata: s.metadata(),
      content: s.mdx(),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: meta.path.replace(/^posts\//, '').replace(/\.mdx$/, ''),
      url: `/posts/${meta.path.replace(/^posts\//, '').replace(/\.mdx$/, '')}`,
      readingTime: Math.ceil(data.metadata.content.split(/\s+/).length / 200),
      headings: [...data.metadata.content.matchAll(/^(#{2,3})\s+(.+)$/gm)].map(
        (match) => ({
          level: match[1].length,
          text: match[2],
          slug: slugify(match[2]),
        })
      ),
    })),
})

export default defineConfig({
  root: '.',
  output: {
    data: '.velite',
    assets: 'public/static',
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
})
```

## Import Mapping

| Before (Contentlayer) | After (Velite) |
|-----------------------|----------------|
| `import { allPosts } from 'contentlayer/generated'` | `import { posts } from '#site/content'` |
| `import { Post } from 'contentlayer/generated'` | `import type { Post } from '#site/content'` |
| `useMDXComponent(post.body.code)` | Custom MDXContent component |
| `post._raw.flattenedPath` | `post.slug` |
| `post.body.raw` | `post.metadata.content` |

## Next.js 15 Breaking Changes

- `params` in page components is now async (need `await params`)
- Metadata API changes

## Migration Order

1. Install Velite, create config
2. Update tsconfig.json with path alias
3. Create MDX content component
4. Update all imports from Contentlayer to Velite
5. Remove Contentlayer packages and config
6. Upgrade Next.js and React
7. Fix async params in page components
8. Verify build and runtime
