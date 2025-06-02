import axiosInstance from "../../services/axios-instance";

const likeApi = {
  toggleVideoLike: (videoId) =>
    axiosInstance.post(`/likes/toggle/v/${videoId}`),
  toggleCommentLike: (commentId) =>
    axiosInstance.post(`/likes/toggle/c/${commentId}`),
  toggleTweetLike: (tweetId) =>
    axiosInstance.post(`/likes/toggle/t/${tweetId}`),
  getLikedVideos: () => axiosInstance.get("/likes/videos"),
};

export default likeApi;
