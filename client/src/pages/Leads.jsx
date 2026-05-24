import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import { FiDownload, FiPlus, FiSearch, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";

const STATUS_COLORS = {
  "New Lead":       { bg: "rgba(59,130,246,0.1)",  text: "#3b82f6" },
  "Contacted":      { bg: "rgba(168,85,247,0.1)",  text: "#a855f7" },
  "Quotation Sent": { bg: "rgba(234,179,8,0.1)",   text: "#ca8a04" },
  "Negotiation":    { bg: "rgba(249,115,22,0.1)",  text: "#ea580c" },
  "Closed Won":     { bg: "rgba(34,197,94,0.1)",   text: "#16a34a" },
};

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ clientName: "", company: "", email: "", phone: "" });
  const [selectedLead, setSelectedLead] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({ company: "", email: "", phone: "", status: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/leads");
      setLeads(response.data);
      setError("");
    } catch {
      setError("Couldn't load your leads. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/leads", formData);
      setFormData({ clientName: "", company: "", email: "", phone: "" });
      setShowAddForm(false);
      toast.success("Lead added to your pipeline.");
      fetchLeads();
    } catch {
      toast.error("Failed to add lead. Please try again.");
    }
  };

  const deleteLead = async (id) => {
    try {
      await api.delete(`/api/leads/${id}`);
      toast.success("Lead removed.");
      fetchLeads();
    } catch {
      toast.error("Failed to remove lead.");
    }
  };

  const handleOpenModal = (lead) => {
    setSelectedLead(lead);
    setEditFormData({ company: lead.company, email: lead.email, phone: lead.phone, status: lead.status });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setEditLoading(true);
      await api.put(`/api/leads/${selectedLead._id}`, editFormData);
      toast.success("Lead updated.");
      fetchLeads();
      setSelectedLead(null);
    } catch {
      toast.error("Failed to update lead.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) { toast.error("No leads to export."); return; }
    const headers = ["Client Name", "Company", "Email", "Phone", "Status", "Added On"];
    const rows = leads.map(l => [
      `"${l.clientName}"`, `"${l.company}"`, `"${l.email}"`,
      `"${l.phone}"`, `"${l.status}"`, `"${new Date(l.createdAt).toLocaleDateString()}"`
    ].join(","));
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "growthdesk_leads.csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    toast.success("CSV exported.");
  };

  const filtered = leads.filter(l =>
    l.clientName?.toLowerCase().includes(search.toLowerCase()) ||
    l.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Lead Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {leads.length > 0 ? `${leads.length} client leads · ${leads.filter(l => l.status === "Closed Won").length} closed won` : "Manage client leads and sales opportunities."}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="btn-secondary text-sm">
            <FiDownload size={14} /> Export CSV
          </button>
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary text-sm">
            <FiPlus size={14} /> Add Lead
          </button>
        </div>
      </div>

      {/* Add Lead Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-6"
          >
            <form onSubmit={handleSubmit} className="card p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>New Lead Details</h3>
                <button type="button" onClick={() => setShowAddForm(false)} style={{ color: "var(--text-muted)" }}>
                  <FiX size={16} />
                </button>
              </div>
              {[
                { name: "clientName", placeholder: "Client name", type: "text" },
                { name: "company", placeholder: "Company", type: "text" },
                { name: "email", placeholder: "Work email", type: "email" },
                { name: "phone", placeholder: "Phone number", type: "text" },
              ].map(({ name, placeholder, type }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              ))}
              <div className="sm:col-span-2 flex gap-3">
                <button type="submit" className="btn-primary flex-1">Add to Pipeline</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative mb-5">
        <FiSearch size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Search by client name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="skeleton h-4 rounded w-1/4"></div>
                <div className="skeleton h-4 rounded w-1/4"></div>
                <div className="skeleton h-4 rounded w-1/5"></div>
                <div className="skeleton h-4 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Company</th>
                <th>Status</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-14">
                    <div className="text-3xl mb-3">🔍</div>
                    <p className="font-semibold text-sm" style={{ color: "var(--text-muted)" }}>
                      {search ? "No leads match your search." : "Your pipeline is empty. Add your first lead to start tracking opportunities."}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => {
                  const sc = STATUS_COLORS[lead.status] || { bg: "rgba(156,163,175,0.1)", text: "#6b7280" };
                  return (
                    <tr
                      key={lead._id}
                      className="cursor-pointer"
                      onClick={() => handleOpenModal(lead)}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold flex-shrink-0">
                            {lead.clientName?.[0]?.toUpperCase()}
                          </div>
                          <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{lead.clientName}</span>
                        </div>
                      </td>
                      <td className="text-sm" style={{ color: "var(--text-muted)" }}>{lead.company}</td>
                      <td>
                        <select
                          value={lead.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={async (e) => {
                            try {
                              await api.put(`/api/leads/${lead._id}`, { status: e.target.value });
                              toast.success("Status updated.");
                              fetchLeads();
                            } catch { toast.error("Failed to update."); }
                          }}
                          className="text-xs font-bold px-2.5 py-1.5 rounded-full border-0 cursor-pointer outline-none"
                          style={{ backgroundColor: sc.bg, color: sc.text }}
                        >
                          {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </td>
                      <td>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleOpenModal(lead)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                            style={{ color: "var(--text-muted)" }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--surface)"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => deleteLead(lead._id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--surface)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <FiX size={16} />
              </button>

              <div className="mb-6">
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{selectedLead.clientName}</h2>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  Added {new Date(selectedLead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                {[
                  { name: "company", label: "Company", type: "text" },
                  { name: "email", label: "Email address", type: "email" },
                  { name: "phone", label: "Phone number", type: "text" },
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={editFormData[name]}
                      onChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>Pipeline Stage</label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="input-field"
                  >
                    {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={editLoading} className="btn-primary flex-1">
                    {editLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button type="button" onClick={() => setSelectedLead(null)} className="btn-secondary flex-1">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}

export default Leads;