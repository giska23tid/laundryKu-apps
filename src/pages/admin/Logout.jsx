// src/pages/admin/Logout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../libs/suppabase";

const Logout = () => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Konfirmasi Logout</h2>
        <p className="mb-6 text-gray-700">Apakah Anda yakin ingin keluar dari akun?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Ya, Logout
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
