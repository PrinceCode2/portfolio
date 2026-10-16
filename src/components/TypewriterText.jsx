import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../hooks/useScrollReveal'

export default function TypewriterText({
  as: Tag = 'span',
  parts,
  className = '',
  duration = 0.95,
  delay = 0,
  start = 'top 88%',
}) {
  const rootRef = useRef(null)
  const partRefs = useRef([])
  const caretRef = useRef(null)
  const normalizedParts = parts.map(part => typeof part === 'string' ? { text: part } : part)
  const fullText = normalizedParts.map(part => part.text).join('')

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !fullText) return undefined

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const nodes = partRefs.current.filter(Boolean)
        const caret = caretRef.current
        const partTexts = nodes.map(node => node.dataset.typewriterText ?? '')
        const progress = { value: 0 }

        const renderProgress = value => {
          let remaining = Math.round(value)
          partTexts.forEach((text, index) => {
            const count = Math.max(0, Math.min(text.length, remaining))
            nodes[index].textContent = text.slice(0, count)
            remaining -= count
          })
        }

        renderProgress(0)
        gsap.set(caret, { opacity: 1 })

        const tween = gsap.to(progress, {
          value: fullText.length,
          duration,
          delay,
          ease: `steps(${Math.max(fullText.length, 1)})`,
          paused: true,
          onUpdate: () => renderProgress(progress.value),
          onComplete: () => {
            renderProgress(fullText.length)
            gsap.to(caret, { opacity: 0, duration: 0.16 })
          },
        })

        const trigger = ScrollTrigger.create({
          trigger: root,
          start,
          once: true,
          onEnter: () => tween.play(),
        })

        return () => {
          trigger.kill()
          tween.kill()
          renderProgress(fullText.length)
          gsap.set(caret, { clearProps: 'opacity' })
        }
      })
    }, root)

    return () => {
      media.revert()
      context.revert()
    }
  }, [delay, duration, fullText, start])

  return (
    <Tag ref={rootRef} aria-label={fullText} className={`relative ${className}`}>
      <span aria-hidden="true" className="invisible block select-none">
        {normalizedParts.map((part, index) => (
          <span key={`${part.text}-${index}`} className={part.className}>{part.text}</span>
        ))}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block">
        {normalizedParts.map((part, index) => (
          <span
            key={`${part.text}-${index}`}
            ref={node => { partRefs.current[index] = node }}
            data-typewriter-text={part.text}
            className={part.className}
          >
            {part.text}
          </span>
        ))}
        <span ref={caretRef} className="typewriter-caret ml-0.5 inline-block text-orange-600 opacity-0">|</span>
      </span>
    </Tag>
  )
}
