import { usePlayerStore } from '@/store/player-store'
import { useEffect, useRef, useState } from 'react'

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

export const VolumeSilence = () => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen apagado"
    viewBox="0 0 16 16"
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
)

export const Volume = () => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen alto"
    id="volume-icon"
    viewBox="0 0 16 16"
  >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
)

interface CurrentSongProps {
  title: string | undefined
  image: string | undefined
  id: number | undefined
  artists: string[] | undefined
}

function CurrentSong({ image, title, id, artists }: CurrentSongProps) {
  const artistsString = artists && artists.join(', ')

  return (
    <div className="relative flex items-center gap-4 overflow-hidden">
      <picture className="h-14 w-14 rounded-[4px] bg-zinc-900 overflow-hidden">
        <img src={image} alt={title} className="w-full h-auto object-cover" />
      </picture>
      <div className='flex flex-col justify-center'>
        <p className='text-sm text-white'>{title}</p>
        <span className='text-[12px]'>{artistsString}</span>
      </div>
    </div>
  )
}

export function Player() {
  const { isPlaying, setIsPlaying, currentMusic } = usePlayerStore(
    (state) => state
  )

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    isPlaying && audioRef.current
      ? audioRef.current.play()
      : !isPlaying && audioRef.current && audioRef.current.pause()
  }, [isPlaying])

  // useEffect(() => {
  //   if (audioRef.current) {
  //     const { song, playlist } = currentMusic

  //     if (song) {
  //       const src = `/music/${playlist?.id}/0${song.id}.mp3`
  //       audioRef.current.src = src
  //       audioRef.current.play()
  //     }
  //   }
  // }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex items-center justify-between w-full px-4 z-50 h-[65px] py-1">
       <CurrentSong
        artists={currentMusic.song?.artists}
        id={currentMusic.song?.id}
        image={currentMusic.song?.image}
        title={currentMusic.song?.title}
      />

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button onClick={handleClick} className="bg-white rounded-full p-2">
            {isPlaying ? <Pause className="" /> : <Play className="" />}
          </button>
        </div>
      </div>

      <div>Volume</div>

      <audio ref={audioRef} />
    </div>
  )
}