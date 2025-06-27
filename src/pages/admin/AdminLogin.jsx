import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      if (email === "admin@example.com" && password === "admin") {
        localStorage.setItem("adminLoggedIn", true);
        navigate("/admin");
      } else {
        setError("Email atau password salah.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-blue-500 rounded-md shadow-md p-6">
        <div className="flex justify-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Lambang_Kota_Semarang.svg/1200px-Lambang_Kota_Semarang.svg.png"
            alt="Logo"
            className="h-20"
          />
        </div>

        <h2 className="text-xl font-bold text-center mb-1">Login</h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Kecamatan Semarang barat
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              📧
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              🔒
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Sedang masuk..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
