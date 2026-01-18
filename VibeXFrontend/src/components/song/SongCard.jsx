import { Trash2, Music } from "lucide-react";
import { API_BASE_URL } from "../../config/apiConfig";
import { FaEdit, FaPlay, FaPlus } from "react-icons/fa";

export default function SongCard({ song, onDelete, onEdit, onPlayListAdd, onPlay }) {

  return (
    <div
      className="
        group relative
        flex items-center
        gap-3
        rounded-2xl
        border border-black/5 dark:border-white/10
        bg-linear-to-br
        from-white via-zinc-50 to-zinc-100
        dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        p-3
      "
    >
      {/* GRADIENT GLOW */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-0 group-hover:opacity-100
          transition
          bg-linear-to-br
          from-indigo-500/10 via-purple-500/10 to-pink-500/10
          rounded-2xl
        "
      />

      {/* IMAGE (FIXED SIZE & CENTERED) */}
      <div
        className="
          relative
          w-20 h-20
          shrink-0
          rounded-xl
          overflow-hidden
          bg-linear-to-br
          from-indigo-500 to-purple-600
          flex items-center justify-center
        "
      >
        {song.thumbnailKey ? (
          <img
            src={`${API_BASE_URL}/api/songs/thumbnail/${song.thumbnailKey}?v=${song.updatedAt}`}
            alt="Album cover"
            className="
              w-full h-full object-cover
              group-hover:scale-105
              transition-transform duration-300
            "
          />
        ) : (
          <Music size={28} className="text-white/80" />
        )}

        {/* IMAGE SHINE */}
        <div
          className="
            absolute inset-0
            bg-linear-to-tr
            from-white/10 to-transparent
            opacity-0 group-hover:opacity-100
            transition
          "
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold truncate text-zinc-900 dark:text-zinc-100">
          {song.title}
        </h4>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
          {song.artist}
        </p>

        <div className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-0.5">
          <div>
            <b className="text-zinc-700 dark:text-zinc-300">Album:</b>{" "}
            {song.albumName}
          </div>
          <div>
            <b className="text-zinc-700 dark:text-zinc-300">Singer:</b>{" "}
            {song.singerName}
          </div>
          <div>
            <b className="text-zinc-700 dark:text-zinc-300">Uploaded:</b>{" "}
            {new Date(song.createdAt).toLocaleDateString()}
          </div>
           <div>
            <b className="text-zinc-700 dark:text-zinc-300">Updated:</b>{" "}
            {new Date(song.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* DELETE */}
      <button
        onClick={onDelete}
        aria-label="Delete song"
        className="
          absolute top-2 right-3
          opacity-0 group-hover:opacity-100
          scale-90 group-hover:scale-100
          transition
          rounded-full p-1.5
          bg-red-500/10 hover:bg-red-500/20
        "
      >
        <Trash2 size={16} className="text-red-500" />
      </button>

      {/* EDIT */}
      <button
        onClick={onEdit}
        aria-label="Delete song"
        className="
          absolute top-9 right-3
          opacity-0 group-hover:opacity-100
          scale-90 group-hover:scale-100
          transition
          rounded-full p-1.5
          bg-red-500/10 hover:bg-red-500/20
        "
      >
        <FaEdit size={16} className="text-yellow-500" />
      </button>

        {/* ADD */}
      <button
        onClick={onPlayListAdd}
        aria-label="Add to Playlist"
        className="
          absolute top-16 right-3
          opacity-0 group-hover:opacity-100
          scale-90 group-hover:scale-100
          transition
          rounded-full p-1.5
          bg-red-500/10 hover:bg-red-500/20
        "
      >
        <FaPlus size={16} className="text-blue-500" />
      </button>

        {/* PLAY */}
      <button
        onClick={onPlay}
        aria-label="Play song"
        className="
          absolute top-23 right-3
          opacity-0 group-hover:opacity-100
          scale-90 group-hover:scale-100
          transition
          rounded-full p-1.5
          bg-red-500/10 hover:bg-red-500/20
        "
      >
        <FaPlay size={16} className="text-green-500" />
      </button>

    </div>
  );
}

