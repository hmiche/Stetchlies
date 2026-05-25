'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">In this pattern</p>
      <ul className="flex flex-col">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          const isLevel3 = heading.level >= 3

          return (
            <li
              key={heading.id}
              className={cn(
                isLevel3 ? 'ml-3 border-l-2 border-stone-100' : 'mt-1 first:mt-0'
              )}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveId(heading.id)
                  const element = document.getElementById(heading.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    window.history.pushState(null, '', `#${heading.id}`)
                  }
                }}
                className={cn(
                  'block px-4 py-2 text-[14px] transition-colors rounded-full my-0.5',
                  !isLevel3 && isActive ? 'bg-pink-50 text-[#e83e8c] font-semibold' : '',
                  !isLevel3 && !isActive ? 'text-slate-500 hover:text-slate-800' : '',
                  isLevel3 && isActive ? 'bg-stone-50 text-[#32174d] font-semibold ml-2' : '',
                  isLevel3 && !isActive ? 'text-slate-400 hover:text-slate-600 ml-2' : ''
                )}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
