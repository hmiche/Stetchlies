import { CldImage } from '@/components/ui/cld-image'
import Image from 'next/image'
import React from 'react'

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
      <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#C2185B' }}>
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
        background: '#EBF2FF',
        border: '1px solid #C7D9F9',
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
          background: '#3B82F6',
          borderRadius: '50%',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginTop: '2px',
        }}
      >
        ℹ
      </span>
      <div style={{ flex: 1 }}>
        <strong style={{ display: 'block', fontWeight: 700, fontSize: '0.9375rem', color: '#1E3A5F', marginBottom: '8px' }}>
          {title}
        </strong>
        <div style={{ fontSize: '0.9rem', color: '#2E5C8A', lineHeight: 1.6 }}>{children}</div>
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

// ── 5. Alert Card ────────────────────────────────────────────
export function AlertCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
        background: '#FFF5F5',
        border: '1px solid #FECDD3',
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
          background: '#EF4444',
          borderRadius: '50%',
          color: '#fff',
          fontSize: '0.8rem',
          fontWeight: 700,
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        !
      </span>
      <div style={{ flex: 1, fontSize: '0.9375rem', lineHeight: 1.65 }}>
        <strong style={{ display: 'block', fontWeight: 700, color: '#991B1B', marginBottom: '4px' }}>
          {title}
        </strong>
        <p style={{ margin: 0, color: '#B91C1C' }}>{children}</p>
      </div>
    </div>
  )
}

// ── 6. Phase Section heading ─────────────────────────────────
export function PhaseSection({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '40px', marginBottom: '6px' }}>
      <h2
        style={{
          fontSize: '1.375rem',
          fontWeight: 700,
          color: '#3B0764',
          margin: '0 0 12px',
          lineHeight: 1.25,
        }}
      >
        {children}
      </h2>
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
      style={{
        padding: '18px 24px',
        borderBottom: '1px solid #EBEBF0',
        fontSize: '0.9375rem',
        color: '#3B3653',
        lineHeight: 1.65,
      }}
    >
      {/* Label on its own line */}
      <div style={{ fontWeight: 700, color: '#2D2145', marginBottom: '2px', fontSize: '0.9375rem' }}>
        {label}
      </div>
      {/* Instruction text */}
      <div style={{ color: '#3B3653', marginBottom: count ? '2px' : '0' }}>
        {children}
      </div>
      {/* Stitch count in bold purple on its own line */}
      {count && (
        <div style={{ fontWeight: 700, color: '#5C1F7A', marginTop: '2px', fontSize: '0.9375rem' }}>
          {count}
        </div>
      )}
      {/* Optional italic note */}
      {note && (
        <div
          style={{
            fontStyle: 'italic',
            color: '#6B7280',
            fontSize: '0.9em',
            marginTop: '6px',
          }}
        >
          {note}
        </div>
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
        border: '1px solid #EBEBF0',
        borderRadius: '12px',
        margin: '20px 0 28px',
        background: '#FFFFFF',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
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
        background: '#FFF5F5',
        border: '1px solid #FCA5A5',
        borderRadius: '10px',
        padding: '14px 18px',
        margin: '4px 0',
        fontSize: '0.9rem',
        color: '#7F1D1D',
        lineHeight: 1.6,
      }}
    >
      {title && (
        <strong style={{ fontWeight: 600, color: '#991B1B' }}>{title}: </strong>
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
   EXPORT — all components available in every MDX article
───────────────────────────────────────────────────────────── */
export const mdxComponents = {
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
}
