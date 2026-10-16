import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    } catch {
      // The pre-render theme script already provides the dark fallback.
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#fff8f2')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Theme selection still works when storage is unavailable.
    }
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return { theme, toggleTheme }
}
