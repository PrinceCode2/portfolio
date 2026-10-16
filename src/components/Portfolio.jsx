import { useLayoutEffect, useRef, useState } from 'react'
import { Code2, TrendingUp, Palette, Zap } from 'lucide-react'
import ProjectModal from './ProjectModal'
import ChapterIntro from './ChapterIntro'
import TechnologyMark from './TechnologyMark'
import ProjectMediaGallery from './ProjectMediaGallery'
import { gsap, ScrollTrigger, useScrollReveal } from '../hooks/useScrollReveal'

const categories = ['All Projects', 'Web Dev', 'Content & SEO', 'Design', 'Automation']

const categoryIcon = {
  'Web Dev': Code2,
  'Content & SEO': TrendingUp,
  Design: Palette,
  Automation: Zap,
}

// Optional media entries use:
// { type: 'image' | 'video', src, poster?, alt, caption?, description? }
// Empty or omitted media arrays intentionally render the "Media coming soon" state.
const projects = [
  {
    title: 'Penuel Baptist Church Website',
    desc: 'Full React + Tailwind church site with custom branding and copy.',
    longDesc: 'Designed and built a full church website from scratch — service schedules, sermon archive, giving page, and a custom brand identity. Built with React and Tailwind for fast load times and easy content updates.',
    category: 'Web Dev',
    tools: ['React', 'Tailwind'],
    link: '#',
  },
  {
    title: 'Coastal Bakehouse — Online Ordering Site',
    desc: 'Custom React storefront with a menu builder and local delivery zones.',
    longDesc: 'Built a custom online ordering storefront for a local bakery, including a dynamic menu builder, delivery zone checker, and a mobile-first checkout flow designed to simplify local ordering.',
    category: 'Web Dev',
    tools: ['React'],
    link: '#',
  },
  {
    title: 'FitCore Studio — Booking Landing Page',
    desc: 'Fast, mobile-first landing page with class booking and lead capture.',
    longDesc: 'Designed and developed a conversion-focused landing page for a fitness studio, with embedded class booking, a lead capture form, and copy written to move first-time visitors to book a trial class.',
    category: 'Web Dev',
    link: '#',
  },
  {
    title: 'Metra Australia — Content Strategy',
    desc: 'Reels, graphics, and SEO strategy for a smart locker solutions brand.',
    longDesc: 'Planned and produced a content calendar of reels, carousel graphics, and blog posts for a smart locker solutions brand, paired with an SEO content strategy to support organic search visibility.',
    category: 'Content & SEO',
    tools: ['SEO', 'Content Strategy'],
    link: '#',
  },
  {
    title: 'Harborview Realty — Local SEO Overhaul',
    desc: 'Keyword-mapped blog system and on-page fixes for local search visibility.',
    longDesc: 'Audited the on-page SEO for a real estate brokerage, identified technical issues, mapped keywords, and organized a blog content system around its service areas.',
    category: 'Content & SEO',
    tools: ['SEO'],
    link: '#',
  },
  {
    title: 'Bistro Nueve — Social Content Calendar',
    desc: 'Monthly content calendar and caption strategy across Instagram and Facebook.',
    longDesc: 'Built a recurring monthly content calendar for a restaurant brand, including caption strategy, posting cadence, and content themes for consistent publishing across Instagram and Facebook.',
    category: 'Content & SEO',
    tools: ['Instagram', 'Facebook'],
    link: '#',
  },
  {
    title: 'Melody Strings Academy — Ad Campaign',
    desc: 'AI-generated premium social ad concepts for a violin school.',
    longDesc: "Created a set of premium-feeling social ad concepts for a violin academy using AI-assisted design tools, focused on a clean aesthetic that matched the brand's upscale positioning.",
    category: 'Design',
    tools: ['AI-assisted Design'],
    link: '#',
  },
  {
    title: 'Terra Realty Group — Brand Identity',
    desc: 'Logo, color system, and listing templates for a boutique real estate brand.',
    longDesc: 'Developed a full brand identity for a boutique real estate group — logo, color palette, typography system, and reusable listing templates for consistent marketing across channels.',
    category: 'Design',
    tools: ['Brand Identity'],
    link: '#',
  },
  {
    title: 'Glow Skincare — Product Launch Ad Set',
    desc: 'Launch-day ad creative and packaging mockups for a skincare line.',
    longDesc: "Designed the launch-day ad creative set and packaging mockups for a new skincare line, built to work across paid social placements and the brand's online store.",
    category: 'Design',
    tools: ['Paid Social', 'Packaging'],
    link: '#',
  },
  {
    title: 'Bright Smile Dental — Missed-Call Text-Back',
    desc: 'GoHighLevel automation that texts back missed callers within seconds.',
    longDesc: 'Set up a GoHighLevel automation that texts back a missed caller with a message and booking link, creating a consistent follow-up step when a call goes unanswered.',
    category: 'Automation',
    tools: ['GoHighLevel'],
    link: '#',
  },
  {
    title: 'Coach Method — Email Nurture Sequence',
    desc: 'Automated onboarding and nurture emails built in Mailchimp for a coaching program.',
    longDesc: 'Built an automated email sequence in Mailchimp covering onboarding, nurture, and re-engagement — designed to keep coaching program leads warm without manual follow-up.',
    category: 'Automation',
    tools: ['Mailchimp'],
    link: '#',
  },
  {
    title: 'Apex Auto Detailing — Review Request Flow',
    desc: 'Automated review-request texts that fire right after every job closes.',
    longDesc: 'Built an automation that sends a review-request text when a job is marked complete, giving the business a consistent post-service follow-up step.',
    category: 'Automation',
    tools: ['Workflow Automation'],
    link: '#',
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useScrollReveal(sectionRef)

  const filtered = activeCategory === 'All Projects'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.58,
            stagger: 0.07,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, gridRef)

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(refreshFrame)
      media.revert()
      context.revert()
    }
  }, [activeCategory])

  return (
    <section id="projects" ref={sectionRef} className="story-section relative overflow-hidden bg-cream text-black transition-colors dark:bg-black dark:text-white">
      <div className="absolute inset-0 bg-dots text-black/[0.04] pointer-events-none dark:text-white/[0.035]" />
      <div className="story-shell relative">
        <ChapterIntro
          chapter="05"
          label="Proof through projects"
          title="Selected work,"
          highlight="clearly explained."
          description="Examples across web development, content, design, and automation. Each item focuses on what was created without adding unsupported results or classifications."
        />

        <div className="flex flex-wrap gap-3 mb-10" data-reveal="small" aria-label="Filter projects by category">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-5 py-2 rounded-md text-sm font-bold uppercase tracking-wide border-2 transition-colors ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'border-black/15 text-gray-600 hover:border-orange-600 dark:border-white/15 dark:text-gray-300 dark:hover:border-orange-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => {
            const Icon = categoryIcon[project.category]
            return (
              <div key={project.title}>
                <article data-spotlight className="spotlight-card project-card group relative h-full overflow-hidden rounded-lg border-2 border-black/10 bg-white hover:-translate-y-1.5 hover:border-orange-500/60 hover:shadow-[6px_6px_0px_0px_#ea580c] focus-within:-translate-y-1.5 focus-within:border-orange-500/60 focus-within:shadow-[6px_6px_0px_0px_#ea580c] transition-[transform,border-color,box-shadow] duration-300 dark:border-white/10 dark:bg-[#111111]">
                  <button
                    type="button"
                    onClick={() => setSelectedProject({ ...project, icon: Icon })}
                    aria-label={`View details for ${project.title}`}
                    className="project-card-trigger absolute inset-0 rounded-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-orange-500 focus-visible:outline-offset-[-5px]"
                  />
                  <ProjectMediaGallery project={project} icon={Icon} variant="card" index={index} />
                  <div className="p-6 flex flex-col min-h-52">
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500 mb-3">{project.category}</p>
                    <h3 className="font-bold text-lg text-black dark:text-white mb-2 leading-snug">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">{project.desc}</p>
                    {project.tools?.length ? (
                      <ul className="mb-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                        {project.tools.slice(0, 3).map(tool => (
                          <li key={tool}><TechnologyMark name={tool} variant="badge" /></li>
                        ))}
                      </ul>
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="mt-auto self-start text-orange-600 dark:text-orange-500 font-semibold text-sm group-hover:underline group-focus-within:underline"
                    >
                      View details →
                    </span>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
