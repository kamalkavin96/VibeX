import { useState } from "react";

/* ================= MOCK DATA ================= */

const initialLikedSongs = [
  {
    id: 1,
    title: "Midnight Drive",
    artist: "Synthwave Collective",
    album: "Neon Nights",
    duration: "3:42",
  },
  {
    id: 2,
    title: "Neon Lights",
    artist: "Electro Pop",
    album: "City Dreams",
    duration: "4:05",
  },
  {
    id: 3,
    title: "Chill Vibes",
    artist: "Lo-Fi Beats",
    album: "Late Hours",
    duration: "2:58",
  },
  {
    id: 4,
    title: "Workout Boost",
    artist: "EDM Mix",
    album: "Power Mode",
    duration: "3:36",
  },
];

/* ================= PAGE ================= */

export default function LikedSongs() {
  const [songs, setSongs] = useState(initialLikedSongs);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");

  const filteredSongs = songs
    .filter(
      (s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.artist.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "artist") return a.artist.localeCompare(b.artist);
      return 0;
    });

  return (
    <main className="
      pt-12 lg:pl-64 min-h-screen
      bg-gray-50 dark:bg-zinc-950
      text-gray-900 dark:text-gray-100
    ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* HEADER */}
        <header
          className="
            rounded-3xl p-6
            bg-linear-to-br from-indigo-500 to-purple-600
            text-white
          "
        >
          <p className="text-sm opacity-80">Playlist</p>
          <h2 className="text-3xl font-semibold mt-1">
            Liked Songs
          </h2>
          <p className="text-sm opacity-80 mt-1">
            {songs.length} songs
          </p>

          <button
            className="
              mt-4 inline-flex items-center gap-2
              px-5 py-2 rounded-full
              bg-black/30 hover:bg-black/40
              text-sm font-medium
            "
          >
            <PlayIcon className="h-4 w-4" />
            Play All
          </button>
        </header>

        {/* CONTROLS */}
        <section className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search in liked songs"
              className="
                w-full pl-9 pr-3 py-2 rounded-lg
                bg-white dark:bg-zinc-900
                border border-gray-200 dark:border-zinc-800
                outline-none
                text-sm
              "
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
              px-3 py-2 rounded-lg
              bg-white dark:bg-zinc-900
              border border-gray-200 dark:border-zinc-800
              text-sm
            "
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title (A–Z)</option>
            <option value="artist">Artist</option>
          </select>
        </section>

        {/* SONG LIST */}
        <section
          className="
            rounded-2xl
            bg-white dark:bg-zinc-900
            border border-gray-200 dark:border-zinc-800
            overflow-hidden
          "
        >
          {/* HEADER ROW */}
          <div className="
            grid grid-cols-[40px_1fr_1fr_60px_40px]
            px-4 py-2
            text-xs text-gray-500
            border-b border-gray-200 dark:border-zinc-800
          ">
            <span>#</span>
            <span>Title</span>
            <span className="hidden sm:block">Album</span>
            <span className="text-right">Time</span>
            <span />
          </div>

          {filteredSongs.length === 0 ? (
            <EmptyState />
          ) : (
            filteredSongs.map((song, index) => (
              <SongRow
                key={song.id}
                index={index + 1}
                song={song}
                onUnlike={() =>
                  setSongs(songs.filter((s) => s.id !== song.id))
                }
              />
            ))
          )}
        </section>

      </div>
    </main>
  );
}

/* ================= ROW ================= */

const SongRow = ({ index, song, onUnlike }) => (
  <div
    className="
      group grid
      grid-cols-[40px_1fr_1fr_60px_40px]
      px-4 py-3
      items-center
      border-b border-gray-200 dark:border-zinc-800
      hover:bg-gray-50 dark:hover:bg-zinc-800/50
      transition
    "
  >
    {/* INDEX / PLAY */}
    <div className="text-sm text-gray-500 group-hover:hidden">
      {index}
    </div>
    <button
      className="
        hidden group-hover:flex
        items-center justify-center
        text-green-500
      "
    >
      <PlayIcon className="h-4 w-4" />
    </button>

    {/* TITLE */}
    <div>
      <p className="text-sm font-medium truncate">
        {song.title}
      </p>
      <p className="text-xs text-gray-500 truncate">
        {song.artist}
      </p>
    </div>

    {/* ALBUM */}
    <div className="hidden sm:block text-sm text-gray-500 truncate">
      {song.album}
    </div>

    {/* DURATION */}
    <div className="text-xs text-gray-500 text-right">
      {song.duration}
    </div>

    {/* UNLIKE */}
    <button
      onClick={onUnlike}
      className="
        opacity-0 group-hover:opacity-100
        text-gray-400 hover:text-red-500
        transition
      "
    >
      <HeartIcon className="h-4 w-4 fill-current" />
    </button>
  </div>
);

/* ================= EMPTY ================= */

const EmptyState = () => (
  <div className="p-10 text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      You haven’t liked any songs yet.
    </p>
  </div>
);

/* ================= SVG ICONS ================= */

const PlayIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 21s-7-4.35-9.5-8.5C.5 9.5 2.5 6 6 6c2 0 3.5 1.2 4.5 2.5C11.5 7.2 13 6 15 6c3.5 0 5.5 3.5 3.5 6.5C19 16.65 12 21 12 21z" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);
