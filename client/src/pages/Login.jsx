import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Couldn't sign you in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}>
      
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-14">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-base">G</span>
          </div>
          <span className="text-white font-bold text-xl">GrowthDesk</span>
        </div>

        <div>
          <blockquote className="text-white/60 text-lg leading-relaxed max-w-md">
            "The CRM that actually understands how manufacturing sales teams work. 
            Our pipeline conversion went up 34% in the first quarter."
          </blockquote>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-indigo-400/30 flex items-center justify-center text-white font-bold">
              RS
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Rahul Sharma</p>
              <p className="text-white/40 text-xs">Head of Sales, Skyline Manufacturing</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/20 text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          GrowthDesk · B2B CRM · AI-Powered
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-bold text-xl">GrowthDesk</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">Welcome back</h1>
              <p className="text-white/40 text-sm mt-1.5">Sign in to your sales workspace.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 mt-2"
              >
                {loading ? "Signing in..." : "Sign in to GrowthDesk"}
              </button>
            </form>

            <p className="mt-6 text-center text-white/30 text-sm">
              New to GrowthDesk?{" "}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Create an account
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-white/15 text-xs">
            Secured with JWT · Data encrypted at rest
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;