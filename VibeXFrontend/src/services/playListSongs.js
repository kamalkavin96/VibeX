import api from "../config/axios";
import { notifyError } from "./notificationService";


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