import { useState } from "react";

function formatAlbumName(albumName) {
  return albumName
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → camel Case
    .replace(/\b\w/g, char => char.toUpperCase()); // capitalize words
}

export default function SongUploadModal({ onClose, onUpload }) {
  const [songFile, setSongFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    albumName: "",
    singerName: "",
  });

  const submit = async () => {
    if (!songFile) return alert("Please select a song file");
    if (!thumbnailFile) return alert("Please select a thumbnail file");

    await onUpload({
      songFile,
      thumbnailFile,
      ...meta,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md space-y-5">
        <h3 className="text-lg font-semibold">Upload Song</h3>

        {/* FILE */}
        <label className="block">
          <span className="text-sm font-medium">Song File</span>

          <div className="mt-1 flex items-center gap-3">
            <label
              htmlFor="song-file"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white cursor-pointer text-sm"
            >
              Choose Song
            </label>

            <span className="text-sm truncate">
              {songFile ? songFile.name : "No file selected"}
            </span>
          </div>

          <input
            id="song-file"
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => setSongFile(e.target.files[0])}
          />
        </label>

        {/* FILE */}
        <label className="block">
          <span className="text-sm font-medium">Song File</span>

          <div className="mt-1 flex items-center gap-3">
            <label
              htmlFor="thumbnail-file"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white cursor-pointer text-sm"
            >
              Choose Thumbnail
            </label>

            <span className="text-sm truncate">
              {thumbnailFile ? thumbnailFile.name : "No file selected"}
            </span>
          </div>

          <input
            id="thumbnail-file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
          />
        </label>

        {/* META */}
        {["title", "albumName", "singerName"].map((field) => (
          <input
            key={field}
            placeholder={formatAlbumName(field)}
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-zinc-800"
            value={meta[field]}
            onChange={(e) =>
              setMeta({ ...meta, [field]: e.target.value })
            }
          />
        ))}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">Cancel</button>
          <button onClick={submit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
