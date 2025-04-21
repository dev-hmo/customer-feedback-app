import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

type AuthCtx = {
  user: User | null;
  login: (email: string, pw: string) => Promise<void>;
  signup: (email: string, pw: string) => Promise<void>;
  loginWithGoogle: () => Promise<ReturnType<typeof signInWithPopup>>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);
export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(() => {});

  const signup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(() => {});

  const loginWithGoogle = () => {
    const prov = new GoogleAuthProvider();
    return signInWithPopup(auth, prov);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  return (
    <Ctx.Provider value={{ user, login, signup, loginWithGoogle, logout }}>
      {children}
    </Ctx.Provider>
  );
};
