import axiosInstance from "../../services/axios-instance";

const subscriptionApi = {
  getSubscriberList: (uId) => axiosInstance.get(`/subscriptions/u/${uId}`),
  toggleSubcription: (chId) => axiosInstance.post(`subscriptions/c/${chId}`),
  getSubscribedChannelList: (uname) =>
    axiosInstance.get(`subscriptions/c/${uname}`),
  getSubscriptionStatus: (chId) =>
    axiosInstance.get(`/subscriptions/status/${chId}`),
};

export default subscriptionApi;
