import type { Playlist } from '@/lib/data'
import { Play, Pause } from './Player'
import { usePlayerStore } from '@/store/player-store'

export function CardPlayButton({ playlist }: { playlist: Playlist }) {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state)

  const isPlayingPlaylist =
    isPlaying && currentMusic.playlist?.id === playlist.id

  const isCurrentMusic = currentMusic.playlist?.id === playlist.id

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    if (!isCurrentMusic) {
      fetch(`/api/get-info-playlist.json?id=${playlist.id}`)
        .then((res) => res.json())
        .then((data) => {
          const { songs, playlistData } = data

          setIsPlaying(true)
          setCurrentMusic({ songs, playlist: playlistData, song: songs[0] })
        })
    } else {
      setIsPlaying(true)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="card-play-button h-12 w-12 flex items-center justify-center rounded-full bg-[#1ed760] shadow-lg shadow-black/20"
    >
      {isPlayingPlaylist ? (
        <Pause className="w-5 h-5" />
      ) : (
        <Play className="w-5 h-5" />
      )}
    </button>
  )
}
