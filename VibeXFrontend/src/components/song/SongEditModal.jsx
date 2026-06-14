import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { API_BASE_URL } from "../../config/apiConfig";
import { Music2, Upload, X } from "lucide-react";

import { getAllAlbums } from "../../services/album.service";
import { getAllArtists } from "../../services/artist.service";

const SongEditModal = ({ song, onClose, onEdit }) => {
  const [loading, setLoading] = useState(false);

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  const [meta, setMeta] = useState({
    title: song?.title || "",
    albumId: song?.albumId || song?.album?.id || "",
    artistIds:
      song?.artistIds || song?.artists?.map((artist) => artist.id) || [],
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [preview, setPreview] = useState(
    song?.thumbnailKey
      ? `${API_BASE_URL}/api/songs/thumbnail/${song.thumbnailKey}?v=${song.updatedAt}`
      : null,
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const [albumData, artistData] = await Promise.all([
          getAllAlbums(),
          getAllArtists(),
        ]);

        setAlbums(albumData || []);
        setArtists(artistData || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const albumOptions = useMemo(
    () =>
      albums.map((album) => ({
        value: album.id,
        label: album.title,
      })),
    [albums],
  );

  const artistOptions = useMemo(
    () =>
      artists.map((artist) => ({
        value: artist.id,
        label: artist.name,
      })),
    [artists],
  );

  const selectStyles = {
    control: (base) => ({
      ...base,
      minHeight: 46,
      borderRadius: 12,
      backgroundColor: "#27272a",
      borderColor: "#3f3f46",
      boxShadow: "none",
    }),

    menuPortal: (base) => ({
      ...base,
      zIndex: 99999,
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#18181b",
      zIndex: 99999,
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#3f3f46" : "#18181b",
      color: "#fff",
      cursor: "pointer",
    }),

    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),

    input: (base) => ({
      ...base,
      color: "#fff",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#a1a1aa",
    }),

    multiValue: (base) => ({
      ...base,
      backgroundColor: "#2563eb",
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "#fff",
    }),

    multiValueRemove: (base) => ({
      ...base,
      color: "#fff",
    }),
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setThumbnailFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (!meta.title.trim()) {
      alert("Song title is required");
      return;
    }

    if (!meta.albumId) {
      alert("Please select album");
      return;
    }

    if (meta.artistIds.length === 0) {
      alert("Please select at least one artist");
      return;
    }

    try {
      setLoading(true);

      await onEdit({
        id: song.id,
        title: meta.title.trim(),
        albumId: meta.albumId,
        artistIds: meta.artistIds,
        thumbnailFile,
      });

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        backdrop-blur-md
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-y-auto

          rounded-3xl

          bg-white
          dark:bg-zinc-900

          border
          border-zinc-200
          dark:border-zinc-800

          shadow-2xl
        "
      >
        <div
          className="
            flex items-start justify-between
            p-6
            border-b
            border-zinc-200
            dark:border-zinc-800
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-zinc-900
                dark:text-white
              "
            >
              Edit Song
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-zinc-500
                dark:text-zinc-400
              "
            >
              Update song information
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-xl
              hover:bg-zinc-100
              dark:hover:bg-zinc-800
            "
          >
            <X size={18} />
          </button>
        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[280px_1fr]
            gap-8
            p-6
          "
        >
          <div>
            <label className="block cursor-pointer group">
              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-3xl
                  border-2
                  border-dashed
                  border-zinc-300
                  dark:border-zinc-700
                "
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="thumbnail"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      h-full
                      w-full
                      bg-zinc-100
                      dark:bg-zinc-800
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-3
                    "
                  >
                    <Music2 size={50} className="text-zinc-400" />

                    <span className="text-sm text-zinc-500">
                      No Cover Image
                    </span>
                  </div>
                )}

                <div
                  className="
                    absolute inset-0
                    bg-black/60
                    opacity-0
                    group-hover:opacity-100
                    transition
                    flex flex-col
                    items-center
                    justify-center
                    text-white
                  "
                >
                  <Upload size={32} />

                  <span className="mt-3 font-medium">Change Cover</span>
                </div>
              </div>

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
            </label>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Song Title
              </label>

              <input
                value={meta.title}
                onChange={(e) =>
                  setMeta((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="
                  w-full
                  h-12
                  px-4
                  rounded-2xl
                  border
                  border-zinc-300
                  dark:border-zinc-700
                  bg-white
                  dark:bg-zinc-800
                "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Album</label>

              <Select
                styles={selectStyles}
                options={albumOptions}
                isSearchable
                menuPortalTarget={document.body}
                menuPosition="fixed"
                menuPlacement="top"
                value={
                  albumOptions.find((a) => a.value === meta.albumId) || null
                }
                onChange={(selected) =>
                  setMeta((prev) => ({
                    ...prev,
                    albumId: selected?.value || "",
                  }))
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Artists</label>

              <Select
                styles={selectStyles}
                options={artistOptions}
                isMulti
                isSearchable
                closeMenuOnSelect={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                menuPlacement="top"
                value={artistOptions.filter((artist) =>
                  meta.artistIds.includes(artist.value),
                )}
                onChange={(selected) =>
                  setMeta((prev) => ({
                    ...prev,
                    artistIds: selected ? selected.map((a) => a.value) : [],
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div
          className="
            px-6 py-5
            border-t
            border-zinc-200
            dark:border-zinc-800
            flex justify-end gap-3
          "
        >
          <button
            onClick={onClose}
            disabled={loading}
            className="
              px-5 py-2.5
              rounded-xl
              border
              border-zinc-300
              dark:border-zinc-700
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="
              px-6 py-2.5
              rounded-xl
              bg-green-600
              hover:bg-green-700
              text-white
            "
          >
            {loading ? "Updating..." : "Update Song"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongEditModal;
