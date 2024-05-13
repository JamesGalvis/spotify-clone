interface CurrentSongProps {
  title: string | undefined
  image: string | undefined
  id: number | undefined
  artists: string[] | undefined
}

export function CurrentSong({ image, title, artists }: CurrentSongProps) {
  const artistsString = artists && artists.join(', ')

  return (
    <div className="relative flex items-center gap-4 overflow-hidden">
      <picture className="h-14 w-14 rounded-[4px] bg-zinc-900 overflow-hidden">
        <img src={image} alt={title} className="w-full h-auto object-cover" />
      </picture>
      <div className="flex flex-col justify-center">
        <p className="text-sm text-white">{title}</p>
        <span className="text-[12px]">{artistsString}</span>
      </div>
    </div>
  )
}
