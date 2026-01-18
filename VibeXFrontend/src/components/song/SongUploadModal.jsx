import { useState } from "react";

function formatAlbumName(name) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SongUploadModal({ onClose, onUpload }) {
  const [songFile, setSongFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [songPreviewName, setSongPreviewName] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [meta, setMeta] = useState({
    title: "",
    albumName: "",
    singerName: "",
  });

  /* ---------------- FILE HANDLERS ---------------- */

  const handleSongChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSongFile(file);
    setSongPreviewName(file.name);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  /* ---------------- SUBMIT ---------------- */

  const submit = async () => {
    if (!songFile) return alert("Please select a song file");
    if (!thumbnailFile) return alert("Please add a thumbnail");

    await onUpload({
      songFile,
      thumbnailFile,
      ...meta,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-6">
        {/* HEADER */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Upload Song</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add a new song with metadata and thumbnail
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* THUMBNAIL */}
          <div className="flex flex-col items-center gap-4">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="h-32 w-32 rounded-xl object-cover shadow-md"
              />
            ) : (
              <div className="h-32 w-32 rounded-xl bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-sm text-gray-500">
                No Thumbnail
              </div>
            )}

            <div className="flex gap-2">
              {/* ADD / REPLACE */}
              <label className="cursor-pointer">
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
                  {thumbnailPreview ? "Replace" : "Add Thumbnail"}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleThumbnailChange}
                />
              </label>

              {/* REMOVE */}
              {thumbnailPreview && (
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="
                    px-4 py-2 rounded-xl
                    text-sm font-medium
                    bg-red-500 text-white
                    hover:bg-red-600
                    shadow-sm hover:shadow-md
                    transition
                  "
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* FORM */}
          <div className="sm:col-span-2 space-y-4">
            {/* SONG FILE */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Song File
              </label>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer">
                  <div
                    className="
                      px-4 py-2 rounded-xl
                      text-sm font-medium
                      bg-indigo-600 text-white
                      hover:bg-indigo-700
                      shadow-sm hover:shadow-md
                      transition
                    "
                  >
                    Choose Song
                  </div>

                  <input
                    type="file"
                    accept="audio/*"
                    hidden
                    onChange={handleSongChange}
                  />
                </label>

                <span className="text-sm truncate max-w-45 text-gray-600 dark:text-gray-400">
                  {songPreviewName || "No file selected"}
                </span>
              </div>
            </div>

            {/* META FIELDS */}
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
                    setMeta((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
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
            onClick={submit}
            className="
              px-5 py-2 rounded-xl
              text-white
              bg-green-600 hover:bg-green-700
              shadow-md hover:shadow-lg
              transition
            "
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
