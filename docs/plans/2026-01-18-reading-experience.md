# Reading Experience Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve blog reading experience with navigation aids (ToC, progress bar, read time) and better heading typography.

**Architecture:** Add computed fields to Contentlayer for headings/readingTime, create client components for interactive features (progress bar, ToC with active section tracking), update post page layout with responsive sidebar.

**Tech Stack:** Next.js App Router, Contentlayer, Tailwind CSS, Radix Accordion, rehype-slug

---

## Task 1: Install rehype-slug dependency

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

Run:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm add rehype-slug
```

**Step 2: Verify installation**

Run:
```bash
grep rehype-slug package.json
```
Expected: Line showing `"rehype-slug": "^X.X.X"`

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add rehype-slug for heading IDs"
```

---

## Task 2: Add Contentlayer computed fields

**Files:**
- Modify: `contentlayer.config.ts`

**Step 1: Update contentlayer.config.ts**

Replace entire file with:

```ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: 'number',
      resolve: (doc) => Math.ceil(doc.body.raw.split(/\s+/).length / 200),
    },
    headings: {
      type: 'json',
      resolve: (doc) => {
        const headingRegex = /^(#{2,3})\s+(.+)$/gm
        const headings: { level: number; text: string; slug: string }[] = []
        let match
        while ((match = headingRegex.exec(doc.body.raw)) !== null) {
          headings.push({
            level: match[1].length,
            text: match[2],
            slug: slugify(match[2]),
          })
        }
        return headings
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
})
```

**Step 2: Verify build regenerates Contentlayer data**

