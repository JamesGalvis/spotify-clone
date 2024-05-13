import { useEffect, useState, type RefObject } from 'react'
import { Slider } from './ui/Slider'

export function SongControl({ audio }: { audio: RefObject<HTMLAudioElement> }) {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    audio.current?.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.current?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  })

  const handleTimeUpdate = () => {
    if (audio.current) {
      setCurrentTime(audio.current.currentTime)
    }
  }

  const formatTime = (time: number) => {
    if (time === null || time === 0) return '0:00'

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const duration = audio.current?.duration ?? 0

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-10 text-right">{formatTime(currentTime)}</span>

      <Slider
        defaultValue={[0]}
        min={0}
        max={audio.current?.duration ?? 0}
        value={[currentTime]}
        className="w-[345px] cursor-pointer"
        onValueChange={(value) => {
          const [newCurrentTime] = value
          if (audio.current) {
            audio.current.currentTime = newCurrentTime
          }
        }}
      />

      <span className="w-10 text-left">
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}
