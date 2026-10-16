import { useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

export default function ProjectMediaGallery({ project, icon: Icon, variant = 'modal', index = 0 }) {
  const media = project?.media ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const galleryId = useId()
  const pointerStartRef = useRef(null)
  const thumbnailRefs = useRef([])

  if (!media.length) {
    return (
      <div className={`project-media-placeholder relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent ${variant === 'card' ? 'h-44 border-b-2 border-black/10 dark:border-white/10' : 'min-h-64 border-b-2 border-black/10 dark:border-white/10'}`}>
        {variant === 'card' && (
          <>
            <span className="absolute top-4 left-4 font-mono text-xs font-bold text-gray-500">{String(index + 1).padStart(2, '0')}</span>
            <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">Media coming soon</span>
          </>
        )}
        <div className="text-center px-6">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg border-2 border-orange-500/55 bg-white/75 text-orange-600 shadow-[3px_3px_0_0_#ea580c] dark:bg-black/55 dark:text-orange-400">
            {Icon ? <Icon size={29} strokeWidth={1.5} aria-hidden="true" /> : <ImageIcon size={28} aria-hidden="true" />}
          </span>
          {variant === 'modal' && (
            <div className="mt-4">
              <p className="text-sm font-bold text-black dark:text-white">Media coming soon</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Approved screenshots, mobile previews, or a walkthrough can be added here without changing the project card.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    const first = media[0]
    return (
      <div className="relative h-44 overflow-hidden border-b-2 border-white/10 bg-black">
        {first.type === 'video' ? (
          <video src={first.src} poster={first.poster} muted preload="metadata" className="h-full w-full object-cover" aria-label={first.alt || `${project.title} video preview`} />
        ) : (
          <img src={first.src} alt={first.alt || `${project.title} preview`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <span className="absolute top-4 left-4 font-mono text-xs font-bold text-white/80">{String(index + 1).padStart(2, '0')}</span>
        <span className="absolute bottom-4 left-4 rounded-full bg-black/75 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">Project media</span>
      </div>
    )
  }

  const activeItem = media[activeIndex]
  const setActive = nextIndex => setActiveIndex((nextIndex + media.length) % media.length)
  const thumbnailColumns = Math.min(media.length, 5)
  const thumbnailColumn = activeIndex % 5
  const thumbnailRow = Math.floor(activeIndex / 5)

  const handleGalleryKeyDown = event => {
    if (event.target instanceof HTMLVideoElement) return

    let nextIndex = null
    if (event.key === 'ArrowLeft') nextIndex = activeIndex - 1
    if (event.key === 'ArrowRight') nextIndex = activeIndex + 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = media.length - 1
    if (nextIndex === null) return

    event.preventDefault()
    const normalizedIndex = (nextIndex + media.length) % media.length
    setActiveIndex(normalizedIndex)
    if (event.target.getAttribute('role') === 'tab') {
      requestAnimationFrame(() => thumbnailRefs.current[normalizedIndex]?.focus())
    }
  }

  return (
    <section
      aria-label={`${project.title} media gallery`}
      className="border-b-2 border-black/10 bg-black dark:border-white/10"
      onKeyDown={handleGalleryKeyDown}
    >
      <div className="relative aspect-video overflow-hidden bg-[#080808]">
        <div
          className="absolute inset-0 touch-pan-y"
          onPointerDown={event => {
            if (!event.isPrimary) return
            pointerStartRef.current = { x: event.clientX, y: event.clientY }
          }}
          onPointerUp={event => {
            if (pointerStartRef.current === null) return
            const distanceX = event.clientX - pointerStartRef.current.x
            const distanceY = event.clientY - pointerStartRef.current.y
            pointerStartRef.current = null
            if (media.length > 1 && Math.abs(distanceX) > 48 && Math.abs(distanceX) > Math.abs(distanceY) * 1.25) {
              setActive(activeIndex + (distanceX < 0 ? 1 : -1))
            }
          }}
          onPointerCancel={() => { pointerStartRef.current = null }}
        >
          {media.map((item, itemIndex) => {
            const isActive = activeIndex === itemIndex
            return (
              <figure
                key={`${item.src}-${itemIndex}`}
                id={`${galleryId}-panel-${itemIndex}`}
                role={media.length > 1 ? 'tabpanel' : undefined}
                aria-labelledby={media.length > 1 ? `${galleryId}-tab-${itemIndex}` : undefined}
                aria-hidden={!isActive}
                className={`project-gallery-panel absolute inset-0 ${isActive ? 'z-10 scale-100 opacity-100' : 'pointer-events-none scale-[1.06] opacity-0'}`}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    controls={isActive}
                    preload="metadata"
                    tabIndex={isActive ? 0 : -1}
                    className="h-full w-full object-contain"
                    aria-label={item.alt || `${project.title} video demonstration`}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt || `${project.title} project screenshot`}
                    loading={itemIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                )}
              </figure>
            )
          })}
        </div>
        {media.length > 1 && (
          <>
            <button type="button" onClick={() => setActive(activeIndex - 1)} aria-label="Previous project media" className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/75 text-white hover:border-orange-500">
              <ChevronLeft size={19} />
            </button>
            <button type="button" onClick={() => setActive(activeIndex + 1)} aria-label="Next project media" className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/75 text-white hover:border-orange-500">
              <ChevronRight size={19} />
            </button>
          </>
        )}
      </div>

      {(activeItem.caption || activeItem.description) && (
        <div className="px-5 py-3 text-sm text-gray-300" aria-live="polite">
          {activeItem.caption && <p className="font-semibold text-white">{activeItem.caption}</p>}
          {activeItem.description && <p className="mt-1 text-xs leading-relaxed text-gray-400">{activeItem.description}</p>}
        </div>
      )}

      {media.length > 1 && (
        <div className="p-3">
          <div
            role="tablist"
            aria-label="Choose project media"
            className="relative grid gap-[6px]"
            style={{
              gridTemplateColumns: `repeat(${thumbnailColumns}, minmax(0, 1fr))`,
              '--thumbnail-x': `calc(${thumbnailColumn * 100}% + ${thumbnailColumn * 6}px)`,
              '--thumbnail-y': `calc(${thumbnailRow * 100}% + ${thumbnailRow * 6}px)`,
              '--thumbnail-width': `calc(${100 / thumbnailColumns}% - ${((thumbnailColumns - 1) * 6) / thumbnailColumns}px)`,
            }}
          >
            <span
              aria-hidden="true"
              className="project-gallery-thumbnail-indicator pointer-events-none absolute left-0 top-0 z-20"
            />
            {media.map((item, itemIndex) => (
              <button
                key={`${item.src}-${itemIndex}`}
                ref={element => { thumbnailRefs.current[itemIndex] = element }}
                id={`${galleryId}-tab-${itemIndex}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === itemIndex}
                aria-controls={`${galleryId}-panel-${itemIndex}`}
                aria-label={`${item.type === 'video' ? 'Video' : 'Photo'} ${itemIndex + 1} of ${media.length}`}
                tabIndex={activeIndex === itemIndex ? 0 : -1}
                onClick={() => setActiveIndex(itemIndex)}
                className={`relative aspect-video overflow-hidden rounded-md border border-white/15 transition-opacity focus-visible:z-30 ${activeIndex === itemIndex ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                {item.type === 'video' ? (
                  <video src={item.src} poster={item.poster} muted preload="metadata" className="h-full w-full object-cover" />
                ) : (
                  <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="sr-only" aria-live="polite">Media {activeIndex + 1} of {media.length}</p>
    </section>
  )
}
