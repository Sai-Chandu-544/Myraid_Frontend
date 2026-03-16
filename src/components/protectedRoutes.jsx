import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProtectedRoute = ({ children }) => {

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {

    const check = async () => {

      try {

        await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/me`,
          { withCredentials: true }
        );

        setIsAuth(true);

      } catch {

        setIsAuth(false);

      }

    };

    check();

  }, []);

  if (isAuth === null) return null;

  return isAuth ? children : <Navigate to="/login" replace />;
};