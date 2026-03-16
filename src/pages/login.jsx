import { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../Api/ApiRequests"


export const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
const handleLogin = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {

    await loginUser(form)

    navigate("/dashboard");

  } catch (err) {

    setError(
      err.response?.data?.message || "Login failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col font-sans">

      <div className="flex-1 flex items-center justify-center px-4 py-10">

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(30,41,59,0.08)] w-full max-w-[460px] px-12 py-11"
        >

          {/* Heading */}
          <h1 className="text-[28px] font-bold text-slate-900 text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-slate-400 text-sm text-center mb-8">
            Manage your productivity with confidence
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="name@company.com"
                required
                className="w-full pl-11 pr-4 py-[13px] rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">

            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-bold text-blue-600"
              >
                Forgot?
              </button>
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              />

              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-[13px] rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-[14px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-bold flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} />
            {loading ? "Logging in..." : "Secure Login"}
          </button>

          {/* Secure Session Card */}
          <div className="mt-5 flex items-start gap-3 border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
            <ShieldCheck
              size={22}
              className="text-blue-600 flex-shrink-0 mt-0.5"
            />

            <div>
              <p className="text-sm font-semibold text-blue-600 mb-0.5">
                Secure Session
              </p>

              <p className="text-xs text-slate-800 leading-relaxed">
                Your session is protected with end-to-end encryption
                and secure JWT authentication.
              </p>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};