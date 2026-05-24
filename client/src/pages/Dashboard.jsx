import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import SalesChart from "../components/SalesChart";
import ActivityTimeline from "../components/ActivityTimeline";
import TeamCollaboration from "../components/TeamCollaboration";
import { FiTrendingUp, FiActivity, FiCheckSquare, FiDollarSign } from "react-icons/fi";

function getUserInfo() {
  try {
    return JSON.parse(localStorage.getItem("userInfo")) || {};
  } catch { return {}; }
}

const statConfigs = [
  { key: "totalLeads", label: "Total Leads", sub: "Active in pipeline", icon: FiActivity, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { key: "activeDeals", label: "Active Deals", sub: "In negotiation or later", icon: FiTrendingUp, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
  { key: "closedDeals", label: "Closed Won", sub: "This quarter", icon: FiCheckSquare, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  { key: "revenue", label: "Revenue", sub: "Estimated closed value", icon: FiDollarSign, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-900/20" },
];

function SkeletonCard() {
  return (
    <div className="stat-card">
      <div className="skeleton h-3 w-1/2 mb-4 rounded"></div>
      <div className="skeleton h-8 w-1/3 rounded"></div>
    </div>
  );
}

function StatCard({ config, value, index }) {
  const Icon = config.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
      className="stat-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{config.label}</p>
          <p className="text-3xl font-bold mt-2 tracking-tight" style={{ color: "var(--text-primary)" }}>{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bg}`}>
          <Icon size={18} className={config.color} />
        </div>
      </div>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{config.sub}</p>
    </motion.div>
  );
}

function Dashboard() {
  const user = getUserInfo();
  const firstName = user?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const [stats, setStats] = useState({ totalLeads: 0, activeDeals: 0, closedDeals: 0, revenue: "₹0" });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, leadsRes] = await Promise.all([
          api.get("/api/dashboard"),
          api.get("/api/leads"),
        ]);
        setStats(statsRes.data);
        setRecentLeads(leadsRes.data.slice(0, 5));
      } catch {
        // silently fail, keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const now = new Date();
  const lastSync = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {greeting}, {firstName} 👋
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "var(--text-muted)" }}>
            Here's what's happening with your pipeline today. Last updated at {lastSync}.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border"
             style={{ color: "var(--text-muted)", borderColor: "var(--border)", backgroundColor: "var(--surface-card)" }}>
          <div className="online-dot"></div>
          AI suggestions active
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : statConfigs.map((cfg, i) => (
              <StatCard key={cfg.key} config={cfg} value={stats[cfg.key]} index={i} />
            ))
        }
      </div>

      {/* Empty state */}
      {!loading && stats.totalLeads === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-10 text-center mb-8"
        >
          <div className="text-4xl mb-3">📭</div>
          <h3 className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>Your pipeline is empty</h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            You haven't added any leads yet. Head to <strong>Leads</strong> to create your first client entry.
          </p>
        </motion.div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: Charts + Activity */}
        <div className="lg:col-span-2 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <SalesChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Recent Activity</h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Updated after latest lead activity</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                Today
              </span>
            </div>
            <ActivityTimeline />
          </motion.div>
        </div>

        {/* Right: Recent Leads + Team */}
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Recent Leads</h2>
              <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>View all →</span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
                    <div className="skeleton h-3.5 w-3/4 rounded mb-2"></div>
                    <div className="skeleton h-3 w-1/2 rounded"></div>
                  </div>
                ))}
              </div>
            ) : recentLeads.length > 0 ? (
              <div className="space-y-1">
                {recentLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="flex items-center gap-3 px-2 py-3 rounded-xl transition-colors cursor-pointer"
                    style={{ borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold flex-shrink-0">
                      {lead.clientName?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{lead.clientName}</p>
                      <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{lead.company}</p>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: lead.status === "Closed Won" ? "rgba(34,197,94,0.1)" : "rgba(99,102,241,0.1)",
                        color: lead.status === "Closed Won" ? "#16a34a" : "#6366f1",
                      }}
                    >
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-2xl mb-2">🌱</p>
                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>No leads yet</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                  Add your first lead to get started
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Sales Team</h2>
              <div className="flex items-center gap-1.5">
                <div className="online-dot"></div>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>2 online</span>
              </div>
            </div>
            <TeamCollaboration />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;