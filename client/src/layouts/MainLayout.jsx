import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiBell, FiSettings, FiLogOut, FiSun, FiMoon, FiMenu, FiX,
  FiBarChart2, FiUsers, FiGitBranch, FiPieChart, FiZap
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

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
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getUserInfo();

  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const userRole = user?.role || "Sales Executive";
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

  const SidebarContent = () => (
    <div className="sidebar flex flex-col h-full w-64 py-6 px-4">
      {/* Logo */}
      <div className="px-2 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">GrowthDesk</span>
        </div>
        <p className="text-xs text-white/30 mt-1.5 pl-0.5">CRM & Sales Workspace</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-3">Workspace</p>

        {navLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={`sidebar-link ${isActive(to) ? "active" : ""}`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}

        <div className="pt-4 pb-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-3">Intelligence</p>
        </div>

        <Link
          to="/ai-assistant"
          onClick={() => setSidebarOpen(false)}
          className={`sidebar-link ${isActive("/ai-assistant") ? "active-ai" : ""}`}
        >
          <FiZap size={16} />
          Sales AI Workspace
          <span className="ml-auto bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">AI</span>
        </Link>

        <div className="pt-4 pb-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-3">Account</p>
        </div>

        <Link
          to="/settings"
          onClick={() => setSidebarOpen(false)}
          className={`sidebar-link ${isActive("/settings") ? "active" : ""}`}
        >
          <FiSettings size={16} />
          Settings
        </Link>
      </nav>

      {/* User Profile */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-white/90 truncate">{userName}</p>
            <p className="text-[11px] text-white/40 truncate">{userEmail || userRole}</p>
          </div>
          <button
            onClick={logoutHandler}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white/80"
            title="Sign out"
          >
            <FiLogOut size={14} />
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-2 mt-2">
          <div className="online-dot flex-shrink-0"></div>
          <span className="text-[11px] text-white/30">Active · Last synced 2m ago</span>
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

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
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

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top Header */}
        <header className="top-header h-14 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-20">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            {/* Breadcrumb-style page indicator */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-xs text-gray-400 dark:text-gray-500">GrowthDesk</span>
              <span className="text-xs text-gray-300 dark:text-gray-600">/</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {navLinks.find(n => isActive(n.to))?.label || 
                  (isActive("/ai-assistant") ? "Sales AI Workspace" : 
                    isActive("/settings") ? "Settings" : "Overview")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status pill */}
            <div className="hidden sm:flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/40 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-[11px] font-medium text-green-700 dark:text-green-400">3 follow-ups pending</span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* Notifications */}
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <FiBell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
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
            transition={{ duration: 0.3, ease: "easeOut" }}
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