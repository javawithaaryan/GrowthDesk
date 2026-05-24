import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import SalesChart from "../components/SalesChart";
import ConversionChart from "../components/ConversionChart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FiDownload, FiTrendingUp, FiPercent, FiCheckCircle, FiClock } from "react-icons/fi";

const reports = [
  { company: "Raj Industries", status: "Closed Won", revenue: "₹45,000", date: "18 May", rep: "Arjun M." },
  { company: "Skyline Manufacturing", status: "Negotiation", revenue: "₹18,000", date: "15 May", rep: "Priya K." },
  { company: "BuildCraft Ltd", status: "Quotation Sent", revenue: "₹12,000", date: "10 May", rep: "Sneha R." },
  { company: "Vertex Corp", status: "Contacted", revenue: "₹8,500", date: "6 May", rep: "Arjun M." },
];

const STATUS_COLORS = {
  "Closed Won":     { bg: "rgba(34,197,94,0.1)",  text: "#16a34a" },
  "Negotiation":    { bg: "rgba(249,115,22,0.1)",  text: "#ea580c" },
  "Quotation Sent": { bg: "rgba(234,179,8,0.1)",   text: "#ca8a04" },
  "Contacted":      { bg: "rgba(168,85,247,0.1)",  text: "#a855f7" },
};

const metrics = [
  { label: "Monthly Revenue", value: "₹2.4L", sub: "+18% vs last month", icon: FiTrendingUp, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
  { label: "Conversion Rate", value: "68%", sub: "Up 4% this quarter", icon: FiPercent, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  { label: "Deals Closed", value: "24", sub: "This quarter", icon: FiCheckCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { label: "Avg. Deal Time", value: "18 days", sub: "Down from 23 days", icon: FiClock, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-900/20" },
];

function Reports() {
  const handleExportPDF = async () => {
    const input = document.getElementById("report-content");
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("performance_insights.pdf");
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Performance Insights</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Business performance · Weekly conversion rate increased · Updated after latest lead activity
          </p>
        </div>
        <button onClick={handleExportPDF} className="btn-primary text-sm">
          <FiDownload size={14} /> Export Report (PDF)
        </button>
      </div>

      <div id="report-content" className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="stat-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${m.bg}`}>
                    <Icon size={16} className={m.color} />
                  </div>
                </div>
                <p className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{m.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>{m.label}</p>
                <p className="text-xs mt-1 text-emerald-600 dark:text-emerald-400">{m.sub}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SalesChart />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ConversionChart />
          </motion.div>
        </div>

        {/* Deal Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card overflow-hidden"
        >
          <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <h2 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Recent Deal Performance</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Manually curated · Updated {new Date().toLocaleDateString()}</p>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Rep</th>
                <th>Deal Status</th>
                <th>Date</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => {
                const sc = STATUS_COLORS[r.status] || { bg: "rgba(156,163,175,0.1)", text: "#6b7280" };
                return (
                  <tr key={i}>
                    <td className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{r.company}</td>
                    <td className="text-sm" style={{ color: "var(--text-muted)" }}>{r.rep}</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: sc.bg, color: sc.text }}>
                        {r.status}
                      </span>
                    </td>
                    <td className="text-xs" style={{ color: "var(--text-muted)" }}>{r.date}</td>
                    <td className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{r.revenue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </MainLayout>
  );
}

export default Reports;