import axiosInstance from "../../services/axios-instance";

const authApi = {
  login: (credential) => axiosInstance.post("/users/login", credential),
  register: (formData) => axiosInstance.post("/users/register", formData),
  getCurrentUser: () => axiosInstance.get("/users/current-user"),
  logout: () => axiosInstance.post("/users/logout"),
  changePassword: (formData) => {
    axiosInstance.post("/users/change-password", formData);
  },
  updateAccountDetails: (formData) => {
    axiosInstance.patch("/users/update-account", formData);
  },
};

export default authApi;
