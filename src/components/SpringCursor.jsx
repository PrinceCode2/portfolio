import { useEffect, useRef } from 'react'

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'summary',
  '[data-cursor]',
  '[role="button"]',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="reset"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
].join(',')

const EDITABLE_SELECTOR = [
  'textarea',
  'select',
  '[role="textbox"]',
  '[contenteditable]:not([contenteditable="false"])',
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"])',
].join(',')

export default function SpringCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined

    const compatibilityQuery = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    let removeInteractionListeners = () => {}

    const disable = () => {
      removeInteractionListeners()
      removeInteractionListeners = () => {}
      document.documentElement.classList.remove('has-spring-cursor')
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible', 'is-interactive')
      dot.style.removeProperty('transform')
      ring.style.removeProperty('transform')
    }

    const enable = () => {
      document.documentElement.classList.add('has-spring-cursor')

      const pointer = { x: 0, y: 0 }
      const position = { x: 0, y: 0 }
      const velocity = { x: 0, y: 0 }
      let currentScale = 1
      let targetScale = 1
      let frame = 0
      let initialized = false

      const setVisibility = nextVisible => {
        dot.classList.toggle('is-visible', nextVisible)
        ring.classList.toggle('is-visible', nextVisible)
      }

      const render = () => {
        velocity.x += (pointer.x - position.x) * 0.1
        velocity.y += (pointer.y - position.y) * 0.1
        velocity.x *= 0.78
        velocity.y *= 0.78
        position.x += velocity.x
        position.y += velocity.y
        currentScale += (targetScale - currentScale) * 0.16

        ring.style.transform = `translate3d(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currentScale.toFixed(3)})`

        const isSettled = Math.abs(pointer.x - position.x) < 0.05
          && Math.abs(pointer.y - position.y) < 0.05
          && Math.abs(velocity.x) < 0.05
          && Math.abs(velocity.y) < 0.05
          && Math.abs(targetScale - currentScale) < 0.002

        if (isSettled) {
          position.x = pointer.x
          position.y = pointer.y
          velocity.x = 0
          velocity.y = 0
          currentScale = targetScale
          ring.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${currentScale})`
          frame = 0
          return
        }

        frame = requestAnimationFrame(render)
      }

      const requestRender = () => {
        if (!frame) frame = requestAnimationFrame(render)
      }

      const updatePointerTarget = event => {
        const target = event.target instanceof Element ? event.target : null
        const isEditable = Boolean(target?.closest(EDITABLE_SELECTOR))
        const isInteractive = !isEditable && Boolean(target?.closest(INTERACTIVE_SELECTOR))

        pointer.x = event.clientX
        pointer.y = event.clientY
        dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`

        if (!initialized) {
          position.x = pointer.x
          position.y = pointer.y
          initialized = true
        }

        targetScale = isInteractive ? 1.7 : 1
        ring.classList.toggle('is-interactive', isInteractive)
        setVisibility(!isEditable)
        requestRender()
      }

      const hideCursor = event => {
        if (event?.relatedTarget) return
        setVisibility(false)
        initialized = false
        targetScale = 1
        velocity.x = 0
        velocity.y = 0
        cancelAnimationFrame(frame)
        frame = 0
      }

      const handleVisibility = () => {
        if (document.hidden) hideCursor()
      }

      window.addEventListener('pointermove', updatePointerTarget, { passive: true })
      window.addEventListener('pointerout', hideCursor, { passive: true })
      window.addEventListener('blur', hideCursor)
      document.addEventListener('visibilitychange', handleVisibility)

      removeInteractionListeners = () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('pointermove', updatePointerTarget)
        window.removeEventListener('pointerout', hideCursor)
        window.removeEventListener('blur', hideCursor)
        document.removeEventListener('visibilitychange', handleVisibility)
      }
    }

    const syncCompatibility = () => {
      disable()
      if (compatibilityQuery.matches) enable()
    }

    syncCompatibility()
    compatibilityQuery.addEventListener('change', syncCompatibility)

    return () => {
      compatibilityQuery.removeEventListener('change', syncCompatibility)
      disable()
    }
  }, [])

  return (
    <div aria-hidden="true" className="spring-cursor-layer">
      <span ref={ringRef} className="spring-cursor-ring" />
      <span ref={dotRef} className="spring-cursor-dot" />
    </div>
  )
}
