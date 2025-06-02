import axiosInstance from "../../services/axios-instance";

const videoApi = {
  fecthAllVideos: () => axiosInstance.get("/videos"),
  searchVideos: (query) =>
    axiosInstance.get(`/videos/?page=1&limit=20&query=${query}`),
  fecthUserVideos: (userName) => axiosInstance.get(`/videos/user/${userName}`),
  publishVideo: (formData) => axiosInstance.post("/videos", formData),
  toggleVideoPublish: (vId) =>
    axiosInstance.patch(`/videos/toggle/publish/${vId}`),
  deleteVideo: (videoId) => axiosInstance.delete(`/videos/${videoId}`),
  updateVideo: ({ videoId, formData }) =>
    axiosInstance.patch(`/videos/${videoId}`, formData),
};

export default videoApi;
