import { useEffect, useState } from "react";

import { deleteSong, getAllSongs, uploadSong } from "../../services/songService";
import SongUploadModal from "../../components/song/SongUploadModal";
import SongCard from "../../components/song/SongCard";

export default function SongsView() {
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const fetchSongs = async () => {
    const res = await getAllSongs();
    setSongs(res?.data || []);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <main className="pt-12 lg:pl-64 min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Songs</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upload & manage your music
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-full bg-linear-to-r from-green-500 to-emerald-500 text-white text-sm font-medium"
          >
            + Upload Song
          </button>
        </header>

        {/* SONG GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onDelete={() => {
                setDeleteId(song.id);
                setDeleteName(song.title);
                setDeleteOpen(true);
              }}
            />
          ))}
        </section>

        {/* UPLOAD */}
        {open && (
          <SongUploadModal
            onClose={() => setOpen(false)}
            onUpload={async (payload) => {
              await uploadSong(payload);
              await fetchSongs();
              setOpen(false);
            }}
          />
        )}

        {/* DELETE */}
        {deleteOpen && (
          <SongDeleteModal
            songName={deleteName}
            onClose={() => setDeleteOpen(false)}
            onDelete={async () => {
              await deleteSong(deleteId);
              await fetchSongs();
              setDeleteOpen(false);
            }}
          />
        )}
      </div>
    </main>
  );
}
