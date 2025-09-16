import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const sendata = await axios.post(
        "http://localhost:3000/api/login",
        {
          username: data.username,
          password: data.password,
        },
        { withCredentials: true }
      );
      toast.success(sendata.data.message)
      navigate('/')
    } catch (error) {toast.error('Something went wrong')}
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl  p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back <span className="text-indigo-400">👋</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-200 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-200 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-indigo-600 p-3 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
