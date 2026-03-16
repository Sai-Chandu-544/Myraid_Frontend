import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
     await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me`, {
        withCredentials: true
      });

      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location]);

  const handleLogout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/logout`,
      {},
      { withCredentials: true }
    );

    setIsLoggedIn(false);   // update navbar state
    navigate("/login");

    checkAuth(); // re-check authentication
  } catch (error) {
    console.error("Logout failed", error);
  }
};
  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-slate-700 hover:text-blue-600";

  return (
    <nav className="bg-white border-b border-gray-100 px-6 h-[56px] flex items-center justify-between">

      <div className="flex items-center gap-2 font-bold text-[16px] text-slate-900">
        <CheckCircle2 size={20} className="text-blue-600" />
        TaskMaster
      </div>

      <div className="flex items-center gap-4">

        <NavLink to="/" className={activeStyle}>
          Home
        </NavLink>

        {!isLoggedIn ? (
          <>
            <NavLink to="/login" className={activeStyle}>
              Login
            </NavLink>

            <NavLink to="/register" className={activeStyle}>
              Sign Up
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard" className={activeStyle}>
              Dashboard
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};