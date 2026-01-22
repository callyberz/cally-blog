'use client'

import { type NextPage } from 'next'
import { TypographyH1 } from '@/components/common/TypographyH1'
import { highlights, summary } from '@/lib/data'
import { PostCard } from '@/components/PostCard'
import { posts } from '#site/posts'
import { compareDesc } from 'date-fns'
import Marquee from 'react-fast-marquee'
import { TypographyH3 } from '@/components/common/TypographyH3'
import { motion } from 'motion/react'

const Home: NextPage = () => {
  const latestPosts = [...posts].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <TypographyH1>Hi, I&apos;m Calvin Lee</TypographyH1>
        <p>📍 Toronto, Canada</p>
      </div>

      <Marquee speed={120} autoFill={false}>
        <TypographyH3>
          {highlights.map((skill, index) => (
            <span key={index} className="pr-2">
              {skill} |{' '}
            </span>
          ))}
        </TypographyH3>
      </Marquee>

      <div className="mt-4">
        <TypographyH3>
          {summary.split(' ').map((text, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
            >
              {text}{' '}
            </motion.span>
          ))}
        </TypographyH3>
      </div>

      <div className="mt-10">
        <TypographyH1>Notes</TypographyH1>
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
          {latestPosts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
