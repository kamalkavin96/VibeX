import { useState } from "react";

export default function SongUploadModal({ onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    artist: "",
    album: "",
  });

  const submit = async () => {
    if (!file) return alert("Please select a song file");

    const formData = new FormData();
    formData.append("file", file);
    Object.entries(meta).forEach(([k, v]) =>
      formData.append(k, v)
    );
    await onUpload(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md space-y-5">
        <h3 className="text-lg font-semibold">Upload Song</h3>

        {/* FILE INPUT */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Song File
          </span>

          <div className="mt-1 flex items-center gap-3">
            <label
              htmlFor="song-file"
              className="px-4 py-2 rounded-lg cursor-pointer
                         bg-indigo-600 text-white text-sm
                         hover:bg-indigo-700"
            >
              Choose File
            </label>

            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {file ? file.name : "No file selected"}
            </span>
          </div>

          <input
            id="song-file"
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* META INPUTS */}
        {["title", "artist", "album"].map((field) => (
          <input
            key={field}
            placeholder={field}
            className="w-full p-2 rounded-lg
                       bg-gray-100 dark:bg-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setMeta({ ...meta, [field]: e.target.value })
            }
          />
        ))}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 
                       text-gray-700 hover:bg-gray-100
                       dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg bg-green-600 
                       hover:bg-green-700 text-white"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
