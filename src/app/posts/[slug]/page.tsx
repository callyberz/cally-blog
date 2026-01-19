import { WEBSITE_HOST_URL } from '@/lib/constants'
import { posts } from '#site/posts'
import { format, parseISO } from 'date-fns'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'
import { TableOfContents } from '@/components/TableOfContents'
import { MDXContent } from '@/components/mdx-content'

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const { slug } = await params
  const post = posts.find((post) => post.slug === slug)

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
      url: `${WEBSITE_HOST_URL}${url}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${WEBSITE_HOST_URL}${url}`,
    },
  }
}

const PostLayout = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

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
            <MDXContent source={post.raw} />
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
