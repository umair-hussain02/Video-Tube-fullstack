import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const resultAction = await dispatch(loginUser(formData));
      // console.log(resultAction);

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login Successfull...");
        navigate("/");
      } else {
        toast.error(resultAction.payload || "Invalid Credentials...");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black w-auto ml-64">
        <div className="bg-black border p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl text-white font-bold mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block  text-gray-300 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full bg-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#AE7AFF] text-white py-2 px-4 rounded-lg hover:bg-[#7f5abc] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-center">
            Did not have account?{" "}
            <Link to="/register" className="text-[#AE7AFF] hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
