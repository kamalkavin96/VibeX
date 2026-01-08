import { Trash2, Music } from "lucide-react";

export default function SongCard({ song, onDelete }) {
  return (
    <div className="group relative rounded-xl p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-500 text-white">
          <Music size={20} />
        </div>
        <div>
          <h4 className="font-semibold truncate">{song.title}</h4>
          <p className="text-xs text-gray-500">{song.artist}</p>
        </div>
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
        <p>Album: {song.title}</p>
        {/* <p>Duration: {song.duration}</p>
        <p>Size: {song.size}</p>
        <p>Format: {song.format}</p> */}
      </div>

      <button
        onClick={onDelete}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition"
      >
        <Trash2 size={16} className="text-red-500" />
      </button>
    </div>
  );
}
