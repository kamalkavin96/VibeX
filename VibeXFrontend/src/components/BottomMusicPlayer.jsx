import { useContext, useEffect, useRef, useState } from "react";
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiVolume2,
  FiVolumeX,
  FiShuffle,
  FiRepeat,
  FiMusic,
  FiHeart,
} from "react-icons/fi";
import AudioPlayerContext from "../context/audioContext/AudioPlayerContext";
import { API_BASE_URL } from "../config/apiConfig";
import {
  isSongLiked,
  likeSong,
  unlikeSong,
} from "../services/SongLikeService";

export default function BottomMusicPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  /* ✅ ALWAYS SAFE CONTEXT */
  const ctx = useContext(AudioPlayerContext) || {};

  const {
    playerSongs = [],
    currentIndex = 0,
    play = false,
    setPlay = () => {},
    progress = 0,
    setProgress = () => {},
    duration = 0,
    setDuration = () => {},
    volume = 1,
    setVolume = () => {},
    playNext = () => {},
    playPrev = () => {},
  } = ctx;

  const currentSong = playerSongs[currentIndex] || null;

  /* ▶️ PLAY / PAUSE */
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    play ? audioRef.current.play() : audioRef.current.pause();
  }, [play, currentSong]);

  /* 🔊 VOLUME */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  /* ❤️ FETCH LIKE STATUS (ON SONG CHANGE ONLY) */
  useEffect(() => {
    if (!currentSong?.id) return;

    let active = true;

    const fetchLike = async () => {
      try {
        const res = await isSongLiked(currentSong.id);
        if (active) setIsLiked(!!res);
      } catch (e) {
        console.error("Failed to fetch like status", e);
        if (active) setIsLiked(false);
      }
    };

    fetchLike();

    return () => {
      active = false;
    };
  }, [currentSong?.id]);

  /* ❤️ TOGGLE LIKE (OPTIMISTIC) */
  const handleLikeToggle = async () => {
    if (!currentSong?.id) return;

    const next = !isLiked;
    setIsLiked(next); // optimistic

    try {
      if (next) {
        await likeSong(currentSong.id);
      } else {
        await unlikeSong(currentSong.id);
      }
    } catch (e) {
      console.error("Like toggle failed", e);
      setIsLiked(!next); // rollback
    }
  };

  const formatTime = (t = 0) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const onSeek = (e) => {
    const v = Number(e.target.value);
    audioRef.current.currentTime = v;
    setProgress(v);
  };

  /* 🧩 NO SONG PLACEHOLDER */
  if (!currentSong) {
    return (
      <div className="
        fixed bottom-2 inset-x-2 z-50 h-20
        rounded-2xl backdrop-blur-xl
        bg-white/80 dark:bg-zinc-900/80
        border border-zinc-200/60 dark:border-zinc-700/60
        shadow-lg flex items-center justify-center gap-2
        text-zinc-500 dark:text-zinc-400
      ">
        <FiMusic className="text-emerald-500" />
        <span className="text-sm font-medium">
          Select a song to play
        </span>
      </div>
    );
  }

  return (
    <div className="
      fixed bottom-0 inset-x-0 z-50 h-24 px-5
      flex items-center backdrop-blur-xl
      bg-white/80 dark:bg-zinc-900/80
      border-t border-zinc-200/60 dark:border-zinc-700/60
      shadow-xl text-zinc-900 dark:text-zinc-100
    ">
      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={`${API_BASE_URL}/api/songs/${currentSong.id}/stream`}
        onTimeUpdate={(e) => setProgress(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={playNext}
        autoPlay
      />

      {/* LEFT */}
      <div className="flex items-center gap-3 w-[30%] min-w-0">
        <img
          src={`${API_BASE_URL}/api/songs/thumbnail/${currentSong.thumbnailKey}?v=${currentSong.updatedAt}`}
          alt="cover"
          className="w-20 h-20 rounded-xl object-cover shadow"
        />

        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">
            {currentSong.title}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            <b>Album:</b>  {currentSong.albumName || "Unknown Artist"}
          </p>
           <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            <b>Singer:</b>  {currentSong.singerName || "Unknown Artist"}
          </p>
        </div>

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
          <FiHeart
            size={16}
            className={isLiked ? "fill-white" : ""}
          />
        </button>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-[40%]">
        <div className="flex items-center gap-6 mb-1 text-zinc-500 dark:text-zinc-400">
          <FiShuffle className="hover:text-emerald-500 cursor-pointer" />

          <FiSkipBack
            onClick={playPrev}
            className="cursor-pointer hover:text-zinc-900 dark:hover:text-white"
          />

          <button
            onClick={() => setPlay(!play)}
            className="
              w-11 h-11 rounded-full bg-emerald-500
              hover:bg-emerald-600 text-white
              flex items-center justify-center
              shadow-lg transition active:scale-95
            "
          >
            {play ? <FiPause /> : <FiPlay />}
          </button>

          <FiSkipForward
            onClick={playNext}
            className="cursor-pointer hover:text-zinc-900 dark:hover:text-white"
          />

          <FiRepeat className="hover:text-emerald-500 cursor-pointer" />
        </div>

        {/* PROGRESS */}
        <div className="flex items-center gap-2 w-full text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={onSeek}
            className="flex-1 h-1.5 rounded-full
              bg-zinc-300 dark:bg-zinc-700
              accent-emerald-500 cursor-pointer"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-3 w-[30%] text-zinc-500 dark:text-zinc-400">
        <button onClick={() => setMuted(!muted)}>
          {muted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-1.5 bg-zinc-300 dark:bg-zinc-700
            accent-emerald-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
