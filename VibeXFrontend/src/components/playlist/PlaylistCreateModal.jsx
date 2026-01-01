import { useState } from "react";

const PlaylistCreateModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleCreate = () => {
    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      description: desc.trim(),
      userId: 1,
      image: imageFile, // send file to parent
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="
        w-full max-w-lg rounded-2xl p-6
        bg-white dark:bg-zinc-900
        text-gray-900 dark:text-gray-100
      ">
        <h3 className="text-xl font-semibold mb-4">
          Create Playlist
        </h3>

        <div className="space-y-4">

          {/* Image Upload */}
          <div className="flex items-center gap-4">
            <label className="
              h-24 w-24 rounded-xl
              bg-gray-100 dark:bg-zinc-800
              flex items-center justify-center
              cursor-pointer
              overflow-hidden
              border border-dashed border-gray-300 dark:border-zinc-700
            ">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500 text-center px-2">
                  Upload Cover
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Optional playlist cover<br />
              JPG / PNG / WEBP
            </p>
          </div>

          {/* Playlist Name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Playlist name"
            className="
              w-full px-4 py-2 rounded-lg
              bg-gray-100 dark:bg-zinc-800
              outline-none
              focus:ring-2 focus:ring-gray-400
            "
          />

          {/* Description */}
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            rows={3}
            className="
              w-full px-4 py-2 rounded-lg
              bg-gray-100 dark:bg-zinc-800
              outline-none
              resize-none
              focus:ring-2 focus:ring-gray-400
            "
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              bg-gray-200 hover:bg-gray-300
              dark:bg-zinc-800 dark:hover:bg-zinc-700
            "
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="
              px-4 py-2 rounded-lg
              bg-blue-600 hover:bg-blue-700
              text-white
              disabled:opacity-50
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCreateModal;
