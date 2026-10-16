import TypewriterText from './TypewriterText'

export default function ChapterIntro({ chapter, label, title, highlight, description, dark = false, centered = false }) {
  return (
    <div className={`relative mb-10 md:mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
      <div data-reveal="small" className={`flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`}>
        <span
          className={`inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-md border-2 font-mono text-xs font-bold ${
            dark
              ? 'border-orange-500 bg-orange-500 text-black'
              : 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
          }`}
        >
          {chapter}
        </span>
        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? 'text-orange-400' : 'text-orange-600'}`}>
          {label}
        </span>
      </div>

      <TypewriterText
        as="h2"
        parts={[
          { text: `${title} ` },
          { text: highlight, className: 'text-orange-600' },
        ]}
        className={`font-display uppercase text-4xl md:text-5xl leading-[1.02] ${dark ? 'text-white' : 'text-black dark:text-white'}`}
      />

      {description && (
        <TypewriterText
          as="p"
          parts={[description]}
          duration={1.15}
          delay={0.08}
          className={`mt-5 text-base md:text-lg leading-relaxed max-w-2xl ${dark ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'} ${centered ? 'mx-auto' : ''}`}
        />
      )}

      <svg
        aria-hidden="true"
        className={`mt-7 h-6 w-40 ${centered ? 'mx-auto' : ''}`}
        data-reveal="small"
        viewBox="0 0 160 24"
        fill="none"
      >
        <path
          data-draw-path
          d="M1 12 C35 2 55 22 88 12 S130 2 159 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-orange-600"
        />
      </svg>
    </div>
  )
}
