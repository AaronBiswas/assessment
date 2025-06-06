import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, setLoggedIn }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const url = import.meta.env.VITE_APP_URL;
        const res = await fetch(`${url}admin/auth`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (res.ok) {
          setIsAuth(true);
          if (setLoggedIn) setLoggedIn(true); 
        } else {
          setIsAuth(false);
          if (setLoggedIn) setLoggedIn(false);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setIsAuth(false);
        if (setLoggedIn) setLoggedIn(false);
      }
    };

    if (loggedIn !== undefined) {
      setIsAuth(loggedIn);
    } else {
      checkAuth();
    }
  }, [loggedIn, setLoggedIn]);

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">Checking authentication...</div>
      </div>
    );
  }
  
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;