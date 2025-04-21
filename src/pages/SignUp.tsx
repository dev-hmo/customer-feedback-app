import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const SignUp = () => {
  const { signup, loginWithGoogle } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (email === ADMIN_EMAIL) {
      return setErr("Admin account is pre‑registered.");
    }
    try {
      await signup(email, pw);
      nav("/");
    } catch (er: any) {
      setErr(er.message);
    }
  };

  const handleGoogleSignUp = async () => {
    setErr("");
    try {
      const cred = await loginWithGoogle();
      if (cred.user.email === ADMIN_EMAIL) {
        return setErr("Admin account is pre‑registered.");
      }
      nav("/");
    } catch (er: any) {
      setErr(er.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      {err && <p className="text-red-500">{err}</p>}

      <form onSubmit={handleEmailSignUp} className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border rounded dark:text-gray-900"
        />
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 border rounded dark:text-gray-900"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Create Account
        </button>
      </form>

      <div className="flex items-center justify-center space-x-2">
        <span className="border-b flex-grow border-gray-300"></span>
        <span>OR</span>
        <span className="border-b flex-grow border-gray-300"></span>
      </div>

      <button
        onClick={handleGoogleSignUp}
        className="w-full border py-2 rounded flex items-center justify-center space-x-2"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5"
        />
        <span>Sign up with Google</span>
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
