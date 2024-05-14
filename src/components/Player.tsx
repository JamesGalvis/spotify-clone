import { usePlayerStore } from '@/store/player-store'
import { useEffect, useRef } from 'react'
import { SongControl } from './SongControl'
import { CurrentSong } from './CurrentSong'
import { VolumeControl } from './VolumeControl'

export const Pause = ({ className }: { className: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
)

export const Play = ({ className }: { className: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
)

export function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  )

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    isPlaying && audioRef.current
      ? audioRef.current.play()
      : !isPlaying && audioRef.current && audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      const { song, playlist } = currentMusic

      if (song) {
        const src = `/music/${playlist?.id}/0${song.id}.mp3`
        audioRef.current.src = src
        audioRef.current.volume = volume
        audioRef.current.play()
      }
    }
  }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex items-center justify-between w-full px-2 z-50 h-[68px] py-1">
      <div className="w-[280px]">
        <CurrentSong
          artists={currentMusic.song?.artists}
          id={currentMusic.song?.id}
          image={currentMusic.song?.image}
          title={currentMusic.song?.title}
        />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <button
              onClick={handleClick}
              className="bg-white w-8 h-8 rounded-full p-2 hover:scale-[1.06]"
            >
              {isPlaying ? <Pause className="" /> : <Play className="" />}
            </button>
          </div>
          <SongControl audio={audioRef} />
          <audio draggable ref={audioRef} />
        </div>
      </div>

      <div className="flex items-center justify-end w-[280px]">
        <VolumeControl />
      </div>
    </div>
  )
}
