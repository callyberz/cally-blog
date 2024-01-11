'use client'

import { type NextPage } from 'next'
import React from 'react'
import { TypographyH1 } from '@/components/common/TypographyH1'
import { highlights, projects, summary } from '@/lib/data'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GithubIcon, Link } from 'lucide-react'
import { PostCard } from '@/components/PostCard'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Marquee from 'react-fast-marquee'
import { TypographyH3 } from '@/components/common/TypographyH3'
import { TypographyP } from '@/components/common/TypographyP'

const Home: NextPage = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  return (
    <div>
      <TypographyH1>Hi, I&apos;m Calvin Lee</TypographyH1>
      <Marquee speed={120} autoFill={false}>
        <TypographyH3>
          {highlights.map((skill, index) => (
            <span key={index} className="pr-2">
              {skill} |{' '}
            </span>
          ))}
        </TypographyH3>
      </Marquee>
      <TypographyP>{summary}</TypographyP>

      <div className="mt-10">
        <TypographyH1>Notes</TypographyH1>
        <div className="grid grid-cols-2 gap-4 py-4">
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-10 dark:border-gray-700">
        <TypographyH1>Projects</TypographyH1>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          {projects.map(({ name, description, url, github }, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  {name}
                  {url ? (
                    <Link
                      className="ml-2 inline-block cursor-pointer"
                      onClick={() => {
                        window.open(url, '_blank')
                      }}
                    />
                  ) : null}
                  {github ? (
                    <GithubIcon
                      className="ml-2 inline-block cursor-pointer"
                      onClick={() => {
                        window.open(github, '_blank')
                      }}
                    />
                  ) : null}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
