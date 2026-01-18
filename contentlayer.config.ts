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
