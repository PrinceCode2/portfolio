import { useState } from 'react'
import { Code2, TrendingUp, Palette, Zap } from 'lucide-react'
import ProjectModal from './ProjectModal'

const categories = ['All Projects', 'Web Dev', 'Content & SEO', 'Design', 'Automation']

const categoryIcon = {
  'Web Dev': Code2,
  'Content & SEO': TrendingUp,
  Design: Palette,
  Automation: Zap,
}

const projects = [
  {
    title: 'Penuel Baptist Church Website',
    desc: 'Full React + Tailwind church site with custom branding and copy.',
    longDesc: 'Designed and built a full church website from scratch — service schedules, sermon archive, giving page, and a custom brand identity. Built with React and Tailwind for fast load times and easy content updates.',
    category: 'Web Dev',
    link: '#',
  },
  {
    title: 'Coastal Bakehouse — Online Ordering Site',
    desc: 'Custom React storefront with a menu builder and local delivery zones.',
    longDesc: 'Built a custom online ordering storefront for a local bakery, including a dynamic menu builder, delivery zone checker, and mobile-first checkout flow to reduce cart drop-off.',
    category: 'Web Dev',
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
    longDesc: 'Planned and produced a content calendar of reels, carousel graphics, and blog posts for a smart locker solutions brand, paired with an SEO content strategy to grow organic search visibility.',
    category: 'Content & SEO',
    link: '#',
  },
  {
    title: 'Harborview Realty — Local SEO Overhaul',
    desc: 'Keyword-mapped blog system and on-page fixes that lifted local search visibility.',
    longDesc: "Audited and rebuilt the on-page SEO for a real estate brokerage — fixed technical issues, mapped keywords to a new blog content system, and improved local search rankings across the brokerage's service areas.",
    category: 'Content & SEO',
    link: '#',
  },
  {
    title: 'Bistro Nueve — Social Content Calendar',
    desc: 'Monthly content calendar and caption strategy across Instagram and Facebook.',
    longDesc: 'Built a recurring monthly content calendar for a restaurant brand, including caption strategy, posting cadence, and content themes designed to grow engagement across Instagram and Facebook.',
    category: 'Content & SEO',
    link: '#',
  },
  {
    title: 'Melody Strings Academy — Ad Campaign',
    desc: 'AI-generated premium social ad concepts for a violin school.',
    longDesc: "Created a set of premium-feeling social ad concepts for a violin academy using AI-assisted design tools, focused on a clean aesthetic that matched the brand's upscale positioning.",
    category: 'Design',
    link: '#',
  },
  {
    title: 'Terra Realty Group — Brand Identity',
    desc: 'Logo, color system, and listing templates for a boutique real estate brand.',
    longDesc: 'Developed a full brand identity for a boutique real estate group — logo, color palette, typography system, and reusable listing templates for consistent marketing across channels.',
    category: 'Design',
    link: '#',
  },
  {
    title: 'Glow Skincare — Product Launch Ad Set',
    desc: 'Launch-day ad creative and packaging mockups for a skincare line.',
    longDesc: "Designed the launch-day ad creative set and packaging mockups for a new skincare line, built to work across paid social placements and the brand's online store.",
    category: 'Design',
    link: '#',
  },
  {
    title: 'Bright Smile Dental — Missed-Call Text-Back',
    desc: 'GoHighLevel automation that texts back missed callers within seconds.',
    longDesc: 'Set up a GoHighLevel automation that instantly texts back any missed call with a friendly message and booking link — reducing lost leads from calls that go unanswered during busy hours.',
    category: 'Automation',
    link: '#',
  },
  {
    title: 'Coach Method — Email Nurture Sequence',
    desc: 'Automated onboarding and nurture emails built in Mailchimp for a coaching program.',
    longDesc: 'Built an automated email sequence in Mailchimp covering onboarding, nurture, and re-engagement — designed to keep coaching program leads warm without manual follow-up.',
    category: 'Automation',
    link: '#',
  },
  {
    title: 'Apex Auto Detailing — Review Request Flow',
    desc: 'Automated review-request texts that fire right after every job closes.',
    longDesc: "Built an automation that sends a review-request text the moment a job is marked complete, timed to catch customers while the experience is still fresh — growing the shop's Google review count steadily.",
    category: 'Automation',
    link: '#',
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeCategory === 'All Projects'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display uppercase text-4xl md:text-5xl text-center mb-4 leading-tight">
          My <span className="text-orange-600">Work</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          A sample of projects across web development, content strategy, design, and automation.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-md text-sm font-bold uppercase tracking-wide border-2 transition-colors ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'border-white/15 text-gray-300 hover:border-orange-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map(project => {
            const Icon = categoryIcon[project.category]
            return (
              <div
                key={project.title}
                className="project-card reveal group bg-[#111111] rounded-lg overflow-hidden border-2 border-white/10 hover:border-orange-500/60 hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_#ea580c] transition-all duration-300"
              >
                <div className="h-44 bg-gradient-to-br from-orange-500/25 via-orange-500/5 to-transparent flex items-center justify-center relative overflow-hidden border-b-2 border-white/10">
                  <Icon size={48} strokeWidth={1.2} className="text-orange-500/80" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {project.desc}
                  </p>
                  <button
                    onClick={() => setSelectedProject({ ...project, icon: Icon })}
                    className="text-orange-500 font-semibold text-sm hover:underline"
                  >
                    View Project →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
