import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'I handle content strategy, SEO, and web development — from React sites and landing pages to social content calendars, paid ad creative, and GoHighLevel automation.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A landing page usually takes 1–2 weeks. Full websites or ongoing content/SEO retainers get scoped after a quick discovery call.',
  },
  {
    q: 'Do you work with clients outside the Philippines?',
    a: 'Yes — most of my work is remote. I collaborate across time zones with async updates and scheduled calls when needed.',
  },
  {
    q: "What's included in a website build?",
    a: 'Design, development, copywriting support, mobile responsiveness, and basic on-page SEO — all built with React and Tailwind.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes. I offer post-launch fixes and can set up ongoing content, SEO, or automation support if you need it.',
  },
  {
    q: 'How do we get started?',
    a: "Send a message through the contact section — I'll reply with a few questions and a quick project timeline.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 px-6 bg-cream dark:bg-black transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black rounded-md">
            Got Questions?
          </span>
          <h2 className="font-display uppercase text-4xl md:text-5xl text-black dark:text-white">
            Read the <span className="text-orange-600">FAQs</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={item.q}
                className="reveal border-hard rounded-lg bg-white dark:bg-[#0d0d0d] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-black dark:text-white"
                >
                  {item.q}
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-orange-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