Run:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm build 2>&1 | tail -20
```
Expected: Build succeeds with static pages generated

**Step 3: Commit**

```bash
git add contentlayer.config.ts
git commit -m "feat: add readingTime and headings computed fields"
```

---

## Task 3: Create ReadingProgressBar component

**Files:**
- Create: `src/components/ReadingProgressBar.tsx`

**Step 1: Create the component**

Create file `src/components/ReadingProgressBar.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateProgress() {
      const article = document.querySelector('article')
      if (!article) return

      const articleTop = article.offsetTop
      const articleHeight = article.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      const start = articleTop - windowHeight
      const end = articleTop + articleHeight - windowHeight

      if (scrollY <= start) {
        setProgress(0)
      } else if (scrollY >= end) {
        setProgress(100)
      } else {
        setProgress(((scrollY - start) / (end - start)) * 100)
      }
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed left-0 top-[73px] z-50 h-1 w-full bg-zinc-200 dark:bg-zinc-800">
      <div
        className="h-full bg-primary transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm build 2>&1 | grep -E "(error|Error)" || echo "No errors"
```
Expected: "No errors"

**Step 3: Commit**

```bash
git add src/components/ReadingProgressBar.tsx
git commit -m "feat: add ReadingProgressBar component"
```

---

## Task 4: Create TableOfContents component

**Files:**
- Create: `src/components/TableOfContents.tsx`

**Step 1: Create the component**

Create file `src/components/TableOfContents.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Heading {
  level: number
  text: string
  slug: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

function TocLinks({
  headings,
  activeSlug,
}: {
  headings: Heading[]
  activeSlug: string
}) {
  return (
    <nav className="space-y-1">
      {headings.map((heading) => (
        <a
          key={heading.slug}
          href={`#${heading.slug}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(heading.slug)?.scrollIntoView({
              behavior: 'smooth',
            })
          }}
          className={cn(
            'block text-sm transition-colors hover:text-foreground',
            heading.level === 3 && 'pl-4',
            activeSlug === heading.slug
              ? 'font-medium text-foreground'
              : 'text-muted-foreground',
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeSlug, setActiveSlug] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <h2 className="mb-4 text-sm font-semibold">On this page</h2>
          <TocLinks headings={headings} activeSlug={activeSlug} />
        </div>
      </aside>

      {/* Mobile: Collapsible accordion */}
      <div className="mb-8 lg:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="toc" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-semibold">
              On this page
            </AccordionTrigger>
            <AccordionContent>
              <TocLinks headings={headings} activeSlug={activeSlug} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm build 2>&1 | grep -E "(error|Error)" || echo "No errors"
```
Expected: "No errors"

**Step 3: Commit**

```bash
git add src/components/TableOfContents.tsx
git commit -m "feat: add TableOfContents component with active section tracking"
```

---

## Task 5: Update typography for headings

**Files:**
- Modify: `tailwind.config.js`

**Step 1: Add typography customization**

Replace `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              fontSize: '1.75rem',
              fontWeight: '700',
              marginTop: '2.5em',
              paddingLeft: '0.75rem',
              borderLeftWidth: '3px',
              borderLeftColor: 'hsl(var(--primary))',
            },
            h3: {
              fontSize: '1.375rem',
              fontWeight: '600',
              marginTop: '2em',
            },
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
```

**Step 2: Verify build**

Run:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm build 2>&1 | tail -10
```
Expected: Build succeeds

**Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: improve heading typography with left border accent"
```

---

## Task 6: Update post page layout

**Files:**
- Modify: `src/app/posts/[slug]/page.tsx`

**Step 1: Update the page component**

Replace `src/app/posts/[slug]/page.tsx` with:

```tsx
import { WEBSITE_HOST_URL } from '@/lib/constants'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import type { MDXComponents } from 'mdx/types'
import type { Metadata } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import NextImage from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'
import { TableOfContents } from '@/components/TableOfContents'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) {
    return
  }

  const { title, description, date, url } = post

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      url: `${WEBSITE_HOST_URL}/posts/${url}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${WEBSITE_HOST_URL}/posts/${url}`,
    },
  }
}

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  Image: (props) => <NextImage className="rounded-lg" {...props} />,
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  if (!post) {
    notFound()
  }

  const MDXContent = useMDXComponent(post.body.code)
  const headings = post.headings as { level: number; text: string; slug: string }[]

  return (
    <>
      <ReadingProgressBar />
      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
        <div>
          <h1>{post.title}</h1>
          <div className="my-4 flex items-center gap-2 text-sm text-zinc-400">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>

          {/* Mobile ToC */}
          <div className="lg:hidden">
            <TableOfContents headings={headings} />
          </div>

          <article className="prose dark:prose-invert">
            <MDXContent components={mdxComponents} />
          </article>
        </div>

        {/* Desktop ToC sidebar */}
        <div className="hidden lg:block">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </>
  )
}

export default PostLayout
```

**Step 2: Verify build**

Run:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm build 2>&1 | tail -20
```
Expected: Build succeeds with all post pages generated

**Step 3: Commit**

```bash
git add src/app/posts/[slug]/page.tsx
git commit -m "feat: update post layout with ToC sidebar and reading time"
```

---

## Task 7: Final verification and lint

**Step 1: Run lint**

Run:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm lint
```
Expected: No errors (warnings OK)

**Step 2: Run full build**

Run:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm build
```
Expected: Build succeeds

**Step 3: Manual verification (optional)**

Run dev server and check:
```bash
cd /Users/calvinlee/callyberz/cally-blog/.worktrees/reading-experience && pnpm dev
```
- Visit http://localhost:3000/posts/react-server-components-1
- Verify: Reading progress bar appears below header
- Verify: Reading time shows next to date
- Verify: ToC shows on desktop sidebar (≥1024px)
- Verify: ToC collapses to accordion on mobile (<1024px)
- Verify: H2 headings have left border accent
- Verify: Clicking ToC links scrolls smoothly
- Verify: Active section highlights in ToC while scrolling

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Install rehype-slug | package.json |
| 2 | Add Contentlayer computed fields | contentlayer.config.ts |
| 3 | Create ReadingProgressBar | src/components/ReadingProgressBar.tsx |
| 4 | Create TableOfContents | src/components/TableOfContents.tsx |
| 5 | Update heading typography | tailwind.config.js |
| 6 | Update post page layout | src/app/posts/[slug]/page.tsx |
| 7 | Final verification | - |

**Total commits:** 6 feature commits
