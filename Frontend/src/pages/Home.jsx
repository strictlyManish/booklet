import React from "react";
import { useForm } from "react-hook-form";

function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted URL:", data.url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Booklet<span className="text-blue-500">.AI</span>
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-stretch gap-3"
        >
          <input
            type="url"
            placeholder="Enter URL or paste..."
            autoComplete="off" // 👈 prevents weird browser autofill
            {...register("url", {
              required: "URL is required",
              pattern: {
                value: /^(https?:\/\/[^\s]+$)/,
                message: "Enter a valid URL",
              },
            })}
            className="flex-1 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm sm:text-base"
          >
            Get
          </button>
        </form>

        {errors.url && (
          <p className="mt-3 text-red-400 text-sm text-center sm:text-left">
            {errors.url.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;