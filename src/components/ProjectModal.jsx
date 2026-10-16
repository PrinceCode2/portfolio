import { useEffect, useRef } from 'react'
import { X, ExternalLink } from 'lucide-react'
import TechnologyMark from './TechnologyMark'
import ProjectMediaGallery from './ProjectMediaGallery'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const previouslyFocused = document.activeElement
    const onKeyDown = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [project, onClose])

  if (!project) return null

  const Icon = project.icon
  const hasLiveLink = project.link && project.link !== '#'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={event => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border-hard rounded-lg shadow-hard bg-white dark:bg-[#0d0d0d]"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-black border-2 border-black/10 dark:border-white/20 text-black dark:text-white hover:border-orange-500 transition-colors"
        >
          <X size={18} />
        </button>

        <ProjectMediaGallery key={project.title} project={project} icon={Icon} />

        <div className="p-8">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-orange-600 border-2 border-orange-500 rounded-full">
            {project.category}
          </span>
          <h3 id="project-modal-title" className="font-display uppercase text-2xl text-black dark:text-white mb-6 leading-tight">
            {project.title}
          </h3>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">Project focus</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.desc}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">What was built</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.longDesc}</p>
            </div>
            {project.tools?.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">Tools and focus areas</p>
                <ul className="flex flex-wrap gap-2">
                  {project.tools.map(tool => (
                    <li key={tool}>
                      <TechnologyMark name={tool} variant="badge" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {hasLiveLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal mt-8 rounded-md inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold uppercase tracking-wide text-sm hover:bg-orange-700 transition-colors"
            >
              Visit Live Site <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
