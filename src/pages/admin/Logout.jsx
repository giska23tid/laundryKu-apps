// src/pages/admin/Logout.jsx
import { useNavigate } from "react-router-dom";
import { supabase } from "../../libs/suppabase";
import { LogOut, ShieldX, ArrowLeftCircle } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 relative overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md z-10">
        <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10 flex flex-col items-center">
          {/* Icon */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-tr from-red-500 to-yellow-400 rounded-full p-3 shadow-lg mb-2">
              <ShieldX className="w-10 h-10 text-white" />
            </div>
            <div className="text-2xl font-extrabold tracking-wide text-blue-700 drop-shadow mb-1">
              Konfirmasi Logout
            </div>
            <p className="text-sm text-gray-500 text-center min-h-[20px]">Apakah Anda yakin ingin keluar dari akun admin?</p>
          </div>

          <div className="flex justify-center gap-4 w-full mt-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 font-semibold text-white px-5 py-2 rounded-full shadow transition text-base w-1/2 justify-center"
            >
              <LogOut className="w-5 h-5" />
              Ya, Logout
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 font-semibold text-gray-800 px-5 py-2 rounded-full shadow transition text-base w-1/2 justify-center"
            >
              <ArrowLeftCircle className="w-5 h-5" />
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
