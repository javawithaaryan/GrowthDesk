import { useEffect, useState } from "react";
import axios from "axios";

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

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const fetchLeads = async () => {

  try {

    setLoading(true);

    const response = await axios.get(
      "http://localhost:5000/api/leads",
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

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

      await axios.post(
        "http://localhost:5000/api/leads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setFormData({
        clientName: "",
        company: "",
        email: "",
        phone: "",
      });

      fetchLeads();

    } catch (error) {

      console.log(error);

    }
  };

  const deleteLead = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchLeads();

    } catch (error) {

      console.log(error);

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

        <button className="bg-black text-white p-3 rounded-lg col-span-2 hover:bg-gray-800 transition">
          Add Lead
        </button>

      </form>

      {loading && (
  <div className="bg-white p-6 rounded-2xl shadow mb-6">
    Loading leads...
  </div>
)}

{error && (
  <div className="bg-red-100 text-red-600 p-4 rounded-2xl mb-6">
    {error}
  </div>
)}

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
      className="text-center p-10 text-gray-500"
    >
      No leads found. Add your first lead.
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
                className="border-b hover:bg-gray-50"
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
  onChange={async (e) => {

    try {

      await axios.put(
        `http://localhost:5000/api/leads/${lead._id}`,
        {
          status: e.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchLeads();

    } catch (error) {

      console.log(error);

    }

  }}
  className="border px-3 py-2 rounded-lg"
>

  <option>
    New Lead
  </option>

  <option>
    Contacted
  </option>

  <option>
    Quotation Sent
  </option>

  <option>
    Negotiation
  </option>

  <option>
    Closed Won
  </option>

</select>

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteLead(lead._id)
                    }
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

    </MainLayout>
  );
}

export default Leads;