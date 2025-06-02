import axiosInstance from "../../services/axios-instance";

const dashboardApi = {
  channelStats: (channelId) =>
    axiosInstance.get(`/dashboard/stats/${channelId}`),
  channelVideos: (channelId) =>
    axiosInstance.get(`/dashboard/videos/${channelId}`),
};

export default dashboardApi;
