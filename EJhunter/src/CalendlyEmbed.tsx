import { useMemo } from 'react'

function toCalendlyEmbedSrc(eventUrl: string): string | null {
  const trimmed = eventUrl.trim().replace(/\/$/, '')
  if (!trimmed) return null
  if (!/^https:\/\/(www\.)?calendly\.com\//i.test(trimmed)) {
    return null
  }
  const join = trimmed.includes('?') ? '&' : '?'
  return `${trimmed}${join}embed=true&primary_color=f97316`
}

type CalendlyEmbedProps = {
  /** Full Calendly scheduling link, e.g. https://calendly.com/your-org/30-minute-intro */
  eventUrl: string
}

export function CalendlyEmbed({ eventUrl }: CalendlyEmbedProps) {
  const src = useMemo(() => toCalendlyEmbedSrc(eventUrl), [eventUrl])

  if (!src) {
    return (
      <div className="booking-calendly-fallback" role="status">
        <p className="booking-calendly-fallback-title">Calendly URL not configured</p>
        <p className="booking-calendly-fallback-text">
          Add your event link in environment variables as{" "}
          <code className="booking-calendly-code">NEXT_PUBLIC_HUNTLO_CALENDLY_EVENT_URL=https://calendly.com/your-handle/event-name</code>
          {" "}and redeploy/restart the app.
        </p>
      </div>
    )
  }

  return (
    <iframe
      title="Schedule time with Calendly"
      src={src}
      className="booking-calendly-iframe"
      loading="lazy"
      allow="camera; microphone; fullscreen; payment"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
