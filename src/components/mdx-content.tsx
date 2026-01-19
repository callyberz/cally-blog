import { MDXRemote } from 'next-mdx-remote/rsc'
import NextImage from 'next/image'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

const components = {
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link href={href || '#'}>{children}</Link>
  ),
  Image: (props: React.ComponentProps<typeof NextImage>) => (
    <NextImage className="rounded-lg" {...props} />
  ),
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          format: 'mdx',
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: 'github-dark',
                keepBackground: true,
              },
            ],
            rehypeSlug,
          ],
        },
      }}
    />
  )
}
