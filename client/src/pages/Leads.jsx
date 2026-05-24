import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

function Leads() {

  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    clientName: "",
    company: "",
    email: "",
    phone: "",
  });

  const [selectedLead, setSelectedLead] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    company: "",
    email: "",
    phone: "",
    status: "",
  });

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const fetchLeads = async () => {

    try {

      setLoading(true);

      const response = await api.get("/api/leads");

      setLeads(response.data);

      setError("");

    } catch (error) {

      setError("Failed to fetch leads");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/api/leads", formData);

      setFormData({
        clientName: "",
        company: "",
        email: "",
        phone: "",
      });

      fetchLeads();

    } catch (error) {
      toast.error("Failed to add lead");
    }
  };

  const deleteLead = async (id) => {

    try {

      await api.delete(`/api/leads/${id}`);
      toast.success("Lead deleted");
      fetchLeads();
    } catch (error) {
      toast.error("Failed to delete lead");
    }
  };

  const handleOpenModal = (lead) => {
    setSelectedLead(lead);
    setEditFormData({
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
    });
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setEditLoading(true);
      await api.put(`/api/leads/${selectedLead._id}`, editFormData);
      toast.success("Lead updated successfully");
      fetchLeads();
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update lead");
    } finally {
      setEditLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("No leads to export.");
      return;
    }
    
    const headers = ["Client Name", "Company", "Email", "Phone", "Status", "Added On"];
    const csvRows = [
      headers.join(","),
      ...leads.map(lead => [
        `"${lead.clientName}"`,
        `"${lead.company}"`,
        `"${lead.email}"`,
        `"${lead.phone}"`,
        `"${lead.status}"`,
        `"${new Date(lead.createdAt).toLocaleDateString()}"`
      ].join(","))
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "growthdesk_leads.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold dark:text-white">
            Lead Management
          </h1>

          <p className="text-gray-500 mt-2 dark:text-gray-400">
            Manage client leads and sales opportunities.
          </p>

        </div>
        
        <button 
          onClick={handleExportCSV}
          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition flex items-center gap-2 shadow-sm"
        >
          Export CSV
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          className="border border-gray-200 dark:border-slate-600 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white transition-colors"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="border border-gray-200 dark:border-slate-600 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white transition-colors"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-200 dark:border-slate-600 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white transition-colors"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-200 dark:border-slate-600 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white transition-colors"
        />

        <button className="bg-black dark:bg-indigo-600 text-white p-3 rounded-xl md:col-span-2 hover:bg-gray-800 dark:hover:bg-indigo-700 transition font-semibold">
          Add New Lead
        </button>

      </form>

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-colors"
        />

      </div>

      {loading && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4 animate-pulse border-b dark:border-slate-700 pb-4 last:border-b-0 last:pb-0">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">

            <tr>

              <th className="p-4 text-left font-medium">
                Client
              </th>

              <th className="p-4 text-left font-medium">
                Company
              </th>

              <th className="p-4 text-left font-medium">
                Status
              </th>

              <th className="p-4 text-left font-medium">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.length === 0 && !loading && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-12 text-gray-500 dark:text-gray-400 font-medium"
                >
                  Your pipeline is empty. Add your first lead to start tracking opportunities.
                </td>
              </tr>
            )}

            {leads
              .filter((lead) =>
                lead.clientName
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((lead) => (

                <tr
                  key={lead._id}
                  className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                  onClick={() => handleOpenModal(lead)}
                >

                  <td className="p-4 font-semibold text-gray-900 dark:text-white">
                    {lead.clientName}
                  </td>

                  <td className="p-4 text-gray-500 dark:text-gray-400">
                    {lead.company}
                  </td>

                  <td className="p-4">

                    <select
                      value={lead.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={async (e) => {
                        try {
                          await api.put(`/api/leads/${lead._id}`, { status: e.target.value });
                          toast.success("Status updated");
                          fetchLeads();
                        } catch (error) {
                          toast.error("Failed to update status");
                        }

                      }}
                      className="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    >

                      <option>New Lead</option>
                      <option>Contacted</option>
                      <option>Quotation Sent</option>
                      <option>Negotiation</option>
                      <option>Closed Won</option>

                    </select>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLead(lead._id);
                      }}
                      className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-500/20 transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-1 dark:text-white">{selectedLead.clientName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Added on: {new Date(selectedLead.createdAt).toLocaleDateString()}</p>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                <input type="text" name="company" value={editFormData.company} onChange={handleEditChange} className="w-full border border-gray-200 dark:border-slate-600 p-3 rounded-xl dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} className="w-full border border-gray-200 dark:border-slate-600 p-3 rounded-xl dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input type="text" name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-full border border-gray-200 dark:border-slate-600 p-3 rounded-xl dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select name="status" value={editFormData.status} onChange={handleEditChange} className="w-full border border-gray-200 dark:border-slate-600 p-3 rounded-xl dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>New Lead</option>
                  <option>Contacted</option>
                  <option>Quotation Sent</option>
                  <option>Negotiation</option>
                  <option>Closed Won</option>
                </select>
              </div>
              <button disabled={editLoading} className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition font-semibold disabled:opacity-50 mt-4">
                {editLoading ? "Saving Changes..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

    </MainLayout>
  );
}

export default Leads;