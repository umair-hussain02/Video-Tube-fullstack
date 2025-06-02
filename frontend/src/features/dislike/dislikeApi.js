import axiosInstance from "../../services/axios-instance";

const dislikeApi = {
  toggleVideoDislike: (videoId) =>
    axiosInstance.post(`/dislikes/toggle/v/${videoId}`),
  toggleCommentDislike: (commentId) =>
    axiosInstance.post(`/dislikes/toggle/c/${commentId}`),
  toggleTweetDislike: (tweetId) =>
    axiosInstance.post(`/dislikes/toggle/t/${tweetId}`),
  getDislikedVideos: () => axiosInstance.get("/likes/videos"),
};

export default dislikeApi;
