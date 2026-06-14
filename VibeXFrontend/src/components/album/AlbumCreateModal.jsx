import { useState } from "react";

export default function AlbumCreateModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    releaseDate: "",
    language: "",
    genre: "",
  });

  const [albumImage, setAlbumImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    setAlbumImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreate = async () => {
    await onCreate({
      ...form,
      albumImage,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl h-135 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Create Album</h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add a new music album
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cover Image */}
          <div className="flex flex-col items-center gap-3">
            {preview ? (
              <img
                src={preview}
                alt="Album"
                className="
                  h-40
                  w-40
                  rounded-2xl
                  object-cover
                  border-4
                  border-gray-200
                  dark:border-zinc-700
                "
              />
            ) : (
              <div
                className="
                  h-40
                  w-40
                  rounded-2xl
                  bg-gradient-to-br
                  from-violet-500
                  via-purple-500
                  to-indigo-600
                "
              />
            )}

            <label className="cursor-pointer">
              <div
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-sm
                "
              >
                Upload Cover
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Form */}
          <div className="md:col-span-2 space-y-4">
            <input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              placeholder="Album Title"
              className="
                w-full
                px-4
                py-2
                rounded-xl
                bg-gray-100
                dark:bg-zinc-800
                focus:outline-none
              "
            />

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Album Description"
              className="
                w-full
                px-4
                py-2
                rounded-xl
                bg-gray-100
                dark:bg-zinc-800
                resize-none
                focus:outline-none
              "
            />

            <input
              type="date"
              value={form.releaseDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  releaseDate: e.target.value,
                })
              }
              className="
                w-full
                px-4
                py-2
                rounded-xl
                bg-gray-100
                dark:bg-zinc-800
                focus:outline-none
              "
            />

            <input
              value={form.language}
              onChange={(e) =>
                setForm({
                  ...form,
                  language: e.target.value,
                })
              }
              placeholder="Language"
              className="
                w-full
                px-4
                py-2
                rounded-xl
                bg-gray-100
                dark:bg-zinc-800
                focus:outline-none
              "
            />

            <input
              value={form.genre}
              onChange={(e) =>
                setForm({
                  ...form,
                  genre: e.target.value,
                })
              }
              placeholder="Genre"
              className="
                w-full
                px-4
                py-2
                rounded-xl
                bg-gray-100
                dark:bg-zinc-800
                focus:outline-none
              "
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4
              py-2
              rounded-xl
              bg-gray-200
              dark:bg-zinc-800
            "
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="
              px-5
              py-2
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
            "
          >
            Create Album
          </button>
        </div>
      </div>
    </div>
  );
}