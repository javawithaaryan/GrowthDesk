import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import { motion } from "framer-motion";
import logoDark from "../assets/logo/logo-dark.png";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Couldn't sign you in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex relative overflow-hidden"
      style={{ background: "#08090d" }}
    >
      {/* ── Animated background atmosphere ──────────────────
          Very slow, very subtle. The user feels depth, not animation.
      ─────────────────────────────────────────────────────── */}

      {/* Blob 1 — top right indigo */}
      <motion.div
        animate={{
          opacity: [0.18, 0.28, 0.18],
          scale: [1, 1.08, 1],
          x: [0, 12, 0],
          y: [0, -8, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-80px",
          right: "10%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #4f46e5 0%, transparent 68%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* Blob 2 — bottom left violet */}
      <motion.div
        animate={{
          opacity: [0.12, 0.2, 0.12],
          scale: [1, 1.06, 1],
          x: [0, -10, 0],
          y: [0, 10, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "5%",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 68%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Blob 3 — centre subtle */}
      <motion.div
        animate={{ opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          top: "35%",
          left: "40%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* SVG noise grain overlay — extremely faint, adds texture depth */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <filter id="login-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#login-noise)" />
      </svg>

      {/* ── Left branding panel ─────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-14 relative z-10">

        {/* Logo */}
        <img
          src={logoDark}
          alt="GrowthDesk"
          className="absolute top-10 left-10 h-11 md:h-12 object-contain opacity-0 animate-fadeIn"
          style={{ maxWidth: "180px" }}
          draggable={false}
        />

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <blockquote
            className="text-lg leading-relaxed max-w-md"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            "The CRM that actually understands how manufacturing sales teams
            work. Our pipeline conversion went up 34% in the first quarter."
          </blockquote>

          <div className="flex items-center gap-3 mt-7">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              RS
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                Rahul Sharma
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Head of Sales, Skyline Manufacturing
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer line — no AI marketing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-2"
          style={{ color: "rgba(255,255,255,0.18)", fontSize: "11px" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          GrowthDesk · CRM for modern sales teams
        </motion.div>
      </div>

      {/* ── Right form panel ─────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img
              src={logoDark}
              alt="GrowthDesk"
              className="h-11 md:h-12 object-contain opacity-0 animate-fadeIn"
              draggable={false}
            />
          </div>

          {/* Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "18px",
              padding: "36px 32px",
            }}
          >
            <div className="mb-7">
              <h1 className="text-2xl font-bold" style={{ color: "#fff" }}>
                Welcome back
              </h1>
              <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                Sign in to your sales workspace.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "11px 16px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 200ms ease, box-shadow 200ms ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366f1";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "11px 16px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 200ms ease, box-shadow 200ms ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366f1";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  borderRadius: "10px",
                  background: loading ? "rgba(99,102,241,0.5)" : "#6366f1",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 200ms ease, transform 150ms ease, box-shadow 200ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#4f46e5";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = loading ? "rgba(99,102,241,0.5)" : "#6366f1";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {loading ? "Signing in..." : "Sign in to GrowthDesk"}
              </button>
            </form>

            <p
              className="mt-6 text-center text-sm"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              New to GrowthDesk?{" "}
              <Link
                to="/register"
                style={{ color: "#818cf8", fontWeight: "600", textDecoration: "none" }}
              >
                Create an account
              </Link>
            </p>
          </div>

          <p
            className="mt-5 text-center text-xs"
            style={{ color: "rgba(255,255,255,0.12)" }}
          >
            Secured with JWT · Data encrypted at rest
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;