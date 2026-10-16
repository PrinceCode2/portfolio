import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function useScrollReveal(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-reveal]', scope).forEach(element => {
          gsap.from(element, {
            opacity: 0,
            y: element.dataset.reveal === 'small' ? 14 : 28,
            duration: 0.72,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          })
        })

        gsap.utils.toArray('[data-stagger-group]', scope).forEach(group => {
          const items = group.querySelectorAll('[data-stagger-item]')
          if (!items.length) return

          gsap.from(items, {
            opacity: 0,
            y: 24,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: group,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          })
        })

        gsap.utils.toArray('[data-draw-path]', scope).forEach(path => {
          const length = path.getTotalLength()
          gsap.fromTo(
            path,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: path,
                start: 'top 92%',
                end: 'bottom 62%',
                scrub: 0.6,
              },
            },
          )
        })
      })

      media.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const spotlightCleanups = gsap.utils.toArray('[data-spotlight]', scope).map(card => {
          let frame = 0
          const onPointerMove = event => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
              const bounds = card.getBoundingClientRect()
              card.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`)
              card.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`)
            })
          }
          const onPointerLeave = () => {
            cancelAnimationFrame(frame)
            card.style.setProperty('--spotlight-x', '-240px')
            card.style.setProperty('--spotlight-y', '-240px')
          }

          card.addEventListener('pointermove', onPointerMove, { passive: true })
          card.addEventListener('pointerleave', onPointerLeave)
          return () => {
            cancelAnimationFrame(frame)
            card.removeEventListener('pointermove', onPointerMove)
            card.removeEventListener('pointerleave', onPointerLeave)
          }
        })

        const tiltCleanups = gsap.utils.toArray('[data-tilt-card]', scope).map(card => {
          const maxRotateX = Number(card.dataset.tiltRotateX || 10)
          const maxRotateY = Number(card.dataset.tiltRotateY || 12)
          let frame = 0
          let currentRotateX = 0
          let currentRotateY = 0
          let currentScale = 1
          let targetRotateX = 0
          let targetRotateY = 0
          let targetScale = 1

          const render = () => {
            currentRotateX += (targetRotateX - currentRotateX) * 0.12
            currentRotateY += (targetRotateY - currentRotateY) * 0.12
            currentScale += (targetScale - currentScale) * 0.12

            card.style.transform = `perspective(700px) rotateX(${currentRotateX.toFixed(3)}deg) rotateY(${currentRotateY.toFixed(3)}deg) scale(${currentScale.toFixed(4)})`

            const isSettled = Math.abs(targetRotateX - currentRotateX) < 0.01
              && Math.abs(targetRotateY - currentRotateY) < 0.01
              && Math.abs(targetScale - currentScale) < 0.0005

            if (isSettled) {
              currentRotateX = targetRotateX
              currentRotateY = targetRotateY
              currentScale = targetScale
              frame = 0
              if (targetRotateX === 0 && targetRotateY === 0 && targetScale === 1) {
                card.style.removeProperty('transform')
                card.style.removeProperty('will-change')
              }
              return
            }

            frame = requestAnimationFrame(render)
          }

          const requestRender = () => {
            if (!frame) frame = requestAnimationFrame(render)
          }

          const onPointerEnter = () => {
            card.style.willChange = 'transform'
            card.style.setProperty('--tilt-highlight-opacity', '1')
          }

          const onPointerMove = event => {
            const bounds = card.getBoundingClientRect()
            const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
            const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))

            targetRotateY = (x - 0.5) * maxRotateY * 2
            targetRotateX = (0.5 - y) * maxRotateX * 2
            targetScale = 1.02
            card.style.setProperty('--mx', `${x * 100}%`)
            card.style.setProperty('--my', `${y * 100}%`)
            requestRender()
          }

          const resetCard = () => {
            targetRotateX = 0
            targetRotateY = 0
            targetScale = 1
            card.style.setProperty('--tilt-highlight-opacity', '0')
            requestRender()
          }

          card.addEventListener('pointerenter', onPointerEnter, { passive: true })
          card.addEventListener('pointermove', onPointerMove, { passive: true })
          card.addEventListener('pointerleave', resetCard)
          card.addEventListener('pointercancel', resetCard)

          return () => {
            cancelAnimationFrame(frame)
            card.removeEventListener('pointerenter', onPointerEnter)
            card.removeEventListener('pointermove', onPointerMove)
            card.removeEventListener('pointerleave', resetCard)
            card.removeEventListener('pointercancel', resetCard)
            card.style.removeProperty('transform')
            card.style.removeProperty('will-change')
            card.style.removeProperty('--mx')
            card.style.removeProperty('--my')
            card.style.removeProperty('--tilt-highlight-opacity')
          }
        })

        return () => {
          spotlightCleanups.forEach(cleanup => cleanup())
          tiltCleanups.forEach(cleanup => cleanup())
        }
      })
    }, scope)

    return () => {
      media.revert()
      context.revert()
    }
  }, [scopeRef])
}
