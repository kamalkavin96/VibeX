import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaTrash,
  FaHeart,
  FaRegHeart,
  FaEllipsisV,
  FaEdit,
  FaCompactDisc,
  FaCalendarAlt,
} from "react-icons/fa";

import { API_BASE_URL } from "../../config/apiConfig";

export default function AlbumCard({
  album,
  onEdit,
  onDelete,
  onPlay,
  onLike,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  const imageUrl = album.albumImageUrl
    ? `${API_BASE_URL}/api/v1/albums/image/${album.albumImageUrl}`
    : null;

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div
      className="
        group
        rounded-2xl
        overflow-hidden
        bg-white
        dark:bg-zinc-900
        border
        border-gray-200
        dark:border-zinc-800
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      {/* COVER */}

      <div className="relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={album.title}
            className="
              w-full
              aspect-square
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              w-full
              aspect-square
              bg-gradient-to-br
              from-pink-500
              via-purple-500
              to-indigo-600
            "
          />
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* LIKE */}

        <button
          onClick={() => onLike?.(album)}
          className={`
            absolute
            top-3
            left-3
            h-10
            w-10
            rounded-full
            backdrop-blur-md
            flex
            items-center
            justify-center
            shadow-lg
            transition-all
            duration-200
            hover:scale-110
            ${
              album.liked
                ? "bg-red-500 text-white"
                : "bg-black/40 text-white hover:bg-red-500"
            }
          `}
        >
          {album.liked ? (
            <FaHeart size={15} />
          ) : (
            <FaRegHeart size={15} />
          )}
        </button>

        {/* MENU */}

        <div
          ref={menuRef}
          className="absolute top-3 right-3 z-50"
        >
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="
              h-10
              w-10
              rounded-full
              bg-black/40
              backdrop-blur-md
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              hover:bg-black/60
              transition-all
              duration-200
              hover:scale-110
            "
          >
            <FaEllipsisV size={14} />
          </button>

          {showMenu && (
            <div
              className="
                absolute
                right-0
                mt-2
                w-40
                overflow-hidden
                rounded-xl
                bg-white
                dark:bg-zinc-900
                border
                border-gray-200
                dark:border-zinc-800
                shadow-2xl
                z-[999]
              "
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit?.(album);
                }}
                className="
                  w-full
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-amber-600
                  dark:text-amber-400
                  hover:bg-amber-50
                  dark:hover:bg-amber-500/10
                "
              >
                <FaEdit size={13} />
                Edit Album
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete?.(album);
                }}
                className="
                  w-full
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-red-500
                  hover:bg-red-50
                  dark:hover:bg-zinc-800
                "
              >
                <FaTrash size={13} />
                Delete Album
              </button>
            </div>
          )}
        </div>

        {/* PLAY */}

        <button
          onClick={() => onPlay?.(album)}
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
            shadow-xl
            opacity-0
            translate-y-3
            group-hover:opacity-100
            group-hover:translate-y-0
            hover:scale-110
            transition-all
            duration-300
          "
        >
          <FaPlay size={15} />
        </button>
      </div>

      {/* INFO */}

      <div className="p-4">
        <h3
          className="
            font-semibold
            text-gray-900
            dark:text-white
            truncate
          "
        >
          {album.title}
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-gray-500
            dark:text-gray-400
            truncate
          "
        >
          {album.genre || "Album"}
        </p>

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              px-3
              py-1
              text-xs
              font-medium
              bg-violet-500/10
              text-violet-600
              dark:text-violet-400
            "
          >
            <FaCompactDisc size={10} />
            {album.language || "Unknown"}
          </span>

          {album.releaseDate && (
            <span
              className="
                inline-flex
                items-center
                gap-1
                text-xs
                text-gray-500
              "
            >
              <FaCalendarAlt size={10} />
              {new Date(album.releaseDate).getFullYear()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}