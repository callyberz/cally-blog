import { Post } from 'contentlayer/generated'
import { parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <article className="flex flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.date}>
          {formatInTimeZone(parseISO(post.date), 'UTC', 'LLLL d, yyyy')}
        </time>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6">
          <Link className="link" href={post.url}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6">
          {post.description}
        </p>
      </div>
    </article>
  )
}
