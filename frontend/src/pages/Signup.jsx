import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("email", formData.email);
      payload.append("fullName", formData.fullName);
      payload.append("userName", formData.userName);
      payload.append("password", formData.password);
      payload.append("avatar", formData.avatar[0]);
      payload.append("coverImage", formData.coverImage[0]);

      const resultAction = await dispatch(registerUser(payload));
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("SignUp Successfully...");
        navigate("/");
      } else {
        toast.error(resultAction.payload || "Failed to SignUp...");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black ml-64">
        <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md border">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="text-gray-300 block text-black-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                name="email"
                type="email"
                id="email"
                {...register("email", { required: "Email is required..." })}
                placeholder="Enter your email"
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name*
              </label>
              <input
                name="fullName"
                type="text"
                id="fullName"
                placeholder="Full Name"
                {...register("fullName", {
                  required: "Full Name is required...",
                })}
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="userName"
              >
                Username*
              </label>
              <input
                name="userName"
                type="text"
                id="userName"
                placeholder="Username"
                {...register("userName", {
                  required: "Username is required...",
                })}
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required...",
                })}
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  validate: (val) =>
                    val === watch("password") || "Passwords do not match...",
                })}
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="avatar"
              >
                Profile image
              </label>
              <input
                name="avatar"
                type="file"
                id="avatar"
                {...register("avatar", {
                  required: "Profile image is required...",
                })}
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm">{errors.avatar.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="coverImage"
              >
                Cover image
              </label>
              <input
                name="coverImage"
                type="file"
                id="coverImage"
                {...register("coverImage", {
                  required: "Cover image is required...",
                })}
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.coverImage && (
                <p className="text-red-500 text-sm">
                  {errors.coverImage.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#AE7AFF] text-white py-2 px-4 rounded-lg hover:bg-[#7f5abc] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? "Signing up..." : "Sign up with Email"}
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#AE7AFF] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
