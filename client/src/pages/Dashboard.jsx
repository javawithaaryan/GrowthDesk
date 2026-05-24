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

  const fetchStats = async () => {

    try {

      const response = await api.get("/api/dashboard");

      setStats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

      console.log(error);

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

      <div className="mt-10">
        <SalesChart />
      </div>

    </MainLayout>
  );
}

export default Dashboard;