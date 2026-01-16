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

/* ---------------- UPLOAD ---------------- */
export const uploadSong = async ({ songFile, thumbnailFile, title, albumName, singerName }) => {
  const toastId = notifyLoading("Uploading song...");

  try {
    const formData = new FormData();
    formData.append("songFile", songFile);
    formData.append("thumbnailFile", thumbnailFile);

    const res = await api.post("/api/songs", formData, {
      params: {
        title,
        albumName,
        singerName,
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

