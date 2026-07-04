import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearAuthStorage } from "../utils/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (res.status != 200) return console.log("Login failed");
      console.log(`login successfull ${res.status}`);

      clearAuthStorage();
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({
          email,
          role: res.data.user.role,
          isLoggedIn: true,
        }),
      );
      window.dispatchEvent(new Event("authchange"));
      if (res.data.user.role === "admin") {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 rounded-lg bg-white shadow-md flex flex-col"
      >
        <h2 className="m-0 mb-4 text-center text-xl font-semibold">Login</h2>

        <label className="text-sm mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-3 py-2.5 text-sm rounded border border-gray-300 mb-3 w-full focus:outline-none focus:border-blue-500"
        />

        <label className="text-sm mb-1.5" htmlFor="password">
          Password
        </label>
        <div className="flex gap-2 items-center mb-4">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-2.5 text-sm rounded border border-gray-300 w-full focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="px-2.5 py-2 text-sm cursor-pointer rounded border border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center"
          >
            {showPassword ? (
              <AiFillEyeInvisible size={18} />
            ) : (
              <AiFillEye size={18} />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="px-3 py-2.5 text-base rounded border-none bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
