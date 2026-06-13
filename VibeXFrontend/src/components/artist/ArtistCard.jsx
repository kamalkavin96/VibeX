import { FaPlay, FaEdit, FaTrash } from "react-icons/fa";
import { API_BASE_URL } from "../../config/apiConfig";

export default function ArtistCard({ artist, onEdit, onDelete, onPlay }) {
  const imageUrl = artist.profileImageUrl
    ? `${API_BASE_URL}/api/v1/artists/profileImage/${artist.profileImageUrl}`
    : null;

  return (
    <div
      className="
        group
        rounded-2xl
        overflow-hidden
        bg-white dark:bg-zinc-900
        border border-gray-200 dark:border-zinc-800
        hover:shadow-xl
        transition
      "
    >
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artist.name}
            className="
              w-full
              aspect-square
              object-cover
            "
          />
        ) : (
          <div
            className="
              w-full
              aspect-square
              from-blue-500
              to-indigo-600
            "
          />
        )}

        <button
          onClick={() => onPlay?.(artist)}
          className="
            absolute
            bottom-3
            right-3
            h-12
            w-12
            rounded-full
            bg-green-500
            text-white
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition
          "
        >
          <FaPlay />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold truncate">{artist.name}</h3>

        <p className="text-xs text-gray-500 truncate">
          {artist.stageName || "Artist"}
        </p>

        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="
                h-9
                w-9
                flex
                items-center
                justify-center
                rounded-full
                bg-gray-100
                dark:bg-zinc-800
                text-blue-500
                hover:bg-blue-500
                hover:text-white
                transition-all
                duration-200
                shadow-sm
                hover:shadow-md
                hover:scale-105
              "
            >
              <FaEdit size={14} />
            </button>

            <button
              onClick={onDelete}
              className="
                h-9
                w-9
                flex
                items-center
                justify-center
                rounded-full
                bg-gray-100
                dark:bg-zinc-800
                text-red-500
                hover:bg-red-500
                hover:text-white
                transition-all
                duration-200
                shadow-sm
                hover:shadow-md
                hover:scale-105
              "
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
