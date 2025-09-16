import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    console.log("Register Data:", formData);
    // TODO: Add API call or auth logic here
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">
          Create Account 
          <p className="text-[25px] font-light">Account creation for booklet.ai</p>
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-600 p-2 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 p-3 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
