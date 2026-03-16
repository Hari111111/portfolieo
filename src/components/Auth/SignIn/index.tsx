"use client";
import { useState } from "react";
import Logo from "@/components/Layout/Header/Logo";
import { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react";

const Signin = ({ signInOpen, toggleSignUp }: { signInOpen?: any; toggleSignUp?: () => void }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for login can go here
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
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          className="w-full py-4 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-darkprimary hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all"
        >
          Explore Now
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
