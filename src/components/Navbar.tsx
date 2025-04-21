import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => setDark((d) => !d)}>{dark ? "☀️" : "🌙"}</button>
        {user ? (
          <>
            <span>{user.email}</span>
            <button
              onClick={() => {
                logout();
                nav("/login");
              }}
              className="underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="underline">
              Login
            </Link>
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
