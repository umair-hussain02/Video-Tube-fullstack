// src/features/user/userApi.js
import axiosInstance from "../../services/axios-instance";

const channelApi = {
  getChannelProfile: async (username) => {
    return await axiosInstance.get(`/users/c/${username}`);
  },
};

export default channelApi;
