import { useRef } from 'react'
import { ArrowRight, Link2, Monitor, RefreshCw, Search } from 'lucide-react'
import ChapterIntro from './ChapterIntro'
import { useScrollReveal } from '../hooks/useScrollReveal'

const problems = [
  {
    icon: Link2,
    problem: 'Tools that do not talk to each other',
    start: 'Tools that ',
    emphasis: 'do not talk',
    end: ' to each other',
    solution: 'Connect forms, CRM steps, messages, and business tools into one clearer workflow.',
  },
  {
    icon: RefreshCw,
    problem: 'Repetitive work that consumes time',
    start: '',
    emphasis: 'Repetitive work',
    end: ' that consumes time',
    solution: 'Turn repeatable follow-ups and data movement into practical automations with human oversight.',
  },
  {
    icon: Monitor,
    problem: 'Web experiences that create friction',
    start: 'Web experiences that create ',
    emphasis: 'friction',
    end: '',
    solution: 'Build responsive websites and landing pages that make information and next steps easier to find.',
  },
  {
    icon: Search,
    problem: 'Content without a clear system',
    start: 'Content without a ',
    emphasis: 'clear system',
    end: '',
    solution: 'Organize SEO, publishing, campaigns, and creative work around a consistent plan.',
  },
]

export default function Problems() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section id="problems" ref={sectionRef} className="story-section relative bg-cream-alt dark:bg-[#080808] overflow-hidden transition-colors">
      <div className="absolute top-20 right-0 w-72 h-72 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="story-shell relative">
        <ChapterIntro
          chapter="02"
          label="The problems I solve"
          title="Less friction. More"
          highlight="useful work."
          description="Good digital work starts with a real problem—not a tool. I help turn scattered processes and unclear experiences into systems people can understand and use."
        />

        <div className="grid md:grid-cols-2 gap-6" data-stagger-group>
          {problems.map(({ icon: Icon, problem, start, emphasis, end, solution }, index) => (
            <div key={problem} data-stagger-item>
              <article
                data-tilt-card
                data-tilt-rotate-x="8"
                data-tilt-rotate-y="9"
                className="tilt-card h-full card-hard rounded-lg bg-white dark:bg-[#101010] p-6 md:p-8 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-md bg-orange-600 text-white border-2 border-black dark:border-white flex items-center justify-center shadow-hard-sm">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-orange-600 font-bold mb-2">0{index + 1}</p>
                    <h3 aria-label={problem} className="text-xl font-bold text-black dark:text-white leading-snug">
                      <span aria-hidden="true">
                        {start}<span data-emphasis className="inline-block mx-[0.08em] text-orange-600">{emphasis}</span>{end}
                      </span>
                    </h3>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400">{solution}</p>
                  </div>
                </div>
                <ArrowRight className="ml-auto mt-5 text-orange-600 transition-transform group-hover:translate-x-1" size={20} aria-hidden="true" />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
