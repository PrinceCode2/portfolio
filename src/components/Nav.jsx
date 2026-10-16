import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import logo from '../assets/logo.png'

const links = [
  { href: '#problems', label: 'Problems' },
  { href: '#experience', label: 'Experience' },
  { href: '#tools', label: 'Capabilities' },
  { href: '#projects', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '/Prince-Nobleza-Resume.pdf', label: 'Resume', external: true },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const navListRef = useRef(null)
  const pillRef = useRef(null)
  const linkRefs = useRef([])
  const previewIndexRef = useRef(null)

  useEffect(() => {
    const sectionLinks = links.filter(link => !link.external)
    let scrollFrame = 0

    const updateActiveSection = () => {
      const readingLine = Math.min(window.innerHeight * 0.32, 260)
      const currentLink = sectionLinks.find(link => {
        const section = document.querySelector(link.href)
        if (!section) return false
        const bounds = section.getBoundingClientRect()
        return bounds.top <= readingLine && bounds.bottom > readingLine
      })

      setActiveHref(previous => previous === (currentLink?.href ?? '') ? previous : (currentLink?.href ?? ''))
    }

    const scheduleActiveSectionUpdate = () => {
      cancelAnimationFrame(scrollFrame)
      scrollFrame = requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true })
    window.addEventListener('resize', scheduleActiveSectionUpdate)
    window.addEventListener('hashchange', scheduleActiveSectionUpdate)

    return () => {
      cancelAnimationFrame(scrollFrame)
      window.removeEventListener('scroll', scheduleActiveSectionUpdate)
      window.removeEventListener('resize', scheduleActiveSectionUpdate)
      window.removeEventListener('hashchange', scheduleActiveSectionUpdate)
    }
  }, [])

  useLayoutEffect(() => {
    const navList = navListRef.current
    const pill = pillRef.current
    if (!navList || !pill) return undefined

    const movePill = index => {
      const link = linkRefs.current[index]
      if (!link) {
        pill.classList.remove('is-visible')
        return
      }

      const listBounds = navList.getBoundingClientRect()
      const linkBounds = link.getBoundingClientRect()
      const baseWidth = 100
      pill.style.setProperty('--nav-pill-x', `${linkBounds.left - listBounds.left}px`)
      pill.style.setProperty('--nav-pill-scale', `${linkBounds.width / baseWidth}`)
      pill.classList.add('is-visible')
    }

    const moveToCurrentLink = () => {
      const activeIndex = links.findIndex(link => link.href === activeHref)
      movePill(activeIndex)
    }

    const resizeObserver = new ResizeObserver(() => {
      movePill(previewIndexRef.current ?? links.findIndex(link => link.href === activeHref))
    })

    resizeObserver.observe(navList)
    linkRefs.current.filter(Boolean).forEach(link => resizeObserver.observe(link))

    if (previewIndexRef.current === null) moveToCurrentLink()

    return () => resizeObserver.disconnect()
  }, [activeHref])

  const previewLink = index => {
    previewIndexRef.current = index
    const navList = navListRef.current
    const pill = pillRef.current
    const link = linkRefs.current[index]
    if (!navList || !pill || !link) return

    const listBounds = navList.getBoundingClientRect()
    const linkBounds = link.getBoundingClientRect()
    pill.style.setProperty('--nav-pill-x', `${linkBounds.left - listBounds.left}px`)
    pill.style.setProperty('--nav-pill-scale', `${linkBounds.width / 100}`)
    pill.classList.add('is-visible')
  }

  const restoreActiveLink = () => {
    previewIndexRef.current = null
    const activeIndex = links.findIndex(link => link.href === activeHref)
    const navList = navListRef.current
    const pill = pillRef.current
    const activeLink = linkRefs.current[activeIndex]

    if (!navList || !pill || !activeLink) {
      pill?.classList.remove('is-visible')
      return
    }

    const listBounds = navList.getBoundingClientRect()
    const linkBounds = activeLink.getBoundingClientRect()
    pill.style.setProperty('--nav-pill-x', `${linkBounds.left - listBounds.left}px`)
    pill.style.setProperty('--nav-pill-scale', `${linkBounds.width / 100}`)
    pill.classList.add('is-visible')
  }

  const handleNavBlur = event => {
    if (!event.currentTarget.contains(event.relatedTarget)) restoreActiveLink()
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cream/85 dark:bg-black/85 border-b-2 border-black/10 dark:border-white/10">
      <div className="story-shell flex items-center justify-between py-3">
        <a href="#top" className="shrink-0">
          <img src={logo} alt="Prince Nobleza" className="h-10 w-auto" />
        </a>

        <nav
          ref={navListRef}
          aria-label="Primary navigation"
          onPointerLeave={restoreActiveLink}
          onBlur={handleNavBlur}
          className="nav-highlight-list hidden lg:flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          <span ref={pillRef} aria-hidden="true" className="nav-highlight-pill" />
          {links.map(link => (
            <a
              key={link.href}
              ref={element => { linkRefs.current[links.indexOf(link)] = element }}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              aria-current={activeHref === link.href ? 'location' : undefined}
              onPointerEnter={() => previewLink(links.indexOf(link))}
              onFocus={() => previewLink(links.indexOf(link))}
              className={`nav-highlight-link ${activeHref === link.href ? 'is-current' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors"
          >
            Let's Talk
          </a>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full border-2 border-black/10 dark:border-white/20 bg-white dark:bg-white/5 text-black dark:text-white"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="lg:hidden border-t-2 border-black/10 dark:border-white/10 bg-cream dark:bg-black px-6 py-4 flex flex-col gap-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMenuOpen(false)}
              aria-current={activeHref === link.href ? 'location' : undefined}
              className={`hover:text-orange-600 transition-colors ${activeHref === link.href ? 'text-orange-600' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors"
          >
            Let's Talk
          </a>
        </nav>
      )}
    </header>
  )
}
