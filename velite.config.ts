import { defineCollection, defineConfig, s } from 'velite'

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      date: s.isodate(),
      slug: s.path(),
      raw: s.raw(),
    })
    .transform((data) => {
      const rawContent = data.raw || ''
      const slug = data.slug.replace(/^posts\//, '')
      return {
        title: data.title,
        description: data.description,
        date: data.date,
        slug,
        raw: rawContent,
        url: `/posts/${slug}`,
        readingTime: Math.ceil(rawContent.split(/\s+/).length / 200),
        headings: [...rawContent.matchAll(/^(#{2,3})\s+(.+)$/gm)].map(
          (match) => ({
            level: match[1].length,
            text: match[2],
            slug: slugify(match[2]),
          })
        ),
      }
    }),
})

export default defineConfig({
  root: '.',
  output: {
    data: '.velite',
    assets: 'public/static',
  },
  collections: { posts },
})
