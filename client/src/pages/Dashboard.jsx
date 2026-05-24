import { useEffect, useState } from "react";
import api from "../services/api";

import MainLayout from "../layouts/MainLayout";
import SalesChart from "../components/SalesChart";

function Dashboard() {

  const [stats, setStats] = useState({
    totalLeads: 0,
    activeDeals: 0,
    closedDeals: 0,
    revenue: "₹0",
  });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState([]);

  const fetchStats = async () => {
    try {
      const [statsRes, leadsRes] = await Promise.all([
        api.get("/api/dashboard"),
        api.get("/api/leads")
      ]);
      setStats(statsRes.data);
      setRecentLeads(leadsRes.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Dashboard Overview
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor sales activity and lead performance.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))
        ) : (
          <>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-gray-500 text-sm">Total Leads</h2>
              <p className="text-4xl font-bold mt-3">{stats.totalLeads}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-gray-500 text-sm">Active Deals</h2>
              <p className="text-4xl font-bold mt-3">{stats.activeDeals}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-gray-500 text-sm">Closed Deals</h2>
              <p className="text-4xl font-bold mt-3">{stats.closedDeals}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-gray-500 text-sm">Revenue</h2>
              <p className="text-4xl font-bold mt-3">{stats.revenue}</p>
            </div>
          </>
        )}
      </div>

      {!loading && stats.totalLeads === 0 && (
        <div className="bg-white p-10 rounded-2xl shadow mt-6 text-center text-gray-500">
          No leads yet. Start by adding your first lead to see statistics.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Recent Leads</h2>
          {loading ? (
             <div className="space-y-4">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="animate-pulse flex flex-col gap-2 border-b pb-3">
                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                   <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                 </div>
               ))}
             </div>
          ) : recentLeads.length > 0 ? (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead._id} className="border-b pb-3 last:border-0 last:pb-0">
                  <p className="font-semibold text-gray-800">{lead.clientName}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500">{lead.company}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{lead.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent leads found.</p>
          )}
        </div>
      </div>

    </MainLayout>
  );
}

export default Dashboard;