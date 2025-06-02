import axiosInstance from "../../services/axios-instance";

const commentApi = {
  getComments: (videoId, page = 1, limit = 10) =>
    axiosInstance.get(`/comments/${videoId}?page=${page}&limit=${limit}`),

  addComment: (videoId, content) =>
    axiosInstance.post(`/comments/${videoId}`, { content }),

  updateComment: (commentId, content) =>
    axiosInstance.patch(`/comments/c/${commentId}`, { content }),

  deleteComment: (commentId) =>
    axiosInstance.delete(`/comments/c/${commentId}`),
};

export default commentApi;
