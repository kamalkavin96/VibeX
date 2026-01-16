import { useEffect, useRef, useState } from "react";
import MainContent from "../components/MainContent";
import { getAllSongs } from "../services/songService";

import { FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";
import { IoPlaySkipBackSharp, IoPlaySkipForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract, GrSubtract, GrSubtractCircle } from "react-icons/gr";
import { FaVolumeHigh } from "react-icons/fa6";
import { API_BASE_URL } from "../config/apiConfig";

/* ================= PLAYER CARD ================= */
function SongPlayerCard({
  song,
  isPlaying,
  setIsPlaying,
  onPrev,
  onNext,
  progress,
  duration,
  onSeek,
  volume,
  onVolumeChange,
}) {
  const format = (t = 0) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60)
      .toString()
      .padStart(2, "0")}`;

  return (
    <div
      className="
        h-full
        rounded-2xl
        bg-white/10 dark:bg-black/20
        border border-white/10
        shadow-xl
        flex items-center justify-center
        p-6
      "
    >
      {/* CONTENT WRAPPER (FIXES ALIGNMENT) */}
      <div className="w-full max-w-md flex flex-col items-center text-center">
        {song ? (
          <>
            {/* ALBUM ART */}
            <div className="w-56 h-56 rounded-2xl mb-6 overflow-hidden shadow-2xl">
              {song.thumbnailKey ? (
                <img
                  src={`${API_BASE_URL}/api/songs/thumbnail/${song.thumbnailKey}`}
                  alt="Playlist cover"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-emerald-500 to-teal-500" />
              )}
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {song.title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              {song.albumName}
            </p>

            {/* PROGRESS */}
            <div className="w-full group">
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>{format(progress)}</span>
                <span>{format(duration)}</span>
              </div>

              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={onSeek}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#34d399,#10b981,#059669)",
                  backgroundSize: `${(progress / (duration || 1)) * 100}% 100%`,
                  backgroundRepeat: "no-repeat",
                }}
                className="
                    w-full
                    h-1.5
                    appearance-none
                    rounded-full
                    cursor-pointer
                    bg-zinc-200 dark:bg-zinc-700

                    /* TRACK */
                    [&::-webkit-slider-runnable-track]:h-1.5
                    [&::-webkit-slider-runnable-track]:rounded-full

                    /* THUMB (DOT) */
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-emerald-500
                    [&::-webkit-slider-thumb]:-mt-1.25
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:transition-all

                    /* HOVER */
                    hover:[&::-webkit-slider-thumb]:scale-110

                    /* ACTIVE */
                    active:[&::-webkit-slider-thumb]:scale-125
                    active:[&::-webkit-slider-thumb]:shadow-[0_0_0_8px_rgba(16,185,129,0.35)]
                  "
              />
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-6 mt-8">
              <PrevButton onClick={onPrev} />
              {isPlaying ? (
                <PauseButton onClick={() => setIsPlaying(false)} />
              ) : (
                <PlayButton onClick={() => setIsPlaying(true)} />
              )}
              <NextButton onClick={onNext} />
            </div>

            {/* VOLUME */}
            <div className="w-full flex justify-center mt-6">
              <div className="flex items-center gap-3 w-full max-w-xs bg-zinc-50/30 dark:bg-zinc-900/60 rounded-2xl p-3">
                <FaVolumeHigh size={20} />

                <button
                  onClick={() =>
                    onVolumeChange({
                      target: {
                        value: Math.max(0, +(volume - 0.05).toFixed(2)),
                      },
                    })
                  }
                  className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center"
                >
                  <GrFormSubtract />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={onVolumeChange}
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#34d399,#10b981,#059669)",
                    backgroundSize: `${volume * 100}% 100%`,
                    backgroundRepeat: "no-repeat",
                  }}
                  className="
                    flex-1
                    h-1.5
                    appearance-none
                    rounded-full
                    cursor-pointer
                    bg-zinc-200 dark:bg-zinc-700

                    /* TRACK */
                    [&::-webkit-slider-runnable-track]:h-1.5
                    [&::-webkit-slider-runnable-track]:rounded-full

                    /* DOT (THUMB) */
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-emerald-500
                    [&::-webkit-slider-thumb]:-mt-1.25
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:transition-all

                    /* HOVER */
                    hover:[&::-webkit-slider-thumb]:scale-110

                    /* ACTIVE */
                    active:[&::-webkit-slider-thumb]:scale-125
                    active:[&::-webkit-slider-thumb]:shadow-[0_0_0_8px_rgba(16,185,129,0.35)]
                  "
                />

                <button
                  onClick={() =>
                    onVolumeChange({
                      target: {
                        value: Math.min(1, +(volume + 0.05).toFixed(2)),
                      },
                    })
                  }
                  className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center"
                >
                  <IoMdAdd />
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-zinc-500">Select a song</p>
        )}
      </div>
    </div>
  );
}

/* ================= SONG LIST ================= */
function SongListCard({ songs, currentSong, onSelect }) {
  return (
    <div className="h-full bg-white/10 dark:bg-zinc-800 shadow-lg flex flex-col transition-[background] duration-300 rounded-2xl">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-900">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Song List
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar">
        <ul className="space-y-2">
          {songs.map((song) => {
            const active = currentSong?.id === song.id;

            return (
              <li
                key={song.id}
                onClick={() => onSelect(song)}
                className={`p-3 rounded-xl cursor-pointer flex items-center transition
                ${
                  active
                    ? "bg-emerald-500 text-white"
                    : "bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                <div className="h-14 w-14 mr-4">
                  {song.thumbnailKey ? (
                    <img
                      src={`${API_BASE_URL}/api/songs/thumbnail/${song.thumbnailKey}`}
                      alt="Playlist cover"
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className=" h-full w-full flex justify-center items-center border-2 rounded-lg bg-linear-to-br">
                      {song.title[0]}
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-xs opacity-80">{song.singerName}</p>
                </div>

                {/* <span className="ml-auto text-xs px-3 py-1 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black">
                  3:20
                </span> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */
function SongPlayer2() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentSong = songs[currentIndex];

  /* LOAD SONGS */
  useEffect(() => {
    getAllSongs().then((res) => {
      setSongs(res.data || []);
      setCurrentIndex(0);
    });
  }, []);

  /* PLAY / PAUSE */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, currentIndex, volume]);

  /* TIME UPDATE */
  const onTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  /* SEEK */
  const onSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  /* CONTROLS */
  const playNext = () => {
    setCurrentIndex((i) => (i + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentIndex((i) => (i === 0 ? songs.length - 1 : i - 1));
    setIsPlaying(true);
  };

  const selectSong = (song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const onVolumeChange = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    audioRef.current.volume = v;
  };

  return (
    <MainContent>
      <div className="h-[calc(100vh-3.5rem)] w-full m-1">
        {currentSong && (
          <audio
            ref={audioRef}
            src={`${import.meta.env.VITE_API_BASE_URL}/api/songs/${
              currentSong.id
            }/stream`}
            onTimeUpdate={onTimeUpdate}
            onEnded={playNext}
          />
        )}

        <div className="h-full flex gap-1">
          <div className="flex-1 h-full">
            <SongPlayerCard
              song={currentSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onPrev={playPrev}
              onNext={playNext}
              progress={progress}
              duration={duration}
              onSeek={onSeek}
              volume={volume}
              onVolumeChange={onVolumeChange}
            />
          </div>

          <div className="w-80 h-full">
            <SongListCard
              songs={songs}
              currentSong={currentSong}
              onSelect={selectSong}
            />
          </div>
        </div>
      </div>
    </MainContent>
  );
}

export default SongPlayer2;

/* ================= ICON BUTTONS ================= */

function PrevButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-emerald-500 text-white  hover:scale-110 flex items-center justify-center"
    >
      <IoPlaySkipBackSharp />
    </button>
  );
}

function PlayButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 rounded-full bg-emerald-500 text-white shadow-xl hover:scale-110 flex items-center justify-center"
    >
      <FaPlay />
    </button>
  );
}

function PauseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 rounded-full bg-emerald-500 text-white shadow-xl hover:scale-110 flex items-center justify-center"
    >
      <FaPause />
    </button>
  );
}

function NextButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-emerald-500 text-white  hover:scale-110 flex items-center justify-center"
    >
      <IoPlaySkipForward />
    </button>
  );
}
