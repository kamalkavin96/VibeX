import { useState } from "react";
import { API_BASE_URL } from "../../config/apiConfig";

export default function AlbumEditModal({
  album,
  onClose,
  onEdit,
}) {
  const [form, setForm] = useState({
    title: album?.title || "",
    description: album?.description || "",
    releaseDate: album?.releaseDate || "",
    language: album?.language || "",
    genre: album?.genre || "",
  });

  const [albumImage, setAlbumImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(
    album?.albumImageUrl
      ? album.albumImageUrl.startsWith("http")
        ? album.albumImageUrl
        : `${API_BASE_URL}/api/v1/albums/image/${album.albumImageUrl}`
      : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    setAlbumImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    await onEdit({
      id: album.id,

      title: form.title.trim(),
      description: form.description.trim(),

      releaseDate: form.releaseDate,
      language: form.language.trim(),
      genre: form.genre.trim(),

      albumImage,
      albumImageUrl: album.albumImageUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          bg-white
          dark:bg-zinc-900
          p-6
          shadow-2xl
          h-135
          overflow-auto
        "
      >
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Edit Album
          </h3>

          <p className="text-sm text-gray-500">
            Update album details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* IMAGE */}

          <div className="flex flex-col items-center gap-3">
            {imagePreview ? (
              <img
                src={imagePreview}
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
                  bg-gray-200
                  dark:bg-zinc-800
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
                  text-white
                "
              >
                Change Cover
              </div>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* FORM */}

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
              "
            />
          </div>
        </div>

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
            onClick={handleUpdate}
            className="
              px-5
              py-2
              rounded-xl
              bg-blue-600
              text-white
            "
          >
            Update Album
          </button>
        </div>
      </div>
    </div>
  );
}