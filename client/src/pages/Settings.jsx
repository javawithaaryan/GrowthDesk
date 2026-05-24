import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiBriefcase, FiShield, FiZap, FiSun, FiMoon, FiCheck } from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import { useTheme } from "../context/ThemeContext";

function getUserInfo() {
  try { return JSON.parse(localStorage.getItem("userInfo")) || {}; } catch { return {}; }
}

function getInitials(name) {
  if (!name) return "U";
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}

function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const rawUser = getUserInfo();

  const [profile, setProfile] = useState({
    name: rawUser?.name || rawUser?.email?.split("@")[0] || "",
    email: rawUser?.email || "",
    role: rawUser?.role || "Sales Executive",
  });

  const [saved, setSaved] = useState(false);

  const [aiPrefs, setAiPrefs] = useState({
    autoFollowUp: true,
    tone: "Professional",
    suggestions: true,
  });

  const initials = getInitials(profile.name);

  const saveProfile = () => {
    // Persist display name locally
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      userInfo.name = profile.name;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Account Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Manage your profile, appearance, and AI workspace preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left — Profile + Security */}
        <div className="lg:col-span-2 space-y-5">

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="card p-6"
          >
            <h2 className="font-bold text-base mb-6" style={{ color: "var(--text-primary)" }}>Profile Information</h2>

            <div className="flex items-center gap-5 mb-7">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
                {initials}
              </div>
              <div>
                <p className="font-bold text-base" style={{ color: "var(--text-primary)" }}>{profile.name || "Your Name"}</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{profile.email}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="online-dot w-1.5 h-1.5"></div>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Active · GrowthDesk CRM</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  <FiUser size={11} /> Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input-field"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  <FiMail size={11} /> Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  <FiBriefcase size={11} /> Role
                </label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="input-field opacity-50 cursor-not-allowed"
                />
                <p className="text-[11px] mt-1.5" style={{ color: "var(--text-muted)" }}>Contact your admin to update your role.</p>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={saveProfile} className="btn-primary">
                {saved ? <><FiCheck size={14} /> Saved!</> : "Save Changes"}
              </button>
            </div>
          </motion.div>

          {/* Security Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FiShield size={16} className="text-indigo-500" />
              <h2 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Security</h2>
            </div>

            <div className="space-y-4">
              {[
                { label: "Current Password", placeholder: "••••••••", type: "password" },
                { label: "New Password", placeholder: "Min 8 characters", type: "password" },
                { label: "Confirm New Password", placeholder: "Repeat new password", type: "password" },
              ].map(({ label, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
                  <input type={type} placeholder={placeholder} className="input-field" />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="btn-secondary">Update Password</button>
            </div>
          </motion.div>
        </div>

        {/* Right — Preferences */}
        <div className="space-y-5">

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="card p-6"
          >
            <h2 className="font-bold text-base mb-5" style={{ color: "var(--text-primary)" }}>Appearance</h2>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                {isDarkMode ? <FiMoon size={15} className="text-indigo-400" /> : <FiSun size={15} className="text-amber-500" />}
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Saved to your browser</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
                style={{ backgroundColor: isDarkMode ? "var(--accent)" : "#d1d5db" }}
              >
                <span
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
                  style={{ transform: isDarkMode ? "translateX(22px)" : "translateX(2px)" }}
                />
              </button>
            </div>
          </motion.div>

          {/* AI Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <FiZap size={15} className="text-indigo-500" />
              <h2 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>AI Workspace</h2>
            </div>

            <div className="space-y-5">
              {/* Toggle: Auto Follow-up */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Auto-draft Follow-ups</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Gemini analyses lead changes</p>
                </div>
                <button
                  onClick={() => setAiPrefs({ ...aiPrefs, autoFollowUp: !aiPrefs.autoFollowUp })}
                  className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
                  style={{ backgroundColor: aiPrefs.autoFollowUp ? "var(--accent)" : "#d1d5db" }}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
                    style={{ transform: aiPrefs.autoFollowUp ? "translateX(22px)" : "translateX(2px)" }}
                  />
                </button>
              </div>

              {/* Toggle: Smart suggestions */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Smart Suggestions</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Context-aware prompts in pipeline</p>
                </div>
                <button
                  onClick={() => setAiPrefs({ ...aiPrefs, suggestions: !aiPrefs.suggestions })}
                  className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
                  style={{ backgroundColor: aiPrefs.suggestions ? "var(--accent)" : "#d1d5db" }}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
                    style={{ transform: aiPrefs.suggestions ? "translateX(22px)" : "translateX(2px)" }}
                  />
                </button>
              </div>

              {/* Tone Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  Default Writing Tone
                </label>
                <select
                  value={aiPrefs.tone}
                  onChange={(e) => setAiPrefs({ ...aiPrefs, tone: e.target.value })}
                  className="input-field"
                >
                  {["Professional", "Friendly", "Persuasive", "Concise", "Urgent"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="card p-6"
          >
            <h2 className="font-bold text-base mb-4" style={{ color: "var(--text-primary)" }}>Account</h2>
            <div className="space-y-2.5 text-sm">
              {[
                { label: "Plan", value: "Starter" },
                { label: "Members", value: "3 seats" },
                { label: "AI Requests", value: "∞ / month" },
                { label: "Version", value: "v1.2.0" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>{label}</span>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;
