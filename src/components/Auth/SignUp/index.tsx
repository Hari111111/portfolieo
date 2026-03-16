"use client";
import { useState } from "react";
import Logo from "@/components/Layout/Header/Logo";
import { Icon } from "@iconify/react";
import Loader from "@/components/Common/Loader";

const SignUp = ({ signUpOpen, toggleSignIn }: { signUpOpen?: any; toggleSignIn?: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // toast.success("Account created successfully!");
        if (toggleSignIn) toggleSignIn();
      } else {
        // toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
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
        <h2 className="text-2xl font-black text-slate-900 mb-2">Create Account</h2>
        <p className="text-slate-500 text-sm font-medium">Join our community of developers</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Icon icon="solar:user-bold-duotone" width="20" />
          </div>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Icon icon="solar:letter-bold-duotone" width="20" />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Icon icon="solar:lock-password-bold-duotone" width="20" />
          </div>
          <input
            type="password"
            placeholder="Create Password"
            name="password"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-darkprimary hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {loading ? <Loader /> : "Get Started"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 w-full text-center">
        <p className="text-slate-500 text-sm font-medium">
          Already a member?{" "}
          <button
            onClick={toggleSignIn}
            className="text-primary font-black hover:underline pl-1"
          >
            Sign In Here
          </button>
        </p>
      </div>
    </div>
  );
};


export default SignUp;
