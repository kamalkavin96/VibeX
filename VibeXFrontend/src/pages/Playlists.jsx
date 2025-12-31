import { useState } from "react";

/* ---------------- MOCK DATA ---------------- */

const mockSongs = [
  { id: 1, title: "Midnight Drive", artist: "Synthwave" },
  { id: 2, title: "Neon Lights", artist: "Electro Pop" },
  { id: 3, title: "Chill Vibes", artist: "Lo-Fi Beats" },
  { id: 4, title: "Workout Boost", artist: "EDM Mix" },
];

const initialPlaylists = [
  {
    id: 1,
    name: "Chill Nights",
    description: "Relax & unwind",
    songs: 12,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    name: "Workout Mix",
    description: "High energy tracks",
    songs: 25,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    name: "Focus Flow",
    description: "Stay productive",
    songs: 18,
    gradient: "from-violet-500 to-purple-500",
  },
];

/* ---------------- PAGE ---------------- */

export default function Playlists() {
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [open, setOpen] = useState(false);

  return (
    <main className="
      pt-12 lg:pl-64 min-h-screen
      bg-gray-50 dark:bg-zinc-950
      text-gray-900 dark:text-gray-100
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Playlists</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your music collections
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="
              px-4 py-2 rounded-full
              bg-linear-to-r from-blue-500 to-indigo-500
              text-white text-sm font-medium
              hover:opacity-90 transition
            "
          >
            + Create Playlist
          </button>
        </header>

        {/* PLAYLIST GRID */}
        <section className="
          grid grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-5
        ">
          {playlists.map((pl) => (
            <PlaylistCard key={pl.id} playlist={pl} />
          ))}
        </section>

        {/* CREATE MODAL */}
        {open && (
          <CreatePlaylistModal
            onClose={() => setOpen(false)}
            onCreate={(p) => {
              setPlaylists([...playlists, p]);
              setOpen(false);
            }}
          />
        )}

      </div>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

const PlaylistCard = ({ playlist }) => (
  <div
    className="
      group cursor-pointer
      rounded-2xl p-3
      bg-white dark:bg-zinc-900
      border border-gray-200 dark:border-zinc-800
      hover:shadow-lg transition
    "
  >
    <div
      className={`
        h-36 rounded-xl mb-3
        bg-linear-to-br ${playlist.gradient}
        relative overflow-hidden
      `}
    >
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
        ▶
      </button>
    </div>

    <h4 className="text-sm font-semibold truncate">
      {playlist.name}
    </h4>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {playlist.songs} songs · {playlist.description}
    </p>
  </div>
);

/* ---------------- MODAL ---------------- */

const CreatePlaylistModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [selected, setSelected] = useState([]);

  const toggleSong = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="
      fixed inset-0 z-50
      bg-black/50
      flex items-center justify-center
      px-4
    ">
      <div className="
        w-full max-w-lg
        rounded-2xl p-6
        bg-white dark:bg-zinc-900
        text-gray-900 dark:text-gray-100
      ">
        <h3 className="text-xl font-semibold mb-4">
          Create Playlist
        </h3>

        {/* FORM */}
        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Playlist name"
            className="
              w-full px-4 py-2 rounded-lg
              bg-gray-100 dark:bg-zinc-800
              outline-none
            "
          />

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="
              w-full px-4 py-2 rounded-lg
              bg-gray-100 dark:bg-zinc-800
              outline-none
            "
          />

          {/* SONG SELECT */}
          <div>
            <p className="text-sm font-medium mb-2">
              Add Songs
            </p>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {mockSongs.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(s.id)}
                    onChange={() => toggleSong(s.id)}
                  />
                  {s.title} — {s.artist}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg
              bg-gray-200 dark:bg-zinc-800
            "
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onCreate({
                id: Date.now(),
                name,
                description: desc,
                songs: selected.length,
                gradient: "from-pink-500 to-rose-500",
              })
            }
            className="
              px-4 py-2 text-sm rounded-lg
              bg-linear-to-r from-blue-500 to-indigo-500
              text-white
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
