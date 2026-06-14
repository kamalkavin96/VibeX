import api from "../config/axios";

import {
  notifyError,
  notifyLoading,
  updateToast,
} from "./notificationService";

/* ---------------- CREATE ALBUM ---------------- */

export const createAlbum = async (data) => {
  const toastId = notifyLoading("Creating album...");

  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("releaseDate", data.releaseDate || "");
    formData.append("language", data.language || "");
    formData.append("genre", data.genre || "");

    if (data.albumImage) {
      formData.append("albumImage", data.albumImage);
    }

    const res = await api.post(
      "/api/v1/albums",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    updateToast(
      toastId,
      "success",
      "Album created successfully"
    );

    return res.data;
  } catch (error) {
    updateToast(
      toastId,
      "error",
      "Failed to create album"
    );

    throw error;
  }
};

/* ---------------- GET ALL ALBUMS ---------------- */

export const getAllAlbums = async () => {
  try {
    const res = await api.get("/api/v1/albums");

    return res.data;
  } catch (error) {
    notifyError("Failed to load albums");

    throw error;
  }
};

/* ---------------- GET ALBUM BY ID ---------------- */

export const getAlbumById = async (id) => {
  try {
    const res = await api.get(`/api/v1/albums/${id}`);

    return res.data;
  } catch (error) {
    notifyError("Failed to load album");

    throw error;
  }
};

/* ---------------- DELETE ALBUM ---------------- */

export const deleteAlbum = async (id) => {
  const toastId = notifyLoading("Deleting album...");

  try {
    await api.delete(`/api/v1/albums/${id}`);

    updateToast(
      toastId,
      "success",
      "Album deleted successfully"
    );
  } catch (error) {
    updateToast(
      toastId,
      "error",
      "Failed to delete album"
    );

    throw error;
  }
};

/* ---------------- UPDATE ALBUM ---------------- */

export const updateAlbum = async (data) => {
  const toastId = notifyLoading("Updating album...");

  try {
    const formData = new FormData();

    if (data.albumImage instanceof File) {
      formData.append(
        "albumImage",
        data.albumImage
      );
    }

    const res = await api.put(
      "/api/v1/albums",
      formData,
      {
        params: {
          id: data.id,
          title: data.title,
          description: data.description || "",
          releaseDate: data.releaseDate || "",
          language: data.language || "",
          genre: data.genre || "",
          albumImageUrl:
            data.albumImageUrl || "",
        },
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    updateToast(
      toastId,
      "success",
      "Album updated successfully"
    );

    return res.data;
  } catch (error) {
    updateToast(
      toastId,
      "error",
      "Failed to update album"
    );

    throw error;
  }
};