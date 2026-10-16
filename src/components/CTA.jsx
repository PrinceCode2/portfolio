import { useRef } from 'react'
import { ArrowRight, Download } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import TypewriterText from './TypewriterText'

export default function CTA() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section id="contact" ref={sectionRef} className="story-section bg-cream dark:bg-black transition-colors relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/15 blur-[110px] rounded-full pointer-events-none" />

      <div className="story-shell">
      <div data-reveal className="max-w-5xl mx-auto bg-white dark:bg-[#0d0d0d] rounded-xl border-hard shadow-hard p-8 md:p-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-40 h-40 bg-dots text-orange-600/20 pointer-events-none" />
        <div className="relative grid md:grid-cols-[1fr_auto] md:items-end gap-9">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-md bg-orange-600 text-white border-2 border-black dark:border-white font-mono text-xs font-bold flex items-center justify-center">07</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Let's build something useful</span>
            </div>
            <TypewriterText
              as="h2"
              parts={[
                { text: 'Have a problem worth ' },
                { text: 'solving?', className: 'text-orange-600' },
              ]}
              className="font-display uppercase text-4xl md:text-5xl text-black dark:text-white mb-4 leading-[1.02]"
            />
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              Tell me what is slowing the work down, what you want to build, or where the current experience falls short. We can start with a clear conversation about what would be useful.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-4 md:min-w-52">
            <a
              href="mailto:noblezaprince1@gmail.com"
              className="btn-brutal rounded-md flex items-center justify-center gap-2 px-7 py-4 bg-orange-600 text-white font-bold uppercase tracking-wide text-sm hover:bg-orange-700 transition-colors whitespace-nowrap"
            >
              Start a Conversation <ArrowRight size={18} />
            </a>
            <a
              href="/Prince-Nobleza-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-black/15 dark:border-white/20 text-black dark:text-white font-bold uppercase tracking-wide text-sm hover:border-orange-500 transition-colors whitespace-nowrap"
            >
              View Resume <Download size={17} />
            </a>
          </div>
        </div>

        <div className="relative mt-10 pt-6 border-t-2 border-black/10 dark:border-white/10 grid sm:grid-cols-3 gap-5 text-sm">
          <div>
            <p className="font-bold text-black dark:text-white">Web &amp; landing pages</p>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Responsive, clear, and built around a visitor journey.</p>
          </div>
          <div>
            <p className="font-bold text-black dark:text-white">Automation &amp; CRM</p>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Connected workflows with practical follow-up steps.</p>
          </div>
          <div>
            <p className="font-bold text-black dark:text-white">Content &amp; SEO systems</p>
            <p className="mt-1 text-gray-500 dark:text-gray-400">A clearer structure for publishing and visibility.</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
