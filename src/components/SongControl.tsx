import { useEffect, useRef, useState, type RefObject } from 'react'
import { Slider } from './ui/Slider'

export function SongControl({ audio }: { audio: RefObject<HTMLAudioElement> }) {
  const [currentTime, setCurrentTime] = useState(0)
  const isChange = useRef(false)

  const duration = audio.current?.duration ?? 0

  useEffect(() => {
    audio.current?.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.current?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  const handleTimeUpdate = () => {
    if (audio.current && !isChange.current) {
      setCurrentTime(audio.current.currentTime)
    }
  }

  const formatTime = (time: number) => {
    if (time === null || time === 0) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-10 text-right">{formatTime(currentTime)}</span>
      <Slider
        defaultValue={[0]}
        min={0}
        max={audio.current?.duration ?? 0}
        value={[currentTime]}
        className="lg:w-[400px] xl:w-[450px] cursor-pointer"
        onValueChange={(value) => {
          const [newCurrentTime] = value
          setCurrentTime(newCurrentTime)
        }}
        onPointerDown={() => {
          isChange.current = true
        }}
        onPointerUp={() => {
          isChange.current = false
          if (audio.current && !isChange.current) {
            audio.current.currentTime = currentTime
          }
        }}
      />
      <span className="w-10 text-left">
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}
