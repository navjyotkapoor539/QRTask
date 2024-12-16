import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/admin/login",  {
        username,
        password,},
       {withCredentials: true});
      console.log(response.data.message);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      navigate("/admin/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-800">
      <div className="w-full max-w-md px-6 py-8 bg-purple-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-900 transition duration-300 rounded-lg font-semibold py-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
