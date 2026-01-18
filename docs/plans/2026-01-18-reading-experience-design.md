# Reading Experience Improvements Design

## Overview

Two features to improve blog reading experience:
1. **Navigation aids** - Table of contents, reading progress bar, estimated read time
2. **Typography improvements** - More distinctive headings for better scanning

## Navigation Aids

### Table of Contents
- **Desktop (≥1024px)**: Sticky sidebar on the right side
- **Mobile (<1024px)**: Inline collapsible accordion at top of article
- Auto-generated from H2 and H3 headings
- Highlights current section using IntersectionObserver
- Smooth scroll on click

### Reading Progress Bar
- Fixed position below site header
- Full-width thin bar (3-4px height)
- Fills left-to-right as user scrolls
- Theme-aware colors (works in light/dark mode)

### Estimated Read Time
- Displayed next to date: "January 14, 2024 · 5 min read"
- Calculated at build time (~200 words per minute)

## Typography

### Heading Improvements

| Element | Changes |
|---------|---------|
| `h2` | 2rem size, bold weight, 2.5em top margin, 3px left border accent |
| `h3` | 1.625rem size, semibold weight, 2em top margin |

Left border on H2 creates visual anchor for major sections.

## Technical Implementation

### Contentlayer Changes

Add computed fields to `contentlayer.config.ts`:

```ts
computedFields: {
  headings: {
    type: 'json',
    resolve: (doc) => {
      const headingRegex = /^(#{2,3})\s+(.+)$/gm
      const headings = []
      let match
      while ((match = headingRegex.exec(doc.body.raw)) !== null) {
        headings.push({
          level: match[1].length,
          text: match[2],
          slug: slugify(match[2])
        })
      }
      return headings
    }
  },
  readingTime: {
    type: 'number',
    resolve: (doc) => Math.ceil(doc.body.raw.split(/\s+/).length / 200)
  }
}
```

Add `rehype-slug` plugin to generate heading IDs for anchor links.

### Post Page Layout

```
┌─────────────────────────────────────────────────┐
│  Navigation                                     │
├─────────────────────────────────────────────────┤
│  Reading Progress Bar                           │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────┬──────────────────┐    │
│  │  Article Content    │  ToC Sidebar     │    │
│  │  - Title            │  (sticky)        │    │
│  │  - Date · 5 min     │  - H2 links      │    │
│  │  - MDX body         │  - H3 links      │    │
│  └─────────────────────┴──────────────────┘    │
└─────────────────────────────────────────────────┘
```

Mobile: ToC becomes collapsible accordion at top.

## New Components

| Component | Purpose |
|-----------|---------|
| `TableOfContents.tsx` | Extracts headings, renders as links, tracks active section |
| `ReadingProgressBar.tsx` | Scroll listener, visual progress indicator |
| `ReadingTime.tsx` | Displays calculated read time |

## Files to Change

| File | Change |
|------|--------|
| `contentlayer.config.ts` | Add `headings`, `readingTime` fields; add `rehype-slug` |
| `src/app/posts/[slug]/page.tsx` | New layout with sidebar, integrate components |
| `src/components/TableOfContents.tsx` | New |
| `src/components/ReadingProgressBar.tsx` | New |
| `src/components/ReadingTime.tsx` | New |
| `tailwind.config.js` | Extended heading typography |

## Dependencies

- `rehype-slug` - Adds IDs to MDX headings (new dependency)
- Radix Accordion - Already installed, used for mobile ToC
