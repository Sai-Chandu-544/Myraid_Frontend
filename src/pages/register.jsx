import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { registerUser } from "../Api/ApiRequests";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Register = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));


  const handleSubmit = async () => {

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {

      setLoading(true);

      const response = await registerUser(form);

      toast.success("Account created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      toast.error(
        error?.response?.data?.message || "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef0f5] flex flex-col font-sans">
      <div className="flex-1 flex items-center justify-center px-4 py-10">

        <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(30,41,59,0.08)] w-full max-w-[460px] px-12 py-11">

          <h1 className="text-[26px] font-bold text-slate-900 text-center mb-2">
            Create your account
          </h1>

          <p className="text-slate-500 text-sm text-center mb-8">
            Join thousands of teams managing tasks efficiently.
          </p>

          {/* Name */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <User size={14} className="text-slate-400" />
              Full Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-[14px] py-[11px] rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-blue-600"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Mail size={14} className="text-slate-400" />
              Email Address
            </label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
              type="email"
              className="w-full px-[14px] py-[11px] rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Lock size={14} className="text-slate-400" />
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="w-full pl-[14px] pr-11 py-[11px] rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full py-[13px] rounded-[9px] text-white text-[15px] font-bold flex items-center justify-center gap-2
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Creating Account..." : "Create Account"}

            {!loading && <ArrowRight size={18} />}
          </button>

        </div>
      </div>
    </div>
  );
};