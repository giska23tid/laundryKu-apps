// src/pages/admin/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../libs/suppabase"; // gunakan jalur relatif yang benar

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      navigate("/"); // ini akan mengarahkan ke Home.jsx
    };
    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
