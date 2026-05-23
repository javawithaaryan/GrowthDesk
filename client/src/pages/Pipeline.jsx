import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";

function Pipeline() {

  const [leads, setLeads] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const fetchLeads = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/leads",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setLeads(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const columns = [
    "New Lead",
    "Contacted",
    "Quotation Sent",
    "Negotiation",
    "Closed Won",
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Sales Pipeline
          </h1>

          <p className="text-gray-500 mt-2">
            Track sales stages and client progress.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-5 gap-6">

        {columns.map((status, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 min-h-[500px]"
          >

            <h2 className="text-lg font-bold mb-6">
              {status}
            </h2>

            <div className="space-y-4">

              {leads
                .filter(
                  (lead) => lead.status === status
                )
                .map((lead) => (

                  <div
                    key={lead._id}
                    className="bg-gray-100 p-4 rounded-xl shadow-sm hover:bg-gray-200 transition"
                  >

                    <p className="font-semibold">
                      {lead.clientName}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {lead.company}
                    </p>

                    <p className="text-xs text-gray-500 mt-3">
                      {lead.email}
                    </p>

                  </div>

                ))}

            </div>

          </div>

        ))}

      </div>

    </MainLayout>
  );
}

export default Pipeline;