import { useEffect, useState } from "react";
import axios from "axios";

function Leads() {
  const [leads, setLeads] = useState([]);

  const [formData, setFormData] = useState({
    clientName: "",
    company: "",
    email: "",
    phone: "",
  });

  const fetchLeads = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/leads"
    );

    setLeads(response.data);
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

    await axios.post(
      "http://localhost:5000/api/leads",
      formData
    );

    setFormData({
      clientName: "",
      company: "",
      email: "",
      phone: "",
    });

    fetchLeads();
  };

  const deleteLead = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/leads/${id}`
    );

    fetchLeads();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Lead Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-8 grid grid-cols-2 gap-4"
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

        <button className="bg-black text-white p-3 rounded-lg col-span-2">
          Add Lead
        </button>
      </form>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b"
              >
                <td className="p-4">
                  {lead.clientName}
                </td>

                <td className="p-4">
                  {lead.company}
                </td>

                <td className="p-4">
                  {lead.status}
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      deleteLead(lead._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Leads;