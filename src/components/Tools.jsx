import {
  Sparkles,
  Bot,
  Rocket,
  Mail,
  Inbox,
  Megaphone,
  Code2,
  Layers,
  GitBranch,
  Palette,
  PenTool,
  Image,
  Clapperboard,
  Video,
} from 'lucide-react'

const toolGroups = [
  {
    label: 'Marketing',
    tools: [
      { icon: Mail, name: 'Mailchimp', use: 'Email Marketing' },
      { icon: Inbox, name: 'Outlook', use: 'Client Comms' },
      { icon: Megaphone, name: 'Meta Ads Manager', use: 'Paid Social Ads' },
    ],
  },
  {
    label: 'AI & Automation',
    tools: [
      { icon: Sparkles, name: 'ChatGPT', use: 'AI Content' },
      { icon: Bot, name: 'Gemini', use: 'AI Assistant' },
      { icon: Rocket, name: 'GoHighLevel', use: 'CRM & Automation' },
    ],
  },
  {
    label: 'Web Development',
    tools: [
      { icon: Code2, name: 'VS Code', use: 'Development' },
      { icon: Layers, name: 'React + Tailwind', use: 'Web Build' },
      { icon: GitBranch, name: 'GitHub', use: 'Version Control' },
    ],
  },
  {
    label: 'Graphics Design',
    tools: [
      { icon: Palette, name: 'Canva Pro', use: 'Design Finishing' },
      { icon: PenTool, name: 'Figma', use: 'UI Design' },
      { icon: Image, name: 'Photoshop', use: 'Photo Editing' },
    ],
  },
  {
    label: 'Video Editing',
    tools: [
      { icon: Clapperboard, name: 'CapCut', use: 'Short-Form Video' },
      { icon: Video, name: 'Premiere Pro', use: 'Video Editing' },
    ],
  },
]

export default function Tools() {
  return (
    <section id="tools" className="py-24 px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="font-display uppercase text-4xl md:text-5xl text-black dark:text-white mb-4">
            Tools I <span className="text-orange-600">Use</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-14 max-w-xl mx-auto">
            A creative-tech stack across marketing, automation, development, design, and video.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14 max-w-4xl mx-auto">
          {toolGroups.map((group, i) => {
            const isLastOdd = i === toolGroups.length - 1 && toolGroups.length % 2 === 1
            return (
              <div key={group.label} className={isLastOdd ? 'md:col-span-2' : ''}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-6 text-center">
                  {group.label}
                </h3>
                <div
                  className={
                    isLastOdd
                      ? 'grid grid-cols-2 gap-8 max-w-[240px] mx-auto'
                      : 'grid grid-cols-3 gap-6'
                  }
                >
                  {group.tools.map(tool => {
                    const Icon = tool.icon
                    return (
                      <div key={tool.name} className="reveal flex flex-col items-center group">
                        <div className="w-16 h-16 rounded-lg bg-orange-50 dark:bg-orange-500/5 border-2 border-black/10 dark:border-white/10 flex items-center justify-center mb-3 group-hover:border-orange-500 group-hover:-translate-y-1 group-hover:shadow-hard-sm transition-all">
                          <Icon className="text-orange-600" size={26} strokeWidth={2} />
                        </div>
                        <p className="font-semibold text-sm text-black dark:text-white text-center">{tool.name}</p>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 text-center">{tool.use}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
