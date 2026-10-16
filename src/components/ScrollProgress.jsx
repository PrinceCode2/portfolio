import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../hooks/useScrollReveal'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: 'max',
            scrub: 0.15,
          },
        },
      )
    })

    return () => media.revert()
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[80] h-[3px] bg-black/10 dark:bg-white/10 pointer-events-none motion-reduce:hidden">
      <div ref={barRef} className="h-full origin-left bg-orange-600" />
    </div>
  )
}
