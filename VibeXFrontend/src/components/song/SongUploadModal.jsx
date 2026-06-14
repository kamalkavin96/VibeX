import { useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { getAllAlbums } from "../../services/album.service";
import { getAllArtists } from "../../services/artist.service";

export default function SongUploadModal({
  onClose,
  onUpload,
}) {
  const [songFile, setSongFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] =
    useState(null);

  const [songPreviewName, setSongPreviewName] =
    useState("");

  const [thumbnailPreview, setThumbnailPreview] =
    useState(null);

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  const [meta, setMeta] = useState({
    title: "",
    albumId: "",
    artistIds: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [albumData, artistData] =
          await Promise.all([
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

  const albumOptions = useMemo(
    () =>
      albums.map((album) => ({
        value: album.id,
        label: album.title,
      })),
    [albums]
  );

  const artistOptions = useMemo(
    () =>
      artists.map((artist) => ({
        value: artist.id,
        label: artist.name,
      })),
    [artists]
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
      backgroundColor: state.isFocused
        ? "#3f3f46"
        : "#18181b",
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

  const handleSongChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSongFile(file);
    setSongPreviewName(file.name);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setThumbnailFile(file);

    setThumbnailPreview(
      URL.createObjectURL(file)
    );
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const submit = async () => {
    if (!songFile) {
      alert("Please select a song file");
      return;
    }

    if (!thumbnailFile) {
      alert("Please add a thumbnail");
      return;
    }

    if (!meta.title.trim()) {
      alert("Please enter song title");
      return;
    }

    if (!meta.albumId) {
      alert("Please select album");
      return;
    }

    if (meta.artistIds.length === 0) {
      alert(
        "Please select at least one artist"
      );
      return;
    }

    await onUpload({
      songFile,
      thumbnailFile,
      title: meta.title,
      albumId: meta.albumId,
      artistIds: meta.artistIds,
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-4xl
          rounded-3xl
          bg-white
          dark:bg-zinc-900
          shadow-2xl
          p-6
          max-h-[90vh]
          overflow-y-auto
          overflow-x-visible
        "
      >
        {/* HEADER */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Upload Song
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload a song and map it to albums
            and artists
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* THUMBNAIL */}
          <div className="flex flex-col items-center gap-4">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Thumbnail"
                className="
                  h-40
                  w-40
                  rounded-2xl
                  object-cover
                  shadow-lg
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
                  flex
                  items-center
                  justify-center
                "
              >
                No Thumbnail
              </div>
            )}

            <div className="flex gap-2">
              <label className="cursor-pointer">
                <div
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                  "
                >
                  {thumbnailPreview
                    ? "Replace"
                    : "Add Thumbnail"}
                </div>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={
                    handleThumbnailChange
                  }
                />
              </label>

              {thumbnailPreview && (
                <button
                  onClick={removeThumbnail}
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-red-500
                    text-white
                    hover:bg-red-600
                  "
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* FORM */}
          <div className="md:col-span-2 space-y-4">
            {/* SONG FILE */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Song File
              </label>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer">
                  <div
                    className="
                      px-4 py-2
                      rounded-xl
                      bg-indigo-600
                      text-white
                      hover:bg-indigo-700
                    "
                  >
                    Choose Song
                  </div>

                  <input
                    hidden
                    type="file"
                    accept="audio/*"
                    onChange={
                      handleSongChange
                    }
                  />
                </label>

                <span className="text-sm text-gray-500 truncate">
                  {songPreviewName ||
                    "No file selected"}
                </span>
              </div>
            </div>

            {/* TITLE */}
            <div>
              <label className="block text-sm font-medium mb-2">
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
                  px-4 py-2
                  rounded-xl
                  bg-gray-100
                  dark:bg-zinc-800
                "
              />
            </div>

            {/* ALBUM */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Album
              </label>

              <Select
                styles={selectStyles}
                options={albumOptions}
                isSearchable
                isClearable
                placeholder="Search Album..."
                menuPortalTarget={
                  document.body
                }
                menuPosition="fixed"
                menuPlacement="top"
                value={
                  albumOptions.find(
                    (a) =>
                      a.value ===
                      meta.albumId
                  ) || null
                }
                onChange={(selected) =>
                  setMeta((prev) => ({
                    ...prev,
                    albumId:
                      selected?.value || "",
                  }))
                }
              />
            </div>

            {/* ARTISTS */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Artists
              </label>

              <Select
                styles={selectStyles}
                options={artistOptions}
                isMulti
                isSearchable
                closeMenuOnSelect={false}
                placeholder="Search Artists..."
                menuPortalTarget={
                  document.body
                }
                menuPosition="fixed"
                menuPlacement="top"
                value={artistOptions.filter(
                  (artist) =>
                    meta.artistIds.includes(
                      artist.value
                    )
                )}
                onChange={(selected) =>
                  setMeta((prev) => ({
                    ...prev,
                    artistIds: selected
                      ? selected.map(
                          (a) => a.value
                        )
                      : [],
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2
              rounded-xl
              bg-gray-200
              dark:bg-zinc-800
            "
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="
              px-5 py-2
              rounded-xl
              bg-green-600
              hover:bg-green-700
              text-white
            "
          >
            Upload Song
          </button>
        </div>
      </div>
    </div>
  );
}