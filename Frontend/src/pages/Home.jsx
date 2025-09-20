import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [booklet, setBooklet] = useState(null);

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/creatbooklet",
        { url: formData.url },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Fetched successfully!");
        setBooklet(response.data.booklet);
      } else {
        toast.error("Unexpected response");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      reset();

      console.log(booklet);
    }
  };


const {title,slides} = booklet ? booklet :[]

  // format date nicely
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-around bg-gray-950 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Booklet<span className="text-blue-500">.AI</span>
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-stretch gap-3"
        >
          <input
            type="url"
            placeholder="Enter URL or paste..."
            autoComplete="off"
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
            disabled={loading}
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg transition-all text-sm sm:text-base ${
              loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>

        {errors.url && (
          <p className="mt-3 text-red-400 text-sm text-center sm:text-left">
            {errors.url.message}
          </p>
        )}
      </div>
      <div>
        <h1 className="text-blue-400 text-4xl font-bold p-5">Booklet Detaiils..</h1>
        <hr />
        
        <p className="text-[13px] mt-10">{title ? title:''}</p>
        <div className="py-5">
          <p>{slides ? slides:''}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
