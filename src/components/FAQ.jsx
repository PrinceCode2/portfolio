import { useRef, useState } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import TypewriterText from './TypewriterText'

const faqs = [
  { q: 'What services do you offer?', a: 'I handle content strategy, SEO, and web development — from React sites and landing pages to social content calendars, paid ad creative, and GoHighLevel automation.' },
  { q: 'How long does a typical project take?', a: 'A landing page usually takes 1–2 weeks. Full websites or ongoing content/SEO retainers get scoped after a quick discovery call.' },
  { q: 'Do you work with clients outside the Philippines?', a: 'Yes — most of my work is remote. I collaborate across time zones with async updates and scheduled calls when needed.' },
  { q: "What's included in a website build?", a: 'Design, development, copywriting support, mobile responsiveness, and basic on-page SEO — using a stack that fits the project, including React and Tailwind or CMS platforms.' },
  { q: 'Do you offer support after launch?', a: 'Yes. I offer post-launch fixes and can set up ongoing content, SEO, or automation support if you need it.' },
  { q: 'How do we get started?', a: "Send a message through the contact section — I'll reply with a few questions and a quick project timeline." },
]

function HighlightedQuestion({ text, query }) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return text
  const matchIndex = text.toLowerCase().indexOf(normalizedQuery)
  if (matchIndex < 0) return text

  return (
    <>
      {text.slice(0, matchIndex)}
      <mark className="rounded-sm bg-orange-200 px-0.5 text-orange-950 shadow-[0_0_0_2px_rgba(234,88,12,0.12)] dark:bg-orange-500/30 dark:text-orange-100">
        {text.slice(matchIndex, matchIndex + normalizedQuery.length)}
      </mark>
      {text.slice(matchIndex + normalizedQuery.length)}
    </>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [query, setQuery] = useState('')
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  const normalizedQuery = query.trim().toLowerCase()
  const matches = faqs.map(item => !normalizedQuery || `${item.q} ${item.a}`.toLowerCase().includes(normalizedQuery))
  const resultCount = matches.filter(Boolean).length

  return (
    <section id="faq" ref={sectionRef} className="story-section-compact bg-cream dark:bg-[#080808] transition-colors">
      <div className="story-shell">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span data-reveal="small" className="inline-block px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black rounded-md">Got Questions?</span>
            <TypewriterText
              as="h2"
              parts={[
                { text: 'Read the ' },
                { text: 'FAQs', className: 'text-orange-600' },
              ]}
              className="font-display uppercase text-4xl md:text-5xl text-black dark:text-white"
            />
          </div>

          <div data-reveal="small" className="mb-5 flex min-h-12 items-center gap-3 rounded-lg border-2 border-black/15 bg-white px-4 text-black shadow-hard-sm focus-within:border-orange-600 focus-within:ring-2 focus-within:ring-orange-500/20 dark:border-white/15 dark:bg-[#0d0d0d] dark:text-white">
            <Search size={18} className="shrink-0 text-orange-600" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Escape') {
                  event.preventDefault()
                  setQuery('')
                }
              }}
              placeholder="Search questions"
              aria-label="Search frequently asked questions"
              aria-describedby="faq-result-count"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-500"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear FAQ search" className="grid h-8 w-8 place-items-center rounded-full text-gray-500 hover:bg-orange-500/10 hover:text-orange-600">
                <X size={16} />
              </button>
            )}
            <span id="faq-result-count" aria-live="polite" className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </span>
          </div>

          <div className="rounded-xl border-hard bg-white p-3 shadow-hard dark:bg-[#0d0d0d]" data-stagger-group>
            <div className="space-y-2">
              {faqs.map((item, i) => {
                const isOpen = openIndex === i
                const isMatch = matches[i]
                return (
                  <div key={item.q} data-stagger-item aria-hidden={!isMatch} className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out motion-reduce:transition-none ${isMatch ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                    <div className="min-h-0 overflow-hidden">
                      <div className="rounded-lg border-2 border-black/10 bg-cream/70 dark:border-white/10 dark:bg-black/30">
                        <button
                          id={`faq-question-${i}`}
                          type="button"
                          tabIndex={isMatch ? 0 : -1}
                          onClick={() => setOpenIndex(isOpen ? -1 : i)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${i}`}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-bold text-black dark:text-white hover:text-orange-600"
                        >
                          <span><HighlightedQuestion text={item.q} query={query} /></span>
                          <ChevronDown size={20} aria-hidden="true" className={`shrink-0 text-orange-600 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                          <div className="min-h-0 overflow-hidden">
                            <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.a}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {resultCount === 0 && (
              <div className="px-5 py-10 text-center" role="status">
                <p className="font-bold text-black dark:text-white">No matching question yet.</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Try a shorter term, or send me a message directly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
