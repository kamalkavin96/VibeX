import { useState } from "react";
import { API_BASE_URL } from "../../config/apiConfig";

export default function ArtistEditModal({ artist, onClose, onEdit }) {
  
  const [form, setForm] = useState({
    name: artist?.name || "",
    stageName: artist?.stageName || "",
    bio: artist?.bio || "",
    dateOfBirth: artist?.dateOfBirth || "",
    gender: artist?.gender || "MALE",

    instagramUrl: artist?.instagramUrl || "",
    youtubeUrl: artist?.youtubeUrl || "",
    spotifyUrl: artist?.spotifyUrl || "",
    facebookUrl: artist?.facebookUrl || "",
  });

  const [imageFile, setImageFile] = useState(null);

  const [imagePreview, setImagePreview] = useState(
    artist?.profileImageUrl
      ? artist.profileImageUrl.startsWith("http")
        ? artist.profileImageUrl
        : `${API_BASE_URL}/api/v1/artists/profileImage/${artist.profileImageUrl}`
      : null,
  );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    await onEdit({
      id: artist.id,

      name: form.name.trim(),
      stageName: form.stageName.trim(),
      bio: form.bio.trim(),

      dateOfBirth: form.dateOfBirth,
      gender: form.gender,

      instagramUrl: form.instagramUrl.trim(),
      youtubeUrl: form.youtubeUrl.trim(),
      spotifyUrl: form.spotifyUrl.trim(),
      facebookUrl: form.facebookUrl.trim(),

      profileImage: imageFile,
      profileImageUrl: artist.profileImageUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Edit Artist</h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update artist details
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image */}
          <div className="flex flex-col items-center gap-3">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Artist"
                className="
                  h-36
                  w-36
                  rounded-full
                  object-cover
                  border-4
                  border-gray-200
                  dark:border-zinc-700
                "
              />
            ) : (
              <div
                className="
                  h-36
                  w-36
                  rounded-full
                  bg-gray-200
                  dark:bg-zinc-800
                "
              />
            )}

            <label className="cursor-pointer">
              <div
                className="
                  px-4 py-2
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-sm
                "
              >
                Change Image
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Form */}
          <div className="md:col-span-2 space-y-4">
            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Artist Name"
              className="
                w-full px-4 py-2 rounded-xl
                bg-gray-100 dark:bg-zinc-800
                focus:outline-none
              "
            />

            <input
              value={form.stageName}
              onChange={(e) =>
                setForm({
                  ...form,
                  stageName: e.target.value,
                })
              }
              placeholder="Stage Name"
              className="
                w-full px-4 py-2 rounded-xl
                bg-gray-100 dark:bg-zinc-800
                focus:outline-none
              "
            />

            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) =>
                setForm({
                  ...form,
                  bio: e.target.value,
                })
              }
              placeholder="Artist Bio"
              className="
                w-full px-4 py-2 rounded-xl
                bg-gray-100 dark:bg-zinc-800
                resize-none
                focus:outline-none
              "
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dateOfBirth: e.target.value,
                  })
                }
                className="
                  px-4 py-2 rounded-xl
                  bg-gray-100 dark:bg-zinc-800
                "
              />

              <select
                value={form.gender}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gender: e.target.value,
                  })
                }
                className="
                  px-4 py-2 rounded-xl
                  bg-gray-100 dark:bg-zinc-800
                "
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="BAND">Band</option>
                <option value="GROUP">Group</option>
              </select>
            </div>

            <input
              value={form.instagramUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  instagramUrl: e.target.value,
                })
              }
              placeholder="Instagram URL"
              className="
                w-full px-4 py-2 rounded-xl
                bg-gray-100 dark:bg-zinc-800
              "
            />

            <input
              value={form.youtubeUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  youtubeUrl: e.target.value,
                })
              }
              placeholder="Youtube URL"
              className="
                w-full px-4 py-2 rounded-xl
                bg-gray-100 dark:bg-zinc-800
              "
            />

            <input
              value={form.spotifyUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  spotifyUrl: e.target.value,
                })
              }
              placeholder="Spotify URL"
              className="
                w-full px-4 py-2 rounded-xl
                bg-gray-100 dark:bg-zinc-800
              "
            />

            <input
              value={form.facebookUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  facebookUrl: e.target.value,
                })
              }
              placeholder="Facebook URL"
              className="
                w-full px-4 py-2 rounded-xl
                bg-gray-100 dark:bg-zinc-800
              "
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-xl
              bg-gray-200
              dark:bg-zinc-800
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="
              px-5 py-2 rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
            "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
