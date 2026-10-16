import { useLayoutEffect, useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import princePhoto from '../assets/prince-photo.jpg'
import OrbitingTech from './OrbitingTech'
import { gsap } from '../hooks/useScrollReveal'

const supportingLine = "I'm Prince Nobleza. I build CRM automations, responsive websites, integrations, and practical digital workflows that make work clearer and easier to manage."

export default function Hero() {
  const heroRef = useRef(null)
  const typewriterRef = useRef(null)
  const typewriterCaretRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const ctx = gsap.context(() => {
      media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 768px)' }, context => {
        if (!context.conditions.motion) return
        const typedText = typewriterRef.current
        const caret = typewriterCaretRef.current
        const typingProgress = { value: 0 }

        gsap.set('.hero-stroke-word', { '--headline-fill': '0%' })
        if (typedText) typedText.textContent = ''
        if (caret) gsap.set(caret, { opacity: 1 })

        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
        tl.from('.hero-chapter', { opacity: 0, y: 14, duration: 0.45 })
          .from('.hero-badge', { opacity: 0, y: 18, duration: 0.5 }, '-=0.2')
          .from('.hero-title', { y: 26, duration: 0.62 }, '-=0.25')
          .to('.hero-stroke-word', { '--headline-fill': '100%', duration: 0.9, stagger: 0.14, ease: 'power2.inOut' }, '-=0.38')
          .from('.hero-emphasis', { scale: 0.94, duration: 0.5, ease: 'back.out(1.5)', transformOrigin: '50% 65%' }, '-=0.58')
          .from('.hero-subtitle', { opacity: 0, y: 12, duration: 0.42 }, '-=0.5')
          .to(typingProgress, {
            value: supportingLine.length,
            duration: context.conditions.desktop ? 1.65 : 1.35,
            ease: `steps(${supportingLine.length})`,
            onUpdate: () => {
              if (typedText) typedText.textContent = supportingLine.slice(0, Math.round(typingProgress.value))
            },
          }, '-=0.22')
          .to(caret, { opacity: 0, duration: 0.18 }, '+=0.12')
          .from('.hero-proof', { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
          .from('.hero-cta', { opacity: 0, y: 16, duration: 0.5 }, '-=0.28')
          .from('.hero-visual', { opacity: 0, scale: 0.96, y: 20, duration: 0.7 }, '-=0.6')

        const route = heroRef.current.querySelector('.hero-route')
        if (route) {
          const length = route.getTotalLength()
          gsap.fromTo(
            route,
            { strokeDasharray: length, strokeDashoffset: length },
            { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', delay: 0.35 },
          )
        }

        gsap.to('.hero-copy', {
          y: context.conditions.desktop ? 24 : 10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })

        gsap.to('.hero-photo', {
          y: context.conditions.desktop ? -18 : -8,
          scale: context.conditions.desktop ? 0.93 : 0.97,
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        })

        if (context.conditions.desktop) {
          gsap.to('.hero-visual', {
            y: -28,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
        }
      })
    }, heroRef)
    return () => {
      media.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-[calc(100svh-66px)] flex items-center bg-cream dark:bg-black text-black dark:text-white overflow-hidden py-16 sm:py-20 lg:py-24 transition-colors"
    >
      {/* decorative layer — desktop only, kept off mobile to avoid crowding the CTAs */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/20 dark:bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[350px] translate-x-1/4 translate-y-1/4 bg-amber-300/20 dark:bg-orange-500/10 blur-[100px] rounded-full" />

        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border-2 border-black/10 dark:border-white/10" />
        <div className="absolute top-16 right-[38%] w-5 h-5 rounded-full border-2 border-orange-500/50" />
        <div className="absolute bottom-24 right-[8%] w-3 h-3 rounded-full bg-orange-500/40" />

        <div className="absolute top-24 left-[40%] w-28 h-28 bg-dots text-black/15 dark:text-white/15" />

        <svg className="absolute bottom-10 left-8 w-40 h-32 text-orange-500/60" viewBox="0 0 160 128" fill="none" aria-hidden="true">
          <path className="hero-route" d="M4 120 C35 98 28 62 64 57 S105 80 124 43 S139 19 154 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="154" cy="8" r="5" fill="currentColor" />
        </svg>
      </div>

      {/* soft glow on mobile — small, centered, no overflow risk */}
      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 w-[280px] h-[220px] bg-orange-500/25 dark:bg-orange-600/15 blur-[80px] rounded-full pointer-events-none" />

      <div className="story-shell relative grid lg:grid-cols-[minmax(0,0.96fr)_minmax(470px,1.04fr)] gap-12 lg:gap-8 xl:gap-12 items-center">
        <div className="hero-copy flex flex-col items-start text-left">
          <div className="hero-chapter flex items-center gap-3 mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            <span className="w-9 h-9 rounded-md border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">01</span>
            Meet Prince
          </div>
          <span className="hero-badge px-4 py-1 mb-6 text-xs font-bold uppercase tracking-widest border-2 border-orange-500 rounded-full text-orange-600 bg-orange-50 dark:bg-orange-500/10">
            Automation Specialist &amp; Web Developer
          </span>

          <h1 aria-label="I turn ideas into useful systems." className="hero-title font-display uppercase text-5xl sm:text-6xl xl:text-7xl leading-[0.94] tracking-tight">
            <span aria-hidden="true" className="hero-stroke-word inline">I turn ideas into </span>
            <span aria-hidden="true" className="hero-stroke-word hero-emphasis hero-stroke-word-accent inline-block mx-[0.04em]">useful systems.</span>
          </h1>

          <p aria-label={supportingLine} className="hero-subtitle relative mt-6 max-w-xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <span aria-hidden="true" className="invisible block">{supportingLine}</span>
            <span aria-hidden="true" className="absolute inset-0">
              <span ref={typewriterRef}>{supportingLine}</span>
              <span ref={typewriterCaretRef} className="hero-typewriter-caret ml-0.5 inline-block text-orange-600 opacity-0">|</span>
            </span>
          </p>

          <ul className="hero-proof mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide" aria-label="Core capabilities">
            {['Automation', 'Web systems', 'SEO & content'].map(item => (
              <li key={item} className="px-3 py-2 rounded-md border-2 border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5">
                {item}
              </li>
            ))}
          </ul>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
            <a
              href="#projects"
              className="btn-brutal rounded-md px-8 py-3.5 bg-orange-600 text-white font-bold uppercase tracking-wide text-sm hover:bg-orange-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              View Work <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="btn-brutal rounded-md px-8 py-3.5 bg-transparent text-black dark:text-white font-bold uppercase tracking-wide text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors inline-flex items-center justify-center"
            >
              Contact Me
            </a>
          </div>
        </div>

        <OrbitingTech>
          <div className="hero-photo relative w-full max-w-md">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-lg border-hard bg-orange-600" />
            <div className="hidden md:block absolute -bottom-2 -right-2 h-full w-full rounded-lg border-2 border-black/20 dark:border-white/20" />
            <div className="absolute -top-3 -left-3 h-12 w-12 bg-dots text-orange-600/60 dark:text-orange-400/40" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border-hard bg-orange-50 shadow-hard dark:bg-white/5">
              <img
                src={princePhoto}
                alt="Prince Nobleza in graduation attire"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </OrbitingTech>
      </div>

      <a href="#problems" aria-label="Continue to the problems I solve" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-orange-600 motion-safe:animate-bounce motion-reduce:animate-none">
        <ArrowDown size={28} />
      </a>
    </section>
  )
}
