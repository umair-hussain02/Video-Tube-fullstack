// src/features/user/userApi.js
import axiosInstance from "../../services/axios-instance";

const watchHistoryApi = {
  addVideoToWatchHistory: async (videoId) => {
    return await axiosInstance.post(`/users/history`, videoId);
  },
  getWatchHistory: async () => {
    return await axiosInstance.get(`/users/history`);
  },
};

export default watchHistoryApi;
