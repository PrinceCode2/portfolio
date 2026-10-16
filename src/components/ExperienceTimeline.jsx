import { useLayoutEffect, useRef } from 'react'
import { BriefcaseBusiness, GraduationCap } from 'lucide-react'
import { gsap, useScrollReveal } from '../hooks/useScrollReveal'
import TypewriterText from './TypewriterText'

const milestones = [
  {
    date: 'March 2024 — December 2025',
    title: 'IT Support Specialist, including OJT',
    place: 'Mayaritech',
    icon: BriefcaseBusiness,
    detail: 'Developed WordPress and Joomla websites, managed hosting and domains, supported PC and POS hardware, and created client-facing digital materials.',
  },
  {
    date: 'April 2025 — Present',
    title: 'Automation Specialist',
    place: 'Nexistry Digital Solutions',
    icon: BriefcaseBusiness,
    detail: 'Builds Make.com and n8n workflows, websites and funnels, chat and voice automation, marketing campaigns, and connected client tools.',
  },
  {
    date: 'May 2026',
    title: 'Bachelor of Science in Information Technology',
    place: 'Pambayang Dalubhasaan ng Marilao',
    icon: GraduationCap,
    detail: 'Completed coursework in web design and system development, including a biometric attendance system capstone for web and mobile platforms.',
  },
]

export default function ExperienceTimeline() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const progressRef = useRef(null)

  useScrollReveal(sectionRef)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 72%',
              end: 'bottom 62%',
              scrub: 0.45,
            },
          },
        )

        gsap.utils.toArray('.timeline-entry', timelineRef.current).forEach(entry => {
          const dot = entry.querySelector('.timeline-dot')
          const branch = entry.querySelector('.timeline-branch')
          const card = entry.querySelector('.timeline-card')
          gsap.fromTo(dot, {
            scale: 0.58,
            backgroundColor: 'rgba(234, 88, 12, 0.18)',
          }, {
            scale: 1,
            backgroundColor: '#ea580c',
            duration: 0.42,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: entry,
              start: 'top 72%',
              toggleActions: 'play none none reverse',
            },
          })
          if (branch) {
            gsap.from(branch, {
              scaleX: 0,
              duration: 0.38,
              ease: 'power2.out',
              transformOrigin: entry.dataset.side === 'left' ? '100% 50%' : '0% 50%',
              scrollTrigger: {
                trigger: entry,
                start: 'top 72%',
                toggleActions: 'play none none reverse',
              },
            })
          }
          gsap.to(card, {
            borderColor: '#ea580c',
            duration: 0.3,
            scrollTrigger: {
              trigger: entry,
              start: 'top 72%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      })
    }, sectionRef)

    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="story-section-compact bg-cream dark:bg-[#080808] transition-colors overflow-hidden">
      <div className="story-shell">
        <div className="max-w-[68rem] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span data-reveal="small" className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Chapter 03 · Experience Path</span>
          <TypewriterText
            as="h2"
            parts={[
              { text: 'Learning by ' },
              { text: 'building and supporting.', className: 'text-orange-600' },
            ]}
            className="mt-4 font-display uppercase text-3xl md:text-5xl text-black dark:text-white leading-tight"
          />
          <TypewriterText
            as="p"
            parts={['My background connects hands-on IT support, web development, and workflow automation—the practical layers that keep a digital system useful.']}
            duration={1.12}
            delay={0.08}
            className="mt-5 text-gray-600 dark:text-gray-400 leading-relaxed"
          />
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-5 md:left-1/2 top-2 bottom-2 w-1.5 -translate-x-1/2 rounded-full bg-black/20 dark:bg-white/20 ring-1 ring-black/10 dark:ring-white/10" aria-hidden="true">
            <div ref={progressRef} className="absolute inset-0 origin-top rounded-full bg-orange-600 shadow-[0_0_0_2px_rgba(234,88,12,0.16)]" />
          </div>

          <ol className="space-y-10 md:space-y-14">
            {milestones.map(({ date, title, place, icon: Icon, detail }, index) => (
              <li key={`${date}-${title}`} data-side={index % 2 === 0 ? 'left' : 'right'} className="timeline-entry relative md:grid md:grid-cols-[1fr_64px_1fr] md:items-center">
                <div className={`ml-14 md:ml-0 ${index % 2 === 0 ? 'md:col-start-1 md:text-right md:pr-6' : 'md:col-start-3 md:pl-6'}`} data-reveal="small">
                  <article data-spotlight className="spotlight-card timeline-card inline-block text-left rounded-lg border-hard shadow-hard-sm bg-white dark:bg-[#101010] p-6 max-w-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-orange-600 hover:shadow-[5px_5px_0_0_#ea580c]">
                    <p className="font-mono text-xs font-bold uppercase tracking-wide text-orange-600">{date}</p>
                    <h3 className="mt-3 text-xl font-bold text-black dark:text-white leading-snug">{title}</h3>
                    <p className="mt-1 text-sm font-semibold text-gray-500 dark:text-gray-400">{place}</p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{detail}</p>
                  </article>
                </div>

                <div className={`timeline-branch hidden md:block absolute top-1/2 h-1 w-8 -translate-y-1/2 bg-orange-600 ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} aria-hidden="true" />

                <div className="timeline-dot absolute left-5 top-6 md:static md:col-start-2 md:row-start-1 z-10 w-11 h-11 -translate-x-1/2 md:translate-x-0 mx-auto rounded-full border-2 border-black dark:border-white bg-orange-600 text-white flex items-center justify-center shadow-hard-sm">
                  <Icon size={19} aria-hidden="true" />
                </div>
              </li>
            ))}
          </ol>
        </div>
        </div>
      </div>
    </section>
  )
}
