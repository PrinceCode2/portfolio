import { useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKeyDown = e => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  const Icon = project.icon

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto border-hard rounded-lg shadow-hard bg-white dark:bg-[#0d0d0d]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-black border-2 border-black/10 dark:border-white/20 text-black dark:text-white hover:border-orange-500 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="h-64 bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent dark:from-orange-500/15 dark:via-orange-500/5 flex items-center justify-center border-b-2 border-black/10 dark:border-white/10">
          <Icon size={72} strokeWidth={1.2} className="text-orange-600" />
        </div>

        <div className="p-8">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-orange-600 border-2 border-orange-500 rounded-full">
            {project.category}
          </span>
          <h3 className="font-display uppercase text-2xl text-black dark:text-white mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            {project.longDesc}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal rounded-md inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold uppercase tracking-wide text-sm hover:bg-orange-700 transition-colors"
          >
            Visit Live Site <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
