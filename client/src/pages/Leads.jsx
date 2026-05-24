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

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Lead Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage client leads and sales opportunities.
          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button className="bg-black text-white p-3 rounded-lg md:col-span-2 hover:bg-gray-800 transition">
          Add Lead
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
          className="w-full bg-white p-4 rounded-2xl shadow border"
        />

      </div>

      {loading && (
        <div className="bg-white rounded-2xl shadow overflow-hidden p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4 animate-pulse border-b pb-4 last:border-b-0 last:pb-0">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>

              <th className="p-4 text-left">
                Client
              </th>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.length === 0 && !loading && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-10 text-gray-500 font-medium"
                >
                  No leads yet. Start by adding your first lead.
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
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOpenModal(lead)}
                >

                  <td className="p-4">
                    {lead.clientName}
                  </td>

                  <td className="p-4">
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
                      className="border px-3 py-2 rounded-lg"
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
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-1">{selectedLead.clientName}</h2>
            <p className="text-sm text-gray-500 mb-6">Added on: {new Date(selectedLead.createdAt).toLocaleDateString()}</p>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" name="company" value={editFormData.company} onChange={handleEditChange} className="w-full border p-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} className="w-full border p-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-full border p-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" value={editFormData.status} onChange={handleEditChange} className="w-full border p-3 rounded-lg">
                  <option>New Lead</option>
                  <option>Contacted</option>
                  <option>Quotation Sent</option>
                  <option>Negotiation</option>
                  <option>Closed Won</option>
                </select>
              </div>
              <button disabled={editLoading} className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 mt-4">
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

    </MainLayout>
  );
}

export default Leads;