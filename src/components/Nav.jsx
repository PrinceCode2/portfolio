import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import logo from '../assets/logo.png'

const links = [
  { href: '#projects', label: 'Work' },
  { href: '#tools', label: 'Tools' },
  { href: '#contact', label: 'Contact' },
  { href: '/Prince-Nobleza-Resume.pdf', label: 'Resume', external: true },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cream/85 dark:bg-black/85 border-b-2 border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="#top" className="shrink-0">
          <img src={logo} alt="Prince Nobleza" className="h-10 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="hover:text-orange-600 transition-colors"
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
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border-2 border-black/10 dark:border-white/20 bg-white dark:bg-white/5 text-black dark:text-white"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t-2 border-black/10 dark:border-white/10 bg-cream dark:bg-black px-6 py-4 flex flex-col gap-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMenuOpen(false)}
              className="hover:text-orange-600 transition-colors"
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
