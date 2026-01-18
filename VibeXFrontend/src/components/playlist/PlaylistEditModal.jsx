import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/apiConfig";
import { getAllSongs } from "../../services/songService";

const PlaylistEditModal = ({ playlist, onClose, onEdit }) => {
  const [name, setName] = useState(playlist.name || "");
  const [desc, setDesc] = useState(playlist.description || "");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    playlist.imageKey
      ? `${API_BASE_URL}/api/playlists/image/${playlist.imageKey}`
      : null
  );

  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState(
    playlist.songs?.map((s) => s.songId) || []
  );

  const [songPickerOpen, setSongPickerOpen] = useState(false);

  /* ---------------- FETCH SONGS ---------------- */
  useEffect(() => {
    const fetchSongs = async () => {
      const res = await getAllSongs();
      setSongs(res?.data || []);
    };
    fetchSongs();
  }, []);

  /* ---------------- IMAGE HANDLER ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
    
    await onEdit({
      id: playlist.id,
      name: name.trim(),
      description: desc.trim(),
      image: imageFile,
      imageKey: playlist.imageKey,
      selectedSongs, // toggle-based backend logic
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl">

        {/* HEADER */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Edit Playlist</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update playlist details and songs
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* IMAGE */}
          <div className="flex flex-col items-center gap-3">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Cover"
                className="h-32 w-32 rounded-xl object-cover shadow-md"
              />
            ) : (
              <div className="h-32 w-32 rounded-xl bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-xs">
                No Image
              </div>
            )}

            <label className="cursor-pointer">
              <div className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700">
                Change Cover
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* FORM */}
          <div className="sm:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Playlist Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full px-3 py-2 rounded-xl
                  bg-gray-100 dark:bg-zinc-800
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="
                  w-full px-3 py-2 rounded-xl
                  bg-gray-100 dark:bg-zinc-800
                  resize-none
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            <button
              onClick={() => setSongPickerOpen(true)}
              className="
                w-full px-4 py-3 rounded-xl
                border border-dashed
                border-gray-300 dark:border-zinc-700
                text-sm hover:bg-gray-100 dark:hover:bg-zinc-800
              "
            >
              Edit Songs ({selectedSongs.length})
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>

      {songPickerOpen && (
        <SongPickerModal
          songs={songs}
          selected={selectedSongs}
          onChange={(id) => {
            setSelectedSongs((prev) =>
              prev.includes(id)
                ? prev.filter((songId) => songId !== id)
                : [...prev, id]
            );
          }}
          onClose={() => setSongPickerOpen(false)}
        />
      )}
    </div>
  );
};

/* ---------------- SONG PICKER ---------------- */

const SongPickerModal = ({ songs, selected, onChange, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-3">Select Songs</h3>

        <div className="max-h-80 overflow-y-auto space-y-2">
          {songs.map((song) => (
            <label
              key={song.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <input
                type="checkbox"
                checked={selected.includes(song.id)}
                onChange={() => onChange(song.id)}
              />
              <span className="text-sm">{song.title}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistEditModal;
