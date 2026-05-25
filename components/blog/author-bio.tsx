import Image from 'next/image'

interface AuthorBioProps {
  author: string
  authorImage?: string | null
  authorBio?: string | null
}

export function AuthorBio({ author, authorImage, authorBio }: AuthorBioProps) {
  const displayImage = authorImage || '/images/about-author.jpg'
  const displayBio = authorBio || "I've turned my lifelong love for crochet into a cozy little space. I share adorable amigurumi designs and simple step-by-step guides to help you discover the joy of crochet."

  return (
    <div className="p-6 bg-card rounded-xl border border-border">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={displayImage}
            alt={author}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Written by</p>
          <h3 className="font-serif text-lg font-bold text-foreground">{author}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{displayBio}</p>
    </div>
  )
}
