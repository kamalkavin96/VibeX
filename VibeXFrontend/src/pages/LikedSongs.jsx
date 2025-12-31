import { useState } from "react";

/* ---------------- MOCK DATA ---------------- */

const initialLikedSongs = [
  {
    id: 1,
    title: "Midnight Drive",
    artist: "Synthwave Collective",
    duration: "3:42",
  },
  {
    id: 2,
    title: "Neon Lights",
    artist: "Electro Pop",
    duration: "4:05",
  },
  {
    id: 3,
    title: "Chill Vibes",
    artist: "Lo-Fi Beats",
    duration: "2:58",
  },
  {
    id: 4,
    title: "Workout Boost",
    artist: "EDM Mix",
    duration: "3:36",
  },
];

/* ---------------- PAGE ---------------- */

export default function LikedSongs() {
  const [songs, setSongs] = useState(initialLikedSongs);
  const [search, setSearch] = useState("");

  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      className="
        pt-12 lg:pl-64 min-h-screen
        bg-gray-50 dark:bg-zinc-950
        text-gray-900 dark:text-gray-100
      "
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* HEADER */}
        <header
          className="
            rounded-3xl p-6
            bg-linear-to-br from-pink-500 to-purple-600
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
              mt-4 px-5 py-2 rounded-full
              bg-black/30 hover:bg-black/40
              text-sm font-medium
            "
          >
            ▶ Play All
          </button>
        </header>

        {/* CONTROLS */}
        <section className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search in liked songs"
            className="
              px-4 py-2 rounded-lg
              bg-white dark:bg-zinc-900
              border border-gray-200 dark:border-zinc-800
              outline-none
              w-full sm:w-72
            "
          />

          <select
            className="
              px-3 py-2 rounded-lg
              bg-white dark:bg-zinc-900
              border border-gray-200 dark:border-zinc-800
              text-sm
            "
          >
            <option>Recently Added</option>
            <option>Title (A–Z)</option>
            <option>Artist</option>
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
          {filteredSongs.length === 0 ? (
            <EmptyState />
          ) : (
            filteredSongs.map((song, index) => (
              <SongRow
                key={song.id}
                index={index + 1}
                song={song}
                onRemove={() =>
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

/* ---------------- COMPONENTS ---------------- */

const SongRow = ({ index, song, onRemove }) => (
  <div
    className="
      group grid grid-cols-[40px_1fr_60px_40px]
      sm:grid-cols-[50px_1fr_80px_40px]
      items-center gap-3
      px-4 py-3
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
      ▶
    </button>

    {/* INFO */}
    <div>
      <p className="text-sm font-medium truncate">
        {song.title}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
        {song.artist}
      </p>
    </div>

    {/* DURATION */}
    <div className="text-xs text-gray-500 text-right">
      {song.duration}
    </div>

    {/* REMOVE */}
    <button
      onClick={onRemove}
      className="
        text-gray-400 hover:text-red-500
        opacity-0 group-hover:opacity-100
        transition
      "
    >
      ♥
    </button>
  </div>
);

const EmptyState = () => (
  <div className="p-10 text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      You haven’t liked any songs yet.
    </p>
  </div>
);
