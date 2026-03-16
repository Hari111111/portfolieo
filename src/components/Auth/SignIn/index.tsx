"use client";
import { useState, useContext } from "react";
import Logo from "@/components/Layout/Header/Logo";
import { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react";
import axios from "axios";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import Loader from "@/components/Common/Loader";

const Signin = ({ signInOpen, toggleSignUp }: { signInOpen?: any; toggleSignUp?: () => void }) => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const { setIsSuccessDialogOpen, setIsFailedDialogOpen } = useContext(AuthDialogContext)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await axios.post(`${API_URL}/users/login`, { email, password }, { withCredentials: true });

      if (res.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setIsSuccessDialogOpen(true);
        setTimeout(() => {
          setIsSuccessDialogOpen(false);
          if (signInOpen) signInOpen(false);
        }, 2000);
      }
    } catch (err: any) {
      console.error(err);
      setIsFailedDialogOpen(true);
      setTimeout(() => setIsFailedDialogOpen(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 p-4 bg-slate-50 rounded-2xl">
        <Logo />
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 text-sm font-medium">Please enter your details to sign in</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Icon icon="solar:user-bold-duotone" width="20" />
          </div>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Icon icon="solar:lock-password-bold-duotone" width="20" />
          </div>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex justify-end">
          <button type="button" className="text-xs font-black text-primary hover:text-darkprimary transition-colors uppercase tracking-wider">
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-darkprimary hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader /> : "Explore Now"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 w-full text-center">
        <p className="text-slate-500 text-sm font-medium">
          Don't have an account?{" "}
          <button 
            onClick={toggleSignUp}
            className="text-primary font-black hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Signin;
