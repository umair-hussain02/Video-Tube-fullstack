import axiosInstance from "../../services/axios-instance";

const userProfileApi = {
  changeAvatar: (formData) => axiosInstance.patch("/users/avatar", formData),
  changeCoverImage: (formData) =>
    axiosInstance.patch("/users/cover-image", formData),
};

export default userProfileApi;
