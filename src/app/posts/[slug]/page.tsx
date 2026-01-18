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
