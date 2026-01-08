import api from "../config/axios";


export const getAllSongs = () => api.get("/api/songs");

export const uploadSong = (formData) =>
  api.post("/songs/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteSong = (id) => api.delete(`/songs/${id}`);
