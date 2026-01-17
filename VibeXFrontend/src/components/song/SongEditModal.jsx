import { useState } from "react";
import { API_BASE_URL } from "../../config/apiConfig";

function formatAlbumName(name) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const SongEditModal = ({ song, onClose, onEdit }) => {
  const [meta, setMeta] = useState({
    title: song.title,
    albumName: song.albumName,
    singerName: song.singerName,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [preview, setPreview] = useState(
    song.thumbnailKey
      ? `${API_BASE_URL}/api/songs/thumbnail/${song.thumbnailKey}`
      : null,
  );

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumbnailFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    await onEdit({
      id: song.id,
      ...meta,
      thumbnailFile,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-6">
        {/* HEADER */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Edit Song</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update song details and thumbnail
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* THUMBNAIL */}
          <div className="flex flex-col items-center gap-3">
            {preview && (
              <img
                src={preview}
                alt="Thumbnail"
                className="h-32 w-32 rounded-xl object-cover shadow-md"
              />
            )}

            <label className="cursor-pointer text-sm font-medium text-green-600">
              <div
                className="
                  px-4 py-2 rounded-xl
                  text-sm font-medium
                  bg-green-600 text-white
                  hover:bg-green-700
                  shadow-sm hover:shadow-md
                  transition
                "
              >
                Change Thumbnail
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleThumbnailChange}
              />
            </label>
          </div>

          {/* FORM */}
          <div className="sm:col-span-2 space-y-4">
            {["title", "albumName", "singerName"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1">
                  {formatAlbumName(field)}
                </label>
                <input
                  className="
                    w-full px-3 py-2 rounded-xl
                    bg-gray-100 dark:bg-zinc-800
                    border border-transparent
                    focus:outline-none focus:ring-2 focus:ring-green-500
                  "
                  value={meta[field]}
                  onChange={(e) =>
                    setMeta({ ...meta, [field]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-xl
              bg-gray-200 dark:bg-zinc-800
              hover:bg-gray-300 dark:hover:bg-zinc-700
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="
              px-5 py-2 rounded-xl
              text-white
              bg-green-600 hover:bg-green-700
              shadow-md hover:shadow-lg
              transition
            "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongEditModal;
