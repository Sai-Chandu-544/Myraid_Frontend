import { useState, useEffect } from "react";
import { CheckCircle2, Menu, X } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { logout } from "../Api/ApiRequests";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/me`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      navigate("/login", { replace: true });
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-slate-700 hover:text-blue-600";

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-3">
      
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <CheckCircle2 size={22} className="text-blue-600" />
          TaskMaster
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={activeStyle}>Home</NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className={activeStyle}>Login</NavLink>
              <NavLink to="/register" className={activeStyle}>Sign Up</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={activeStyle}>Dashboard</NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">

          <NavLink
            to="/"
            className={activeStyle}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className={activeStyle}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={activeStyle}
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={activeStyle}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded w-fit"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};