// features/playlist/playlistApi.js
import axiosInstance from "../../services/axios-instance";

const playlistApi = {
  create: (payload) => axiosInstance.post("/playlist", payload),

  getUserPlaylists: (username, page = 1, limit = 10) =>
    axiosInstance.get(`/playlist/user/${username}?page=${page}&limit=${limit}`),

  getById: (playlistId) => axiosInstance.get(`/playlist/${playlistId}`),

  update: (playlistId, payload) =>
    axiosInstance.patch(`/playlist/${playlistId}`, payload),

  delete: (playlistId) => axiosInstance.delete(`/playlist/${playlistId}`),

  addVideo: (playlistId, videoId) =>
    axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`),

  removeVideo: (playlistId, videoId) =>
    axiosInstance.patch(`/playlist/remove/${videoId}/${playlistId}`),
};

export default playlistApi;
