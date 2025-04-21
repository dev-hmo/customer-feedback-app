import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, pw);
      if (email === ADMIN_EMAIL) nav("/admin");
      else nav("/");
    } catch (er: any) {
      setErr(er.message);
    }
  };

  const handleGoogle = async () => {
    setErr("");
    try {
      const cred = await loginWithGoogle();
      if (cred.user.email === ADMIN_EMAIL) nav("/admin");
      else nav("/");
    } catch (er: any) {
      setErr(er.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      {err && <p className="text-red-500">{err}</p>}
      <form onSubmit={handleEmailLogin} className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Log In
        </button>
      </form>
      <button
        onClick={handleGoogle}
        className="w-full border py-2 rounded flex items-center justify-center space-x-2"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5"
        />
        <span>Sign in with Google</span>
      </button>
      <p>
        Don’t have an account?{" "}
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
