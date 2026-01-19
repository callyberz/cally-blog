'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Heading {
  level: number
  text: string
  slug: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

function TocLinks({
  headings,
  activeSlug,
}: {
  headings: Heading[]
  activeSlug: string
}) {
  return (
    <nav className="space-y-1">
      {headings.map((heading) => (
        <a
          key={heading.slug}
          href={`#${heading.slug}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(heading.slug)?.scrollIntoView({
              behavior: 'smooth',
            })
          }}
          className={cn(
            'block text-sm transition-colors hover:text-foreground',
            heading.level === 3 && 'pl-4',
            activeSlug === heading.slug
              ? 'font-medium text-foreground'
              : 'text-muted-foreground',
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeSlug, setActiveSlug] = useState('')

  useEffect(() => {
    if (!headings || headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings || headings.length === 0) return null

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <h2 className="mb-4 text-sm font-semibold">On this page</h2>
          <TocLinks headings={headings} activeSlug={activeSlug} />
        </div>
      </aside>

      {/* Mobile: Collapsible accordion */}
      <div className="mb-8 lg:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="toc" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-semibold">
              On this page
            </AccordionTrigger>
            <AccordionContent>
              <TocLinks headings={headings} activeSlug={activeSlug} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
