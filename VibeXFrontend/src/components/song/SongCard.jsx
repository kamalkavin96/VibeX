import { Trash2, Music, Heart, MoreVertical } from "lucide-react";
import { API_BASE_URL } from "../../config/apiConfig";
import { FaEdit, FaPlay, FaPlus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import {
  isSongLiked,
  likeSong,
  unlikeSong,
} from "../../services/SongLikeService";

export default function SongCard({
  song,
  onDelete,
  onEdit,
  onPlayListAdd,
  onPlay,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);

  /* ---------- FETCH LIKE STATE (ONCE PER SONG) ---------- */
  useEffect(() => {
    let mounted = true;

    const fetchIsLiked = async () => {
      try {
        const res = await isSongLiked(song.id);
        setIsLiked(!!res);
      } catch (e) {
        console.error("Failed to fetch like status", e);
        if (mounted) setIsLiked(false);
      }
    };

    fetchIsLiked();

    return () => {
      mounted = false;
    };
  }, [song.id, isLiked]); // ✅ ONLY song.id

  /* ---------- Close menu on outside click ---------- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  /* ---------- LIKE HANDLER (SAFE + OPTIMISTIC) ---------- */
  const handleLikeToggle = async () => {
    const next = !isLiked;
    // optimistic update

    try {
      if (next) {
        await likeSong(song.id);
        setIsLiked(next);
      } else {
        await unlikeSong(song.id);
        setIsLiked(next);
      }
    } catch (e) {
      console.error("Like toggle failed", e);
      setIsLiked(!next); // rollback
    }
  };

  return (
    <div
      className="
      group rounded-2xl
      border border-black/5 dark:border-white/10
      bg-linear-to-br from-white via-zinc-50 to-zinc-100
      dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800
      shadow-sm hover:shadow-xl
      transition-all duration-300
      overflow-hidden
    "
    >
      {/* ================= ROW 1 ================= */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* THUMBNAIL */}
        <div className="flex justify-center items-center">
          <div
            className="
            relative w-28 h-28
            rounded-xl overflow-hidden
            bg-linear-to-br from-indigo-500 to-purple-600
            flex items-center justify-center
          "
          >
            {song.thumbnailKey ? (
              <img
                src={`${API_BASE_URL}/api/songs/thumbnail/${song.thumbnailKey}?v=${song.updatedAt}`}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music size={28} className="text-white/80" />
            )}

            {/* PLAY OVERLAY */}
            <button
              onClick={() => onPlay(song)}
              className="
                absolute inset-0
                flex items-center justify-center
                bg-black/40
                opacity-0 group-hover:opacity-100
                transition
              "
            >
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-md">
                <FaPlay size={12} className="text-zinc-900" />
              </div>
            </button>
          </div>
        </div>

        {/* DETAILS */}
        <div className="min-w-0">
          <h4 className="font-semibold truncate text-zinc-900 dark:text-zinc-100">
            {song.title}
          </h4>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            {song.artist}
          </p>

          <div className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-0.5">
            <div>
              <b>Album:</b> {song.albumName}
            </div>
            <div>
              <b>Singer:</b> {song.singerName}
            </div>
            <div>
              <b>Uploaded:</b> {new Date(song.createdAt).toLocaleDateString()}
            </div>
            <div>
              <b>Updated:</b> {new Date(song.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROW 2 : ACTION BAR ================= */}
      <div
        className="
        flex items-center justify-between
        px-4 py-2
        border-t border-black/5 dark:border-white/10
        bg-white/40 dark:bg-zinc-900/40
        backdrop-blur
        relative
      "
      >
        {/* LEFT — MENU */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div
              className="
              absolute left-0 bottom-10
              w-44 rounded-xl
              bg-white dark:bg-zinc-900
              border border-black/10 dark:border-white/10
              shadow-xl overflow-hidden z-20
            "
            >
              <MenuItem
                onClick={() => {
                  onEdit();
                  setMenuOpen(false);
                }}
              >
                <FaEdit size={14} className="text-yellow-500" />
                <span className="text-yellow-600 dark:text-yellow-400">
                  Edit
                </span>
              </MenuItem>

              <MenuItem
                danger
                onClick={() => {
                  onDelete();
                  setMenuOpen(false);
                }}
              >
                <Trash2 size={14} /> Delete
              </MenuItem>
            </div>
          )}
        </div>

        {/* RIGHT — PRIMARY CONTROLS */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPlayListAdd}
            className="
              h-9 w-9 flex items-center justify-center
              rounded-full border border-blue-400/40
              text-blue-500 hover:bg-blue-500/10 transition
            "
          >
            <FaPlus size={14} />
          </button>

          <button
            onClick={handleLikeToggle}
            className={`
              h-9 w-9 flex items-center justify-center
              rounded-full border transition
              ${
                isLiked
                  ? "bg-pink-500 border-pink-500 text-white"
                  : "border-pink-400/40 text-pink-500 hover:bg-pink-500/10"
              }
            `}
          >
            <Heart size={16} className={isLiked ? "fill-white" : ""} />
          </button>

          <button
            onClick={() => onPlay(song)}
            className="
              h-9 w-9 flex items-center justify-center
              rounded-full text-white shadow-md transition
              bg-linear-to-br from-green-500 to-emerald-500
              hover:scale-105 dark:bg-transparent
              dark:shadow-none dark:border dark:border-white/20
            "
          >
            <FaPlay size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= MENU ITEM ================= */
function MenuItem({ children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2
        px-4 py-2 text-sm transition
        hover:bg-black/5 dark:hover:bg-white/10
        ${danger ? "text-red-500" : "text-zinc-700 dark:text-zinc-200"}
      `}
    >
      {children}
    </button>
  );
}
