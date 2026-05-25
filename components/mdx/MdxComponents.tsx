import { CldImage } from '@/components/ui/cld-image'
import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'

/* ─────────────────────────────────────────────────────────────
   PATTERN CARD COMPONENTS
   Use these as JSX tags directly inside your MDX content.
   All styles are self-contained (inline / CSS-in-JS via style prop)
   so they work without any extra CSS file.
───────────────────────────────────────────────────────────── */

// ── 1. Resource Link Banner ──────────────────────────────────
export function ResourceLink({ href = '#', children }: { href?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      role="note"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        background: '#FDF0F5',
        border: '1px solid #E8B4CB',
        borderRadius: '100px',
        padding: '12px 20px 12px 14px',
        marginBottom: '24px',
        textDecoration: 'none',
        transition: 'background 0.2s',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          minWidth: '36px',
          background: '#C2185B',
          borderRadius: '50%',
          fontSize: '1rem',
        }}
      >
        📖
      </span>
      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#C2185B' }}>
        {children}
      </span>
    </a>
  )
}

// ── 2. Info Card (single) ────────────────────────────────────
export function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      role="note"
      style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '14px',
        padding: '20px 22px',
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
        flex: '1',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          minWidth: '28px',
          color: '#2563eb',
          fontSize: '1.25rem',
          fontWeight: 400,
          marginTop: '0px',
        }}
      >
        ⓘ
      </span>
      <div style={{ flex: 1, fontFamily: '"Inter", system-ui, sans-serif' }}>
        <strong style={{ display: 'block', fontWeight: 700, fontSize: '1rem', color: '#2563eb', marginBottom: '8px' }}>
          {title}
        </strong>
        <div style={{ fontSize: '0.95rem', color: '#2563eb', lineHeight: 1.6, fontWeight: 400 }}>{children}</div>
      </div>
    </div>
  )
}

// ── 3. Info Card Grid (wraps two InfoCards side-by-side) ─────
export function InfoCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
        marginBottom: '28px',
      }}
    >
      {children}
    </div>
  )
}

// ── 4. Tip Card ──────────────────────────────────────────────
export function TipCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div
      role="note"
      aria-label={title ?? 'Tip'}
      style={{
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
        background: '#FFFBEA',
        border: '1px solid #FEF3C7',
        borderRadius: '12px',
        padding: '18px 22px',
        marginBottom: '24px',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '1.1rem', color: '#D97706', flexShrink: 0, marginTop: '2px' }}>
        💡
      </span>
      <div style={{ flex: 1, fontSize: '0.9375rem', color: '#78350F', lineHeight: 1.65 }}>
        {title && (
          <strong style={{ display: 'block', color: '#92400E', fontWeight: 700, marginBottom: '4px' }}>
            {title}
          </strong>
        )}
        {children}
      </div>
    </div>
  )
}

// ── 5. Alert Card (now Checkpoint/Success Card) ────────────────
export function AlertCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '12px',
        padding: '16px 20px',
        margin: '16px 0',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          minWidth: '28px',
          background: '#22c55e',
          borderRadius: '50%',
          color: '#fff',
          fontSize: '0.9rem',
          fontWeight: 700,
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        ✓
      </span>
      <div style={{ flex: 1, fontSize: '0.9375rem', lineHeight: 1.65 }}>
        <strong style={{ display: 'block', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
          {title}
        </strong>
        <p style={{ margin: 0, color: '#15803d' }}>{children}</p>
      </div>
    </div>
  )
}

// ── 6. Phase Section heading ─────────────────────────────────
export function PhaseSection({ children }: { children: React.ReactNode }) {
  const textContent = React.Children.toArray(children).join('')
  const id = textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-')
  return (
    <div className="mt-10 mb-4">
      <h3 id={id} className="font-serif text-[1.6rem] font-bold text-[#3B0764] m-0 leading-snug tracking-tight scroll-mt-24">
        {children}
      </h3>
    </div>
  )
}

// ── 7. Round Block ───────────────────────────────────────────
export function RoundBlock({
  label,
  count,
  note,
  children,
}: {
  label: string
  count?: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <div
      role="listitem"
      className="group transition-colors duration-200 hover:bg-blue-50/50 rounded-md py-2 px-4 my-1 text-[0.875rem] text-slate-600 leading-relaxed [&_p]:inline [&_p]:m-0"
    >
      <strong className="text-slate-800 font-bold mr-2">
        {label}
      </strong>
      <span className="mr-2">{children}</span>
      {count && (
        <strong className="text-slate-800 font-bold mr-2">
          {count}
        </strong>
      )}
      {note && (
        <span className="italic text-slate-500 text-[0.85em]">
          {note}
        </span>
      )}
    </div>
  )
}

// ── 8. Rounds Wrapper ────────────────────────────────────────
export function RoundsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="list"
      aria-label="Round-by-round instructions"
      style={{
        borderLeft: '3px solid #e5e7eb',
        margin: '24px 0 28px 12px',
        paddingLeft: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      {children}
    </div>
  )
}

// ── 9. Inline Note Card ──────────────────────────────────────
export function NoteCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div
      role="note"
      style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '10px',
        padding: '14px 18px',
        margin: '4px 0',
        fontSize: '0.9rem',
        color: '#15803d',
        lineHeight: 1.6,
      }}
    >
      {title && (
        <strong style={{ fontWeight: 600, color: '#166534' }}>{title}: </strong>
      )}
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   IMAGE COMPONENTS (unchanged from original)
───────────────────────────────────────────────────────────── */
function MdxImage(props: any) {
  const isCloudinary = props.src?.includes('cloudinary.com') || !props.src?.startsWith('/')
  if (isCloudinary) {
    return (
      <CldImage
        src={props.src}
        alt={props.alt || ''}
        width={800}
        height={500}
        crop="fill"
        gravity="auto"
        format="auto"
        quality="auto"
        className="rounded-xl my-6 w-full object-cover"
      />
    )
  }
  return (
    <Image
      src={props.src}
      alt={props.alt || ''}
      width={800}
      height={500}
      className="rounded-xl my-6 w-full object-cover"
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ COMPONENT (Accordion style)
───────────────────────────────────────────────────────────── */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div style={{ margin: '40px 0', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#3B0764',
          marginBottom: '20px',
        }}
      >
        Questions You Might Have
      </h2>
      <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
        {items?.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-[#e2e8f0] rounded-xl px-5 py-1 bg-white hover:border-[#cbd5e1] transition-colors shadow-sm"
          >
            <AccordionTrigger className="text-[#334155] font-medium text-[15px] hover:no-underline py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-[#475569] leading-relaxed pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   EXPORT — all components available in every MDX article
───────────────────────────────────────────────────────────── */
export const mdxComponents = {
  // Headings
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn("font-serif text-3xl sm:text-4xl font-black text-[#e83e8c] mt-12 mb-6 tracking-tight scroll-mt-24", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn("font-serif text-2xl sm:text-[1.7rem] font-bold text-[#32174d] mt-10 mb-4 tracking-tight scroll-mt-24", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn("font-sans text-xl font-bold text-[#1a2332] mt-8 mb-3 scroll-mt-24", className)}
      {...props}
    />
  ),

  // Image override
  img: MdxImage,

  // Pattern card components
  ResourceLink,
  InfoCard,
  InfoCardGrid,
  TipCard,
  AlertCard,
  PhaseSection,
  RoundBlock,
  RoundsWrapper,
  NoteCard,
  FAQAccordion,
}
