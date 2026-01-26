import api from "../config/axios";
// import {
//   // notifyError,
//   notifyLoading,
//   updateToast,
// } from "./notificationService";


export const likeSong = async (songUUID) =>{
    const res = await api.post("/api/liked-song/like", {"songId":songUUID})
    return res.data;

}

export const unlikeSong = async (songUUID) => {
  const res = await api.delete("/api/liked-song/unlike", {
    params: { songId: songUUID }
  });
  return res.data;
};


export const isSongLiked = async (songUUID) =>{
    const res = await api.post("/api/liked-song/is-liked", {"songId":songUUID})
    return res.data;

}