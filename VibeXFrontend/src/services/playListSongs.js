import api from "../config/axios";
import { notifyError, notifyLoading, updateToast,  } from "./notificationService";


/* ---------------- GET ALL PLAYLISTS ---------------- */
export const getAllSongsByPlaylists = async (id) => {
  try {
    
    const res = await api.get(`/api/playlists/${id}/songs`);
    return res.data;
  } catch (error) {
    notifyError("Failed to load playlists");
    throw error;
  }
};

/* ---------------- ADD SONG TO PLAYLIST ---------------- */
export const addSongToPlayList = async (playListId, songId) => {
  const toastId = notifyLoading("Adding song to playlist...");
  
  try {
    const res = await api.post(`/api/playlists/${playListId}/songs/${songId}`);
    updateToast(toastId, "success", "Song to playlist successfully");
    return res.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Playlist update code fix";
    updateToast(toastId, "error", errorMessage);
    throw error;
  }
};