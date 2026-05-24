import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import { motion } from "framer-motion";
import logoDark from "../assets/logo/logo-dark.png";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "#08090d" }}
    >
      {/* Ambient blob */}
      <motion.div
        animate={{ opacity: [0.15, 0.22, 0.15], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-100px",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #4f46e5 0%, transparent 68%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 68%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="flex justify-center mb-8">
          <img
            src={logoDark}
            alt="GrowthDesk"
            className="h-8 object-contain"
            draggable={false}
          />
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="text-white/40 text-sm mt-1.5">Join your team's sales workspace.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Work Email</label>
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
                placeholder="Min 8 characters"
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
              {loading ? "Creating account..." : "Get started"}
            </button>
          </form>

          <p className="mt-6 text-center text-white/30 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;