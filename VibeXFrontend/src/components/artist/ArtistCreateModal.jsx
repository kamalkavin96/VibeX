import { useState } from "react";

export default function ArtistCreateModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    stageName: "",
    bio: "",
    dateOfBirth: "",
    gender: "MALE",
    instagramUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
    facebookUrl: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreate = async () => {
    await onCreate({
      ...form,
      profileImage: image,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6">
        <h3 className="text-2xl font-semibold mb-5">Create Artist</h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <label className="cursor-pointer">
              <div className="h-28 w-28 rounded-xl overflow-hidden bg-gray-200 dark:bg-zinc-800">
                {preview ? (
                  <img
                    src={preview}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>

            <div className="flex-1 space-y-3">
              <input
                placeholder="Artist Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
              />

              <input
                placeholder="Stage Name"
                value={form.stageName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stageName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
              />
            </div>
          </div>

          <textarea
            rows={3}
            placeholder="Bio"
            value={form.bio}
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value,
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
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
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
            />

            <select
              value={form.gender}
              onChange={(e) =>
                setForm({
                  ...form,
                  gender: e.target.value,
                })
              }
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
              <option value="BAND">Band</option>
              <option value="GROUP">Group</option>
            </select>
          </div>

          <input
            placeholder="Instagram URL"
            value={form.instagramUrl}
            onChange={(e) =>
              setForm({
                ...form,
                instagramUrl: e.target.value,
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
          />

          <input
            placeholder="Youtube URL"
            value={form.youtubeUrl}
            onChange={(e) =>
              setForm({
                ...form,
                youtubeUrl: e.target.value,
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
          />

          <input
            placeholder="Spotify URL"
            value={form.spotifyUrl}
            onChange={(e) =>
              setForm({
                ...form,
                spotifyUrl: e.target.value,
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
          />

          <input
            placeholder="Facebook URL"
            value={form.facebookUrl}
            onChange={(e) =>
              setForm({
                ...form,
                facebookUrl: e.target.value,
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
