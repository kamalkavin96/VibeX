import api from "../config/axios";
import { notifyError } from "./notificationService";

/* ---------------- GET ALL BUCKET LISt ---------------- */
export const getAllBucketLists = async () => {
  try {
    const res = await api.get("api/minio/buckets");
    return res;
  } catch (error) {
    notifyError("Failed to load playlists");
    throw error;
  }
};
