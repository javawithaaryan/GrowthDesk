import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiBell, FiSettings, FiLogOut, FiSun, FiMoon, FiMenu, FiX,
  FiBarChart2, FiUsers, FiGitBranch, FiPieChart, FiZap
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import logoDark from "../assets/logo/logo-dark.png";

function getUserInfo() {
  try {
    const raw = localStorage.getItem("userInfo");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getInitials(name) {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getUserInfo();

  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const initials = getInitials(userName);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/dashboard", label: "Sales Overview", icon: FiBarChart2 },
    { to: "/leads", label: "Leads", icon: FiUsers },
    { to: "/pipeline", label: "Pipeline", icon: FiGitBranch },
    { to: "/reports", label: "Performance Insights", icon: FiPieChart },
  ];

  const currentPageLabel =
    navLinks.find((n) => isActive(n.to))?.label ||
    (isActive("/ai-assistant") ? "Sales AI Workspace" : isActive("/settings") ? "Settings" : "");

  /* ─── Sidebar inner content ─────────────────────────── */
  const SidebarContent = () => (
    /*
      The sidebar sits on a near-black base. We layer two absolutely-positioned
      soft blobs + a subtle SVG noise filter to create a premium "alive" texture
      without any flashy movement. The blobs animate on a very slow loop.
    */
    <div
      className="relative flex flex-col h-full w-64 py-6 px-4 overflow-hidden"
      style={{ background: "#08090d" }}
    >
      {/* ── Ambient atmosphere blobs ─────────────────────── */}
      <motion.div
        animate={{ opacity: [0.07, 0.12, 0.07], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.04, 0.08, 0.04], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          bottom: "60px",
          left: "-40px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />

      {/* ── SVG Noise overlay (very faint) ─────────────── */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none" }} aria-hidden="true">
        <filter id="sidebar-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sidebar-noise)" />
      </svg>

      {/* ── Logo ─────────────────────────────────────────── */}
      <div className="relative px-2 mb-8 z-10">
        <img
          src={logoDark}
          alt="GrowthDesk"
          className="h-8 object-contain object-left"
          style={{ maxWidth: "160px" }}
          draggable={false}
        />
        <p className="text-[11px] mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
          CRM &amp; Sales Workspace
        </p>
      </div>

      {/* ── Navigation ─────────────────────────────────── */}
      <nav className="relative z-10 flex-1 space-y-0.5">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-widest mb-3"
           style={{ color: "rgba(255,255,255,0.2)" }}>
          Workspace
        </p>

        {navLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={`sidebar-link ${isActive(to) ? "active" : ""}`}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}

        <div className="pt-5 pb-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest mb-3"
             style={{ color: "rgba(255,255,255,0.2)" }}>
            Intelligence
          </p>
        </div>

        <Link
          to="/ai-assistant"
          onClick={() => setSidebarOpen(false)}
          className={`sidebar-link ${isActive("/ai-assistant") ? "active-ai" : ""}`}
        >
          <FiZap size={15} />
          Sales AI Workspace
          <span
            className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(99,102,241,0.25)", color: "#a5b4fc" }}
          >
            AI
          </span>
        </Link>

        <div className="pt-5 pb-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest mb-3"
             style={{ color: "rgba(255,255,255,0.2)" }}>
            Account
          </p>
        </div>

        <Link
          to="/settings"
          onClick={() => setSidebarOpen(false)}
          className={`sidebar-link ${isActive("/settings") ? "active" : ""}`}
        >
          <FiSettings size={15} />
          Settings
        </Link>
      </nav>

      {/* ── User Profile ─────────────────────────────────── */}
      <div className="relative z-10 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl transition-colors cursor-pointer group"
             style={{ transition: "background-color 200ms ease" }}
             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"}
             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
               style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            {initials}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate" style={{ color: "rgba(255,255,255,0.88)" }}>
              {userName}
            </p>
            <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
              {userEmail}
            </p>
          </div>
          <button
            onClick={logoutHandler}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "rgba(255,255,255,0.35)" }}
            title="Sign out"
          >
            <FiLogOut size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2 px-2 mt-2">
          <div className="online-dot" style={{ width: "6px", height: "6px" }}></div>
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>
            Active · Last synced 2m ago
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--surface)" }}>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 md:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed left-0 top-0 h-full z-40 md:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top header */}
        <header
          className="top-header h-14 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-20"
        >
          <div className="flex items-center gap-4">
            <button
              className="md:hidden transition-colors"
              style={{ color: "var(--text-muted)" }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>GrowthDesk</span>
              <span className="text-xs" style={{ color: "var(--border)" }}>/</span>
              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                {currentPageLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status pill */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#16a34a",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-[11px] font-medium">3 follow-ups pending</span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: "var(--text-muted)" }}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--surface)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* Notifications */}
            <button
              className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--surface)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <FiBell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              {initials}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="p-5 md:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;