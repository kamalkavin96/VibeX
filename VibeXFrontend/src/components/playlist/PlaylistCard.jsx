import { useState } from "react";
import { API_BASE_URL } from "../../config/apiConfig";

const PlaylistCard = ({ playlist, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="
        group relative rounded-2xl p-3
        bg-white dark:bg-zinc-900
        border border-gray-200 dark:border-zinc-800
        hover:shadow-lg transition
      "
    >
      {/* MENU BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu((prev) => !prev);
        }}
        className="
          absolute top-3 right-3 z-20
          h-8 w-8 rounded-full
          flex items-center justify-center
          bg-transparent
          hover:bg-white/30 dark:hover:bg-white/15
          transition
        "
      >
        <MoreVerticalIcon className="h-4 w-4" />
      </button>

      {/* MENU */}
      {openMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            absolute top-12 right-3 z-50
            w-32 rounded-xl
            bg-white dark:bg-zinc-800
            border border-gray-200 dark:border-zinc-700
            shadow-lg overflow-hidden
          "
        >
          <button className="w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700">
            <span className="flex items-center gap-2">
              <EditIcon className="h-4 w-4" />
              Edit
            </span>
          </button>

          <button
            onClick={async () => {
              setOpenMenu(false);
              await onDelete(playlist.id);
            }}
            className="
              w-full px-4 py-2 text-sm
              text-red-600 dark:text-red-400
              hover:bg-red-50 dark:hover:bg-red-900/30
            "
          >
            <span className="flex items-center gap-2">
              <TrashIcon className="h-4 w-4" />
              Delete
            </span>
          </button>
        </div>
      )}

      {/* COVER */}
      <div className="relative h-36 rounded-xl mb-3 overflow-hidden">
        {!imgError && playlist.imageKey ? (
          <img
            src={`${API_BASE_URL}/api/playlists/${playlist.id}/image`}
            alt="Playlist cover"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={`h-full w-full bg-linear-to-br ${playlist.gradient}`}
          />
        )}

        {/* PLAY BUTTON */}
        <button
          className="
            absolute bottom-3 right-3
            h-10 w-10 rounded-full
            bg-black/40 text-white
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition
          "
        >
          <PlayIcon className="h-5 w-5 ml-0.5" />
        </button>
      </div>

      {/* INFO */}
      <h4 className="text-sm font-semibold truncate">
        {playlist.name}
      </h4>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {playlist.songs ?? 0} songs ·{" "}
        {playlist.description || "No description"}
      </p>
    </div>
  );
};

/* ---------------- SVG ICONS ---------------- */

const MoreVerticalIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const EditIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default PlaylistCard;
