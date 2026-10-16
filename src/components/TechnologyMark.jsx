import reactLogo from '../assets/react.svg'
import technologySprite from '../assets/technology-icons.svg'
import highLevelDark from '../assets/gohighlevel-dark.png'
import highLevelLight from '../assets/gohighlevel-light.png'
import mysqlLogo from '../assets/mysql.svg'
import canvaLogo from '../assets/canva.svg'
import githubLogo from '../assets/github.svg'
import { getTechnologyMeta } from '../data/technologies'

const variantClasses = {
  orbit: 'h-12 w-12 md:h-14 md:w-14 rounded-xl border-2 border-black/15 dark:border-white/20 bg-white dark:bg-[#111] shadow-hard-sm justify-center',
  tile: 'w-full min-h-16 rounded-lg border-2 border-black/10 dark:border-white/15 bg-white/80 dark:bg-black/35 px-3 py-2.5 gap-2.5',
  badge: 'max-w-full rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-2.5 py-1.5 gap-2',
  marquee: 'min-h-14 w-auto max-w-[19rem] flex-nowrap rounded-lg border-2 border-black/15 dark:border-white/20 bg-white dark:bg-[#111] px-4 py-2.5 gap-2.5 shadow-hard-sm',
}

const standaloneAssets = {
  mysql: mysqlLogo,
  canva: canvaLogo,
  github: githubLogo,
}

export default function TechnologyMark({ name, variant = 'tile', showLabel = variant !== 'orbit' }) {
  const meta = getTechnologyMeta(name)
  const assets = meta.assets ?? []
  const isOrbit = variant === 'orbit'
  const isBadge = variant === 'badge'
  const isMarquee = variant === 'marquee'
  const isWordmark = meta.wordmark
  const containerClass = isWordmark && isOrbit
    ? 'h-12 w-28 md:h-14 md:w-32 rounded-xl border-2 border-black/15 dark:border-white/20 bg-white dark:bg-[#111] shadow-hard-sm justify-center px-2.5'
    : variantClasses[variant] ?? variantClasses.tile

  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={`inline-flex min-w-0 items-center overflow-hidden ${isMarquee ? 'flex-nowrap' : 'flex-wrap'} ${containerClass}`}
    >
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center gap-1 rounded-md font-mono font-bold leading-none ${
          isWordmark
            ? isOrbit ? 'h-8 w-full' : isBadge ? 'h-5 w-16' : 'h-8 w-24 max-w-full'
            : isOrbit ? 'h-8 w-8 text-[10px]' : isBadge ? 'h-6 min-w-6 text-[9px]' : 'h-8 min-w-8 max-w-[6.75rem] text-[10px]'
        }`}
        style={{ color: meta.color }}
      >
        {isWordmark
          ? (
              <>
                <img src={highLevelDark} alt="" className="block h-full w-full object-contain dark:hidden" />
                <img src={highLevelLight} alt="" className="hidden h-full w-full object-contain dark:block" />
              </>
            )
          : assets.length > 0
          ? assets.slice(0, isOrbit ? 1 : 3).map(asset => (
              asset === 'react' ? (
                <img key={asset} src={reactLogo} alt="" className={`${isBadge ? 'h-5 w-5' : 'h-7 w-7'} object-contain`} />
              ) : standaloneAssets[asset] ? (
                <img key={asset} src={standaloneAssets[asset]} alt="" className={`${isBadge ? 'h-5 w-5' : 'h-7 w-7'} shrink-0 object-contain ${asset === 'github' ? 'dark:brightness-0 dark:invert' : ''}`} />
              ) : (
                <svg key={asset} viewBox={asset === 'photoshop' ? '0 0 128 128' : '0 0 24 24'} className={`${isBadge ? 'h-5 w-5' : 'h-7 w-7'} shrink-0 fill-current`}>
                  <use href={`${technologySprite}#${asset}`} />
                </svg>
              )
            ))
          : meta.mark}
      </span>
      {showLabel && (
        <span className={`${isBadge ? 'text-[11px]' : isMarquee ? 'text-sm whitespace-nowrap' : 'text-xs'} min-w-0 flex-1 break-words font-semibold leading-tight text-black dark:text-white`}>
          {name}
        </span>
      )}
    </span>
  )
}
