import axiosInstance from "../../services/axios-instance";

const tweetApi = {
  getAllTweets: () => axiosInstance.get("/tweets"),
  createTweet: (formData) => axiosInstance.post("/tweets", formData),
  updateTweet: (tId, content) =>
    axiosInstance.patch(`/tweets/${tId}`, { content }),
  getUserTweet: (username) => axiosInstance.get(`/tweets/user/${username}`),
  deleteTweet: (tweetId) => axiosInstance.delete(`/tweets/${tweetId}`),
};

export default tweetApi;
