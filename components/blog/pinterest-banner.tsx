'use client'

import React from 'react'

interface PinterestBannerProps {
  title: string
  url: string
  media?: string
}

export function PinterestBanner({ title, url, media }: PinterestBannerProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedMedia = media ? encodeURIComponent(media) : ''
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedMedia}&description=${encodedTitle}`

  return (
    <div className="bg-[#bd081c] rounded-xl p-8 sm:p-10 text-center text-white my-10 shadow-lg border-2 border-[#a30718]">
      <h3 className="font-sans font-bold text-2xl sm:text-3xl mb-4 tracking-wide text-white">
        Remember It Later!
      </h3>
      <p className="font-serif text-lg sm:text-xl opacity-95 mb-8">
        Planning to try this soon? Pin it for a quick find later!
      </p>
      <a
        href={pinterestUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white text-[#bd081c] px-6 py-2.5 rounded-full font-bold text-lg hover:bg-stone-100 transition-colors shadow-md"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
        <span style={{ fontFamily: 'cursive' }}>Save Pin</span>
      </a>
    </div>
  )
}
