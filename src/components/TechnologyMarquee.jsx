import TechnologyMark from './TechnologyMark'
import { marqueeTechnologyRows } from '../data/technologies'

function MarqueeSequence({ technologies, duplicate = false }) {
  return (
    <ul
      className="technology-marquee-sequence"
      aria-hidden={duplicate ? 'true' : undefined}
    >
      {technologies.map(name => (
        <li key={name} className="shrink-0">
          <TechnologyMark name={name} variant="marquee" />
        </li>
      ))}
    </ul>
  )
}

export default function TechnologyMarquee() {
  return (
    <section className="technology-marquee-section border-y-2 border-black/10 bg-cream-alt py-8 text-black transition-colors dark:border-white/10 dark:bg-[#080808] dark:text-white" aria-labelledby="technology-marquee-title">
      <div className="story-shell">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600">Tools in the workflow</p>
            <h2 id="technology-marquee-title" className="mt-1 font-display text-xl uppercase sm:text-2xl">A practical, connected toolkit.</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Selected platforms used across automation, websites, content, testing, payments, and hosting.
          </p>
        </div>

        <div className="space-y-3" aria-label="Selected technology logos">
          {marqueeTechnologyRows.map((technologies, index) => (
            <div key={technologies.join('-')} className="technology-marquee-row" tabIndex="0">
              <div className={`technology-marquee-track ${index === 1 ? 'technology-marquee-track-reverse' : ''}`}>
                <MarqueeSequence technologies={technologies} />
                <MarqueeSequence technologies={technologies} duplicate />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
