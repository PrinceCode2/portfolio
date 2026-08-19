import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowRight } from 'lucide-react'
import princePhoto from '../assets/prince-photo.jpg'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6 })
        .from('.hero-title', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from('.hero-photo', { opacity: 0, scale: 0.9, duration: 0.7 }, '-=0.6')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-cream dark:bg-black text-black dark:text-white overflow-hidden px-6 py-32 transition-colors"
    >
      {/* decorative layer — desktop only, kept off mobile to avoid crowding the CTAs */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/20 dark:bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[350px] translate-x-1/4 translate-y-1/4 bg-amber-300/20 dark:bg-orange-500/10 blur-[100px] rounded-full" />

        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full border-2 border-black/10 dark:border-white/10" />
        <div className="absolute top-16 right-[38%] w-5 h-5 rounded-full border-2 border-orange-500/50" />
        <div className="absolute bottom-24 right-[8%] w-3 h-3 rounded-full bg-orange-500/40" />

        <div className="absolute top-24 left-[40%] w-28 h-28 bg-dots text-black/15 dark:text-white/15" />

        <svg className="absolute bottom-14 left-8 w-24 h-24 text-orange-500/50" viewBox="0 0 100 100" fill="none">
          <line x1="0" y1="100" x2="65" y2="35" stroke="currentColor" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
          <circle cx="70" cy="30" r="4" fill="currentColor" />
        </svg>
      </div>

      {/* soft glow on mobile — small, centered, no overflow risk */}
      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 w-[280px] h-[220px] bg-orange-500/25 dark:bg-orange-600/15 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">
        <div className="flex flex-col items-start text-left">
          <span className="hero-badge px-4 py-1 mb-6 text-xs font-bold uppercase tracking-widest border-2 border-orange-500 rounded-full text-orange-600 bg-orange-50 dark:bg-orange-500/10">
            Digital Marketing Specialist &amp; Web Developer
          </span>

          <h1 className="hero-title font-display uppercase text-5xl md:text-6xl leading-[0.95] tracking-tight">
            Hi, I'm <span className="text-orange-600">Prince</span>
          </h1>

          <p className="hero-subtitle mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-md">
            Creating strategy-driven content, SEO, and web experiences that grow brands.
          </p>

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

        <div className="hero-photo relative mx-auto md:mx-0">
          <div className="absolute -bottom-5 -right-5 w-full h-full border-hard bg-orange-600 rounded-lg" />
          <div className="hidden md:block absolute -bottom-2.5 -right-2.5 w-full h-full border-2 border-black/20 dark:border-white/20 rounded-lg" />
          <div className="absolute -top-4 -left-4 w-14 h-14 bg-dots text-orange-600/60 dark:text-orange-400/40" />
          <div className="relative aspect-[4/5] w-full max-w-sm border-hard rounded-lg shadow-hard bg-orange-50 dark:bg-white/5 overflow-hidden">
            <img
              src={princePhoto}
              alt="Prince"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <ArrowDown className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-orange-600" size={28} />
    </section>
  )
}
