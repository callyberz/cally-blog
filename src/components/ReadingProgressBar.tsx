'use client'

import { useEffect, useState } from 'react'

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateProgress() {
      const article = document.querySelector('article')
      if (!article) return

      const articleTop = article.offsetTop
      const articleHeight = article.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      const start = articleTop - windowHeight
      const end = articleTop + articleHeight - windowHeight

      if (scrollY <= start) {
        setProgress(0)
      } else if (scrollY >= end) {
        setProgress(100)
      } else {
        setProgress(((scrollY - start) / (end - start)) * 100)
      }
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 z-50 h-1 w-full bg-zinc-200 dark:bg-zinc-800">
      <div
        className="h-full bg-primary transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
