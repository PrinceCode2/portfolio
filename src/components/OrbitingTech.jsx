import { useLayoutEffect, useRef } from 'react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import TechnologyMark from './TechnologyMark'
import { featuredOrbitTechnologies } from '../data/technologies'
import { gsap, ScrollTrigger } from '../hooks/useScrollReveal'

gsap.registerPlugin(MotionPathPlugin)

const fallbackPositions = [
  'left-[3%] top-[8%] md:left-[7%] md:top-[9%]',
  'right-[3%] top-[14%] md:right-[8%] md:top-[13%]',
  'right-[1%] bottom-[18%] md:right-[3%] md:bottom-[24%]',
  'left-[7%] bottom-[12%]',
  'left-[2%] bottom-[16%] md:left-[19%] md:top-[29%] md:bottom-auto',
  'left-[1%] top-[47%] md:left-auto md:right-[19%] md:top-[31%]',
  'right-[20%] bottom-[28%]',
  'left-[20%] bottom-[25%]',
]

export default function OrbitingTech({ children }) {
  const rootRef = useRef(null)
  const outerPathRef = useRef(null)
  const innerPathRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 768px)', compact: '(max-width: 767px)' },
        context => {
          if (!context.conditions.motion) return

          const items = gsap.utils.toArray('[data-orbit-item]', rootRef.current)
          const activeItems = context.conditions.compact
            ? items.filter(item => item.dataset.mobile !== 'false')
            : items
          const inactiveItems = items.filter(item => !activeItems.includes(item))
          gsap.set(inactiveItems, { display: 'none' })
          gsap.set(activeItems, { display: 'block' })
          const outerItems = activeItems.filter(item => item.dataset.orbit === 'outer')
          const innerItems = activeItems.filter(item => item.dataset.orbit === 'inner')
          gsap.set(activeItems, { left: 0, top: 0, right: 'auto', bottom: 'auto' })

          const tweens = activeItems.map(item => {
            const outer = context.conditions.compact || item.dataset.orbit === 'outer'
            const group = context.conditions.compact ? activeItems : (outer ? outerItems : innerItems)
            const phase = group.indexOf(item) / group.length
            const face = item.querySelector('[data-orbit-face]')
            const tween = gsap.to(item, {
              duration: context.conditions.compact ? (outer ? 32 : 24) : (outer ? 26 : 18),
              ease: 'none',
              repeat: -1,
              motionPath: {
                path: outer ? outerPathRef.current : innerPathRef.current,
                align: outer ? outerPathRef.current : innerPathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
              },
              onUpdate: () => {
                const rootHeight = rootRef.current?.offsetHeight || 1
                const y = Number.parseFloat(gsap.getProperty(item, 'y')) || 0
                const t = gsap.utils.clamp(-1, 1, (y - rootHeight * 0.5) / (rootHeight * 0.38))
                const depth = (t + 1) / 2
                gsap.set(face, {
                  scale: (context.conditions.compact ? 0.92 : 0.88) + depth * (context.conditions.compact ? 0.08 : 0.18),
                  opacity: 0.74 + depth * 0.26,
                })
              },
            })

            tween.progress(phase)
            return tween
          })

          const visibilityTrigger = ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => tweens.forEach(tween => tween.play()),
            onEnterBack: () => tweens.forEach(tween => tween.play()),
            onLeave: () => tweens.forEach(tween => tween.pause()),
            onLeaveBack: () => tweens.forEach(tween => tween.pause()),
          })

          const haloTween = gsap.to('.orbit-halo', {
            scale: 1.12,
            opacity: 0.18,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })

          return () => {
            visibilityTrigger.kill()
            tweens.forEach(tween => tween.kill())
            haloTween.kill()
          }
        },
      )
    }, rootRef)

    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <div ref={rootRef} className="hero-visual relative mx-auto aspect-square w-full max-w-[38rem]" aria-label="Technology ecosystem">
      <div className="orbit-halo absolute inset-[18%] rounded-full border-2 border-orange-500/30 bg-orange-500/10" aria-hidden="true" />

      <svg className="absolute inset-0 h-full w-full text-black/15 dark:text-white/20" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <path ref={outerPathRef} d="M52 300 C52 105 548 105 548 300 C548 495 52 495 52 300 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="8 10" />
        <path ref={innerPathRef} d="M115 300 C115 158 485 158 485 300 C485 442 115 442 115 300 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="5 9" />
      </svg>

      <div className="absolute inset-[24%] sm:inset-[22%] lg:inset-[20%] z-10 flex items-center justify-center">
        {children}
      </div>

      <ul className="absolute inset-0 z-20 pointer-events-none" aria-label="Featured technologies">
        {featuredOrbitTechnologies.map((technology, index) => (
          <li
            key={technology.name}
            data-orbit-item
            data-orbit={technology.orbit}
            data-mobile={technology.mobile}
            className={`absolute ${technology.mobile ? '' : 'hidden md:block'} ${fallbackPositions[index]}`}
          >
            <div data-orbit-face>
              <TechnologyMark name={technology.name} variant="orbit" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
