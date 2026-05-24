import { useEffect, useState } from "react";
import api from "../services/api";

import MainLayout from "../layouts/MainLayout";
import SalesChart from "../components/SalesChart";
import ActivityTimeline from "../components/ActivityTimeline";
import TeamCollaboration from "../components/TeamCollaboration";

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

          <h1 className="text-4xl font-bold dark:text-white">
            Sales Overview
          </h1>

          <p className="text-gray-500 mt-2 dark:text-gray-400">
            Monitor sales activity and lead performance.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 animate-pulse">
            Fetching latest sales activity...
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Leads</h2>
              <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">{stats.totalLeads}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Deals</h2>
              <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">{stats.activeDeals}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Closed Deals</h2>
              <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">{stats.closedDeals}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Revenue</h2>
              <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">{stats.revenue}</p>
            </div>
          </>
        )}
      </div>

      {!loading && stats.totalLeads === 0 && (
        <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mt-6 text-center text-gray-500 dark:text-gray-400">
          You haven't added any leads yet. Start by creating your first client entry.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Revenue Progression</h2>
            <SalesChart />
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Recent Activity</h2>
            <ActivityTimeline />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Recent Leads</h2>
            {loading ? (
               <div className="space-y-4">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="animate-pulse flex flex-col gap-2 border-b dark:border-slate-700 pb-3">
                     <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                     <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
                   </div>
                 ))}
               </div>
            ) : recentLeads.length > 0 ? (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead._id} className="border-b dark:border-slate-700 pb-3 last:border-0 last:pb-0">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{lead.clientName}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{lead.company}</span>
                      <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{lead.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No recent leads found.</p>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Sales Team</h2>
            <TeamCollaboration />
          </div>
        </div>
      </div>

    </MainLayout>
  );
}

export default Dashboard;