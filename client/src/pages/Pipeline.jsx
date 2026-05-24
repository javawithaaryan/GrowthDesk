import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

const COLUMNS = ["New Lead", "Contacted", "Quotation Sent", "Negotiation", "Closed Won"];

const COL_STYLES = {
  "New Lead":       { dot: "#3b82f6", header: "rgba(59,130,246,0.08)" },
  "Contacted":      { dot: "#a855f7", header: "rgba(168,85,247,0.08)" },
  "Quotation Sent": { dot: "#f59e0b", header: "rgba(245,158,11,0.08)" },
  "Negotiation":    { dot: "#f97316", header: "rgba(249,115,22,0.08)" },
  "Closed Won":     { dot: "#22c55e", header: "rgba(34,197,94,0.08)" },
};

function Pipeline() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await api.get("/api/leads");
        setLeads(response.data);
      } catch {
        toast.error("Couldn't load pipeline. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const totalValue = leads.filter(l => l.status === "Closed Won").length;
  const conversionRate = leads.length > 0 ? Math.round((totalValue / leads.length) * 100) : 0;

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Sales Pipeline</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Visual view of all active client deals · {leads.length} total · {conversionRate}% conversion rate
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-xl text-sm font-semibold"
               style={{ backgroundColor: "var(--surface-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card p-4 min-h-[400px]">
              <div className="skeleton h-3 w-2/3 rounded mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="card p-3">
                    <div className="skeleton h-3 w-3/4 rounded mb-2"></div>
                    <div className="skeleton h-2.5 w-1/2 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {COLUMNS.map((status, colIdx) => {
            const colLeads = leads.filter(l => l.status === status);
            const style = COL_STYLES[status];

            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: colIdx * 0.06 }}
                className="card p-4 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div
                  className="flex items-center justify-between mb-4 px-2 py-2 rounded-lg"
                  style={{ backgroundColor: style.header }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: style.dot }}></span>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                      {status}
                    </span>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: style.header, color: style.dot }}
                  >
                    {colLeads.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3 flex-1">
                  {colLeads.map((lead, i) => (
                    <motion.div
                      key={lead._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: colIdx * 0.05 + i * 0.04 }}
                      className="card p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                      style={{ transform: "translateY(0)" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{lead.clientName}</p>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ml-2"
                          style={{ backgroundColor: style.dot + "30", color: style.dot }}
                        >
                          {lead.clientName?.[0]?.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-xs font-medium mb-3" style={{ color: "var(--text-muted)" }}>{lead.company}</p>
                      {lead.email && (
                        <p className="text-[11px] truncate mb-2" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                          ✉ {lead.email}
                        </p>
                      )}
                      {lead.createdAt && (
                        <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                          <p className="text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                            Added {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {colLeads.length === 0 && (
                    <div
                      className="h-24 rounded-xl flex items-center justify-center"
                      style={{ border: "1.5px dashed var(--border)" }}
                    >
                      <p className="text-xs" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                        No leads here
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </MainLayout>
  );
}

export default Pipeline;