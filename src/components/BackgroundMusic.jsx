import { useEffect, useRef, useState } from 'react'
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react'

const AUDIO_SOURCE = '/audio/aylex-positive-direction.mp3'
let autoplayAttempted = false

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = 0.45

    if (autoplayAttempted) return undefined

    const attemptTimer = window.setTimeout(async () => {
      if (autoplayAttempted || !audioRef.current) return
      autoplayAttempted = true

      try {
        await audio.play()
      } catch (error) {
        setIsPlaying(false)

        if (error?.name !== 'NotAllowedError' && error?.name !== 'AbortError') {
          setHasError(true)
        }
      }
    }, 0)

    return () => window.clearTimeout(attemptTimer)
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio || hasError) return

    if (!audio.paused) {
      audio.pause()
      return
    }

    try {
      setHasError(false)
      await audio.play()
    } catch {
      setIsPlaying(false)
      setHasError(true)
    }
  }

  const toggleMuted = () => {
    const audio = audioRef.current
    if (!audio || hasError) return
    audio.muted = !audio.muted
  }

  const playbackLabel = hasError
    ? 'Background music unavailable'
    : isPlaying
      ? 'Pause background music'
      : 'Play background music'

  return (
    <div className={`music-player ${isPlaying ? 'is-playing' : ''}`} role="group" aria-label="Background music controls">
      <button
        type="button"
        onClick={togglePlayback}
        disabled={hasError}
        aria-label={playbackLabel}
        aria-pressed={isPlaying}
        className="music-player-primary"
      >
        {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        <span>{hasError ? 'Music unavailable' : isPlaying ? 'Pause music' : 'Play music'}</span>
      </button>

      <span className="music-player-track" title="A Positive Direction by Aylex">
        <Music2 size={15} aria-hidden="true" />
        <span>A Positive Direction</span>
      </span>

      <button
        type="button"
        onClick={toggleMuted}
        disabled={hasError}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        aria-pressed={isMuted}
        title={isMuted ? 'Unmute background music' : 'Mute background music'}
        className="music-player-volume"
      >
        {isMuted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
      </button>

      <span className="sr-only" aria-live="polite">{playbackLabel}</span>
      <audio
        ref={audioRef}
        src={AUDIO_SOURCE}
        preload="none"
        loop
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={event => setIsMuted(event.currentTarget.muted)}
        onError={() => {
          setIsPlaying(false)
          setHasError(true)
        }}
      />
    </div>
  )
}
