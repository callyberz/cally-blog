'use client'

import { useEffect, useMemo, useState } from 'react'
import { Command } from 'cmdk'
import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'
import { posts } from '#site/posts'

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'description'],
        threshold: 0.3,
        includeScore: true,
      }),
    []
  )

  const results = useMemo(() => {
    if (!query) return posts.slice(0, 5)
    return fuse.search(query).map((result) => result.item)
  }, [query, fuse])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (url: string) => {
    setOpen(false)
    setQuery('')
    router.push(url)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-800/50 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:border-neutral-600 hover:text-neutral-300"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden rounded bg-neutral-700 px-1.5 py-0.5 text-xs sm:inline">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search posts"
        className="fixed inset-0 z-50"
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />
        <div className="fixed left-1/2 top-1/4 w-full max-w-lg -translate-x-1/2 rounded-lg border border-neutral-700 bg-neutral-900 shadow-2xl">
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search posts..."
            className="w-full border-b border-neutral-700 bg-transparent px-4 py-3 text-neutral-100 placeholder-neutral-500 outline-none"
          />
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-4 py-8 text-center text-sm text-neutral-500">
              No posts found.
            </Command.Empty>

            {results.map((post) => (
              <Command.Item
                key={post.slug}
                value={post.title}
                onSelect={() => handleSelect(post.url)}
                className="flex cursor-pointer flex-col gap-1 rounded-md px-4 py-3 text-neutral-300 aria-selected:bg-neutral-800"
              >
                <span className="font-medium">{post.title}</span>
                <span className="line-clamp-1 text-sm text-neutral-500">
                  {post.description}
                </span>
              </Command.Item>
            ))}
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  )
}
