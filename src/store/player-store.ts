import type { Playlist, Song } from '@/lib/data'
import { create } from 'zustand'

interface PlayerState {
  isPlaying: boolean
  currentMusic: {
    playlist: Playlist | null
    song: Song | null
    songs: Song[] | null
  }
  volume: number
  setVolume: (volume: number) => void
  setIsPlaying: (isPlaying: boolean) => void
  setCurrentMusic: (currentMusic: {
    playlist: Playlist | null
    song: Song | null
    songs: Song[] | null
  }) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentMusic: {
    playlist: null,
    song: null,
    songs: [],
  },
  volume: 1,
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
}))
