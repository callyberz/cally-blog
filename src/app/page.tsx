'use client'

import { type NextPage } from 'next'
import React from 'react'
import { TypographyH1 } from '@/components/common/TypographyH1'
import { Checkbox } from '@/components/ui/checkbox'
import { projects, todoList } from '@/lib/data'
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
      <Marquee speed={120}>
        <TypographyH3>
          Software Engineer | Web Development | Full-stack Development | ReactJS
          | TypeScript | JavaScript | NodeJS | AWS |{' '}
        </TypographyH3>
      </Marquee>
      <TypographyP>
        Experienced Software Engineer adept in TypeScript, shipping
        customer-centric solutions. 5+ years of expertise in web development &
        product enhancement. Seeking frontend/backend/full-stack roles to
        innovate.
      </TypographyP>

      <div className="">
        <TypographyH3>I build things. Keep learning and grow.</TypographyH3>
        {todoList.map((item, key) => {
          const { actionItem } = item
          return (
            <div className="mt-2 flex items-center space-x-2" key={key}>
              <Checkbox id={actionItem} checked={item.finished} />
              <label
                htmlFor={actionItem}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {actionItem}
              </label>
            </div>
          )
        })}
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

      <div className="mt-10 space-y-12 border-t border-gray-200 pt-10 dark:border-gray-700">
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </div>
  )
}

export default Home
