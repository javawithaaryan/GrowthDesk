import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

function Pipeline() {

  const [leads, setLeads] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const fetchLeads = async () => {

    try {

      const response = await api.get("/api/leads");

      setLeads(response.data);

    } catch (error) {
      toast.error("Failed to fetch leads");
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

  const statusColors = {
    "New Lead": "bg-blue-100 text-blue-700",
    "Contacted": "bg-purple-100 text-purple-700",
    "Quotation Sent": "bg-yellow-100 text-yellow-700",
    "Negotiation": "bg-orange-100 text-orange-700",
    "Closed Won": "bg-green-100 text-green-700",
  };

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold dark:text-white">
            Sales Pipeline
          </h1>

          <p className="text-gray-500 mt-2 dark:text-gray-400">
            Track sales stages and client progress visually.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {columns.map((status, index) => {
          const columnLeads = leads.filter((lead) => lead.status === status);
          return (
            <div
              key={index}
              className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 min-h-[500px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusColors[status].split(' ')[0].replace('100', '500').replace('bg-', 'bg-')}`}></span>
                  {status}
                </h2>
                <span className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded-full">
                  {columnLeads.length}
                </span>
              </div>

              <div className="space-y-4 flex-1">
                {columnLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-600 hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-gray-800 dark:text-gray-100">{lead.clientName}</p>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColors[status].replace('bg-', 'bg-').replace('text-', 'text-')} dark:bg-opacity-20`}>
                        {status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{lead.company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center gap-1">
                      ✉ {lead.email}
                    </p>
                    {lead.createdAt && (
                      <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-3 text-right">
                        Added: {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
                {columnLeads.length === 0 && (
                  <div className="text-center p-4 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl text-gray-400 dark:text-slate-500 text-sm">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </MainLayout>
  );
}

export default Pipeline;