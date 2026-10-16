import { useRef } from 'react'
import { Bot, Code2, MessageSquareCode, Palette, ServerCog, Wrench } from 'lucide-react'
import ChapterIntro from './ChapterIntro'
import TechnologyMark from './TechnologyMark'
import { useScrollReveal } from '../hooks/useScrollReveal'

const capabilities = [
  {
    icon: Bot,
    title: 'Automation & CRM',
    value: 'Connect lead capture, follow-up, messaging, and internal steps so repeatable work is easier to manage.',
    examples: 'CRM workflows, email and SMS sequences, chat and voice automation, sub-account setup',
    tools: ['GoHighLevel', 'Make.com', 'n8n', 'Mailchimp', 'Workflow Automation'],
  },
  {
    icon: Code2,
    title: 'Web Development & CMS',
    value: 'Build responsive websites, landing pages, and content-managed experiences around a clear visitor journey.',
    examples: 'Custom websites, funnels, e-commerce, landing pages, CMS builds',
    tools: ['React + Tailwind', 'HTML5 + CSS3 + JavaScript', 'WordPress', 'Joomla', 'PHP + MySQL'],
  },
  {
    icon: Palette,
    title: 'Content & Design',
    value: 'Give content, SEO, campaigns, and visual communication a structure that supports consistent publishing.',
    examples: 'SEO planning, content calendars, campaign assets, social and email content',
    tools: ['SEO', 'Meta Business Suite', 'Canva + Photoshop', 'Figma'],
  },
  {
    icon: MessageSquareCode,
    title: 'Conversational Automation',
    value: 'Use supported chat, voice, and messaging tools as practical parts of a wider customer or internal workflow.',
    examples: 'Chat and voice automation, webchat widgets, email and SMS campaign steps',
    tools: ['Chat/Voice AI', 'Webchat', 'Email/SMS Campaigns'],
  },
  {
    icon: Wrench,
    title: 'Developer Tools & Integrations',
    value: 'Test, connect, and maintain the supporting tools around a digital solution without overstating the role of any one platform.',
    examples: 'Version control, API testing, verified Stripe integration, hosting and deployment support',
    tools: ['GitHub', 'Postman', 'Stripe', 'cPanel + Hosting'],
  },
  {
    icon: ServerCog,
    title: 'IT Systems',
    value: 'Support the hardware and network layer that real workplace systems still depend on.',
    examples: 'PC assembly and repair, POS quality assurance, Wi-Fi and router setup',
    tools: ['Hardware + Networks', 'POS Systems QA'],
  },
]

export default function Tools() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section id="tools" ref={sectionRef} className="story-section relative bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="story-shell relative">
        <ChapterIntro
          chapter="04"
          label="Turning ideas into systems"
          title="Capabilities that"
          highlight="work together."
          description="The value is not knowing isolated tools. It is understanding how the website, workflow, message, and technical setup need to support the same goal."
        />

        <div className="relative">
          <svg aria-hidden="true" className="hidden lg:block absolute inset-10 w-[calc(100%-5rem)] h-[calc(100%-5rem)] text-orange-500/35 pointer-events-none" viewBox="0 0 1000 480" preserveAspectRatio="none" fill="none">
            <path data-draw-path d="M245 115 C400 115 380 115 500 240 C620 365 600 365 755 365 M755 115 C610 115 620 115 500 240 C380 365 390 365 245 365" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>

          <div className="relative grid lg:grid-cols-2 gap-6" data-stagger-group>
            {capabilities.map(({ icon: Icon, title, value, examples, tools }, index) => (
              <div key={title} data-stagger-item>
                <article data-tilt-card className="tilt-card h-full rounded-xl border-2 border-black/10 dark:border-white/15 bg-cream dark:bg-[#101010] p-6 lg:p-7 transition-[border-color,box-shadow] duration-300 hover:border-orange-500 hover:shadow-[5px_5px_0_0_#ea580c]">
                  <div className="flex items-start justify-between gap-5">
                    <div className="w-14 h-14 rounded-lg border-hard shadow-hard-sm bg-orange-600 text-white flex items-center justify-center">
                      <Icon size={26} aria-hidden="true" />
                    </div>
                    <span className="font-mono text-sm text-gray-400 dark:text-gray-600">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 font-display uppercase text-2xl text-black dark:text-white">{title}</h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{value}</p>

                  <div className="mt-6 pt-5 border-t-2 border-black/10 dark:border-white/10">
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">What this supports</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{examples}</p>
                  </div>

                  <ul className="mt-5 grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2" aria-label={`${title} tools`}>
                    {tools.map(tool => (
                      <li key={tool} className="min-w-0">
                        <TechnologyMark name={tool} variant="tile" />
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-10 rounded-lg border-2 border-orange-600/40 bg-orange-50 dark:bg-orange-500/10 px-6 py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-orange-600 shrink-0">How the pieces connect</p>
          <p className="font-semibold text-black dark:text-white">Understand the need → choose the right approach → build the system → connect the tools → test the real workflow.</p>
        </div>
      </div>
    </section>
  )
}
