import api from "../config/axios";
import {
  notifyError,
  notifyLoading,
  updateToast,
} from "./notificationService";

/* ---------------- CREATE ARTIST ---------------- */
export const createArtist = async (data) => {
  const toastId = notifyLoading("Creating artist...");

  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("stageName", data.stageName || "");
    formData.append("bio", data.bio || "");
    formData.append("dateOfBirth", data.dateOfBirth || "");
    formData.append("gender", data.gender || "");

    formData.append("instagramUrl", data.instagramUrl || "");
    formData.append("youtubeUrl", data.youtubeUrl || "");
    formData.append("spotifyUrl", data.spotifyUrl || "");
    formData.append("facebookUrl", data.facebookUrl || "");

    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }

    const res = await api.post("/api/v1/artists", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    updateToast(toastId, "success", "Artist created successfully");
    return res.data;

  } catch (error) {
    updateToast(toastId, "error", "Failed to create artist");
    throw error;
  }
};

/* ---------------- GET ALL ARTISTS ---------------- */
export const getAllArtists = async () => {
  try {
    const res = await api.get("/api/v1/artists");
    return res.data;
  } catch (error) {
    notifyError("Failed to load artists");
    throw error;
  }
};

/* ---------------- GET ARTIST BY ID ---------------- */
export const getArtistById = async (id) => {
  try {
    const res = await api.get(`/api/v1/artists/${id}`);
    return res.data;
  } catch (error) {
    notifyError("Failed to load artist");
    throw error;
  }
};

/* ---------------- DELETE ARTIST ---------------- */
export const deleteArtist = async (id) => {
  const toastId = notifyLoading("Deleting artist...");

  try {
    await api.delete(`/api/v1/artists/${id}`);

    updateToast(toastId, "success", "Artist deleted successfully");
  } catch (error) {
    updateToast(toastId, "error", "Failed to delete artist");
    throw error;
  }
};

/* ---------------- UPDATE ARTIST ---------------- */
export const updateArtist = async (data) => {
  const toastId = notifyLoading("Updating artist...");

  try {
    const formData = new FormData();

    if (data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    }

    const res = await api.put(
      "/api/v1/artists",
      formData,
      {
        params: {
          id: data.id,
          name: data.name,
          stageName: data.stageName || "",
          profileImageUrl: data.profileImageUrl || "",
          bio: data.bio || "",
          dateOfBirth: data.dateOfBirth || "",
          gender: data.gender || "",

          instagramUrl: data.instagramUrl || "",
          youtubeUrl: data.youtubeUrl || "",
          spotifyUrl: data.spotifyUrl || "",
          facebookUrl: data.facebookUrl || "",
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    updateToast(
      toastId,
      "success",
      "Artist updated successfully"
    );

    return res.data;
  } catch (error) {
    updateToast(
      toastId,
      "error",
      "Failed to update artist"
    );
    throw error;
  }
};