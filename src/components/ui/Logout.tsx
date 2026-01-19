import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../utils/authStorage";
import { LogOut } from "lucide-react";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };
  
  return (
    <div className="flex items-center">
      <button
        onClick={handleLogout}
        className="
          flex items-center justify-center
          px-3 py-2
          bg-gradient-to-r from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700
          active:scale-95
          text-white
          rounded-lg
          font-medium
          text-sm
          shadow-lg shadow-red-500/20
          hover:shadow-xl hover:shadow-red-500/30
          transition-all duration-200
          group
          whitespace-nowrap
        "
      >
        <LogOut className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};