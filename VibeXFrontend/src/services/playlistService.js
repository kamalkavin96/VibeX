import api from "../config/axios";
import { notifyError, notifyLoading, updateToast } from "./notificationService";


/* ---------------- CREATE PLAYLIST ---------------- */
export const createPlaylist = async (data) => {
  const toastId = notifyLoading("Creating playlist...");

  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("userId", data.userId);

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await api.post("/api/playlists", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    updateToast(toastId, "success", "Playlist created successfully");
    return res.data;

  } catch (error) {
    updateToast(toastId, "error", "Failed to create playlist");
    throw error;
  }
};


/* ---------------- GET ALL PLAYLISTS ---------------- */
export const getAllPlaylists = async () => {
  try {
    const res = await api.get("/api/playlists");
    return res;
  } catch (error) {
    notifyError("Failed to load playlists");
    throw error;
  }
};

/* ---------------- GET PLAYLIST BY ID ---------------- */
export const getPlaylistById = async (id) => {
  try {
    const res = await api.get(`/api/playlists/${id}`);
    return res;
  } catch (error) {
    notifyError("Failed to load playlist details");
    throw error;
  }
};

/* ---------------- DELETE PLAYLIST ---------------- */
export const deletePlaylist = async (id) => {
  const toastId = notifyLoading("Deleting playlist...");

  try {
    await api.delete(`/api/playlists/${id}`);
    updateToast(toastId, "success", "Playlist deleted successfully");
  } catch (error) {
    updateToast(toastId, "error", "Failed to delete playlist");
    throw error;
  }
};
