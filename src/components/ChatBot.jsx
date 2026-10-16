import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import botAvatar from '../assets/bot-avatar.jpg'

const OWNER_EMAIL = 'noblezaprince1@gmail.com'

const intents = [
  {
    id: 'services',
    chip: 'What services do you offer?',
    keywords: ['service', 'services', 'offer', 'help with'],
    reply:
      'I help with web development, content strategy, SEO, graphic design, and marketing automation (GoHighLevel, email flows) — pretty much everything to get your brand online and growing.',
  },
  {
    id: 'tools',
    chip: 'What tools do you use?',
    keywords: ['tool', 'tools', 'stack', 'software'],
    reply:
      'My work connects automation and CRM (GoHighLevel, Make.com, n8n), web systems (React, WordPress, Joomla), content and SEO, and practical integrations. Scrolling you to the Capabilities section now!',
    scrollTo: 'tools',
  },
  {
    id: 'work',
    chip: 'Show me your work',
    keywords: ['work', 'works', 'project', 'projects', 'portfolio', 'case stud'],
    reply:
      "I've got projects across web dev, SEO, design, and automation in the Work section — scrolling you there now!",
    scrollTo: 'projects',
  },
  {
    id: 'contact',
    chip: 'How can I contact you?',
    keywords: ['contact', 'email', 'reach', 'hire'],
    reply: `Easiest way is email: ${OWNER_EMAIL} — or hit the "Let's Talk" button and I'll get back to you personally.`,
  },
  {
    id: 'pricing',
    chip: 'Do you have pricing?',
    keywords: ['price', 'prices', 'pricing', 'cost', 'rate', 'budget'],
    reply:
      "Pricing depends on project scope — a landing page is different from an ongoing SEO retainer. Send a message with what you need and I'll get you a quote.",
  },
  {
    id: 'about',
    chip: 'Who is Prince?',
    keywords: ['who are you', 'who is prince', 'about you', 'about prince', 'background', 'experience', 'bio'],
    reply:
      "I'm Prince John Nobleza, an Automation Specialist and Web Developer from Marilao, Bulacan, Philippines. I build CRM automations with Make.com and n8n, develop websites with React and CMS platforms, and support related IT infrastructure. I completed my BS in Information Technology in May 2026.",
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'download'],
    reply: 'Here you go — feel free to download my full resume.',
    links: [{ label: 'Download Resume', href: '/Prince-Nobleza-Resume.pdf' }],
  },
  {
    id: 'social',
    keywords: ['social', 'github', 'linkedin', 'instagram', 'facebook'],
    reply: "Here's where you can find me:",
    links: [
      { label: 'GitHub', href: 'https://github.com/PrinceCode2' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prince-john-nobleza-145618294' },
      { label: 'Instagram', href: 'https://www.instagram.com/prince_noblezaaa' },
      { label: 'Facebook', href: 'https://www.facebook.com/share/1B9HEvJqWJ/' },
    ],
  },
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'kumusta', 'kamusta'],
    reply: 'Hey there! 👋 What would you like to know — services, tools, my work, or how to reach me?',
  },
]

const fallbackReply =
  "I don't have a scripted answer for that yet — feel free to email me directly and I'll reply personally: " + OWNER_EMAIL

function findIntent(text) {
  const lower = text.toLowerCase()
  for (const intent of intents) {
    for (const kw of intent.keywords) {
      const matched = kw.length <= 3 ? new RegExp(`\\b${kw}\\b`).test(lower) : lower.includes(kw)
      if (matched) return intent
    }
  }
  return null
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Prince's assistant 👋 Ask me about services, tools, or how to get in touch." },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [messages, open])

  const respond = text => {
    const intent = findIntent(text)
    const reply = intent ? intent.reply : fallbackReply
    setMessages(m => [...m, { from: 'user', text }, { from: 'bot', text: reply, links: intent?.links }])
    if (intent?.scrollTo) {
      setTimeout(() => {
        document.getElementById(intent.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }

  const handleSend = e => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    respond(text)
    setInput('')
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[90] w-[350px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[70vh] flex flex-col border-hard rounded-lg shadow-hard bg-white dark:bg-[#0d0d0d] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-black/10 dark:border-white/10 bg-cream dark:bg-black">
            <img src={botAvatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-orange-500" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-black dark:text-white truncate">Prince's Assistant</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Usually replies instantly
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-lg text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 dark:bg-white/5 text-black dark:text-gray-200'
                  }`}
                >
                  {m.text}
                </div>
                {m.links && (
                  <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">
                    {m.links.map(l => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {messages.length < 3 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {intents
                .filter(i => i.chip)
                .map(i => (
                  <button
                    key={i.id}
                    onClick={() => respond(i.chip)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-black/10 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600 transition-colors"
                  >
                    {i.chip}
                  </button>
                ))}
            </div>
          )}

          <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t-2 border-black/10 dark:border-white/10">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 min-w-0 px-3 py-2 rounded-md text-sm bg-cream dark:bg-white/5 border-2 border-black/10 dark:border-white/15 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] w-14 h-14 sm:w-16 sm:h-16 rounded-full border-hard shadow-hard bg-orange-600 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
      >
        {open ? (
          <X size={26} className="text-white" />
        ) : (
          <img src={botAvatar} alt="Chat with Prince's assistant" className="w-full h-full object-cover" />
        )}
        {!open && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
        )}
      </button>
    </>
  )
}
