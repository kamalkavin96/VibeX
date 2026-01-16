import { useEffect, useRef, useState } from "react";
import { getAllSongs } from "../services/songService";

export default function SongPlayer() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  // Web Audio refs (IMPORTANT)
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const currentSong = songs[currentIndex];

  /* ---------------- LOAD SONGS ---------------- */
  useEffect(() => {
    getAllSongs().then(res => setSongs(res.data));
  }, []);

  /* ---------------- PLAY / PAUSE ---------------- */
  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [currentIndex, isPlaying]);

  /* ---------------- INIT EQUALIZER (ONCE) ---------------- */
  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    if (!audioCtxRef.current) {
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;

      const source = audioCtx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    }

    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dataArray.forEach((v, i) => {
        const height = v / 1.6;
        const x = i * 10;
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(x, canvas.height - height, 6, height);
      });
    };

    draw();
  }, []);

  /* ---------------- CONTROLS ---------------- */
  const togglePlay = async () => {
    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }
    setIsPlaying(p => !p);
  };

  const playNext = () => {
    setCurrentIndex(i => (i + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentIndex(i => (i === 0 ? songs.length - 1 : i - 1));
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const seek = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  const changeVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    audioRef.current.volume = v;
  };

  const format = (t) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;

  if (!songs.length) {
    return <div className="pt-20 text-center">Loading songs…</div>;
  }

  return (
    <main className="
      pt-12 lg:pl-64 min-h-screen
      bg-gray-50 dark:bg-zinc-950
      text-gray-900 dark:text-gray-100
    ">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🎧 PLAYER */}
        <div className={`
          lg:col-span-2 rounded-3xl p-6 shadow-2xl
          transition-all duration-700
          ${isPlaying
            ? "bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient"
            : "bg-white dark:bg-zinc-900"}
        `}>
          <div className="bg-white/50 dark:bg-zinc-900/30 backdrop-blur-xl rounded-2xl p-6">

            <h2 className="text-2xl font-semibold">{currentSong.title}</h2>
            <p className="text-sm text-black-500 dark:text-gray-100 mb-4">
              {currentSong.singerName} · {currentSong.albumName}
            </p>

            <audio
              ref={audioRef}
              src={`http://localhost:8080/api/songs/${currentSong.id}/stream`}
              onTimeUpdate={onTimeUpdate}
              onEnded={playNext}
            />

            {/* 🎛 EQUALIZER */}
            <canvas
              ref={canvasRef}
              width="500"
              height="80"
              className="w-full my-4"
            />

            {/* ▶ CONTROLS */}
            <div className="flex justify-center items-center gap-6">
              <IconBtn onClick={playPrev}>{icons.prev}</IconBtn>
              <IconBtn primary onClick={togglePlay}>
                {isPlaying ? icons.pause : icons.play}
              </IconBtn>
              <IconBtn onClick={playNext}>{icons.next}</IconBtn>
            </div>

            {/* ⏱ SEEK */}
            <div className="flex items-center gap-3 text-xs mt-4">
              <span>{format(progress)}</span>
              <input
                type="range"
                min="0"
                max={duration}
                value={progress}
                onChange={seek}
                className="w-full accent-indigo-600"
              />
              <span>{format(duration)}</span>
            </div>

            {/* 🔊 VOLUME */}
            <div className="flex items-center gap-2 mt-4">
              <VolumeIcon volume={volume} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={changeVolume}
                className="w-32 accent-indigo-600"
              />
            </div>

          </div>
        </div>

        {/* 📃 PLAYLIST */}
        <div className="
          rounded-3xl p-4
          bg-white dark:bg-zinc-900
          border border-gray-200 dark:border-zinc-800
        ">
          <h3 className="font-semibold mb-3">Playlist</h3>
          <ul className="space-y-2 text-sm">
            {songs.map((s, i) => (
              <li
                key={s.id}
                onClick={() => {
                  setCurrentIndex(i);
                  setIsPlaying(true);
                }}
                className={`
                  p-2 rounded-xl cursor-pointer
                  ${i === currentIndex
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-zinc-800"}
                `}
              >
                <p className="font-medium">{s.title}</p>
                <p className="text-xs opacity-70">{s.singerName}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}

/* ================= ICONS ================= */

const IconBtn = ({ children, onClick, primary }) => (
  <button
    onClick={onClick}
    className={`
      p-4 rounded-full
      transition-all duration-300
      transform
      hover:scale-110
      active:scale-95
      ${primary
        ? "bg-indigo-600 text-white shadow-lg hover:shadow-indigo-500/50"
        : "bg-gray-200 dark:bg-gray-100 hover:bg-indigo-100 dark:hover:bg-zinc-700"}
    `}
  >
    {children}
  </button>
);


const icons = {
  play: <svg width="22" height="22"><polygon points="5,3 19,11 5,19" fill="currentColor"/></svg>,
  pause: <svg width="22" height="22"><rect x="4" y="3" width="5" height="16"/><rect x="13" y="3" width="5" height="16"/></svg>,
  next: <svg width="22" height="22"><polygon points="4,3 14,11 4,19"/><rect x="15" y="3" width="3" height="16"/></svg>,
  prev: <svg width="22" height="22"><polygon points="18,3 8,11 18,19"/><rect x="4" y="3" width="3" height="16"/></svg>,
};

const VolumeIcon = ({ volume }) => {
  // MUTE
  if (volume === 0) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 9v6h4l5 5V4L8 9H4z" />
        <line x1="16" y1="8" x2="22" y2="16" stroke="currentColor" strokeWidth="2"/>
        <line x1="22" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="2"/>
      </svg>
    );
  }

  // LOW
  if (volume < 0.5) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 9v6h4l5 5V4L8 9H4z" />
        <path d="M16 12a3 3 0 010 0" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  // HIGH
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 9v6h4l5 5V4L8 9H4z" />
      <path d="M16 9a4 4 0 010 6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M19 7a7 7 0 010 10" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );
};
