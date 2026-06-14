import api from "../config/axios";
import {
  // notifyError,
  notifyLoading,
  updateToast,
} from "./notificationService";

/* ---------------- GET ---------------- */
export const getAllSongs = () => {
  return api.get("/api/songs");
};

/* ---------------- GET BY PLAYLIST ID ---------------- */
export const getAllSongsByPlayListId = (id) => {
  return api.get(`/api/songs/playlist/${id}`);
};

/* ---------------- GET BY PLAYLIST ID ---------------- */
export const getSongById = async (id) => {
  const res = await api.get(`/api/songs/${id}`);
  return [res.data]
};

/* ---------------- UPLOAD ---------------- */
export const uploadSong = async ({ songFile, thumbnailFile, title, albumId, artistIds }) => {
  const toastId = notifyLoading("Uploading song...");

  console.log({ songFile, thumbnailFile, title, albumId, artistIds })

  try {
    const formData = new FormData();
    formData.append("songFile", songFile);
    formData.append("thumbnailFile", thumbnailFile);

    const res = await api.post("/api/songs", formData, {
      params: {
        title,
        albumId,
        artistIds,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    updateToast(toastId, "success", "Song uploaded successfully 🎵", );
    return res;
  } catch (err) {
    updateToast(toastId, "error", "Failed to upload song", );
    throw err;
  }
};

/* ---------------- DELETE ---------------- */
export const deleteSong = async (id) => {
  const toastId = notifyLoading("Deleting song...");

  try {
    const res = await api.delete(`/api/songs/${id}`);

    updateToast(toastId,  "success", "Song deleted successfully 🗑️",);
    return res;
  } catch (err) {
    updateToast(toastId, "error", "Failed to delete song", );
    throw err;
  }
};

/* ---------------- UPDATE (SWAGGER-COMPATIBLE) ---------------- */
export const updateSong = async ({
  id,
  title,
  albumId,
  artistIds,
  thumbnailFile, // REQUIRED (as per swagger usage)
}) => {
  const toastId = notifyLoading("Updating song...");

  try {
    const formData = new FormData();

    // ONLY file goes in multipart body
    formData.append("thumbnailFile", thumbnailFile);

    const res = await api.put("/api/songs", formData, {
      params: {
        id,
        title,
        albumId,
        artistIds,
        thumbnailFile
      },
      // ❌ DO NOT set Content-Type
    });

    updateToast(toastId, "success", "Song updated successfully ✨");
    return res.data;
  } catch (err) {
    updateToast(toastId, "error", "Failed to update song");
    throw err;
  }
};
