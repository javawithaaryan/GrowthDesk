import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";
import SalesChart from "../components/SalesChart";

function Dashboard() {

  const [stats, setStats] = useState({
    totalLeads: 0,
    activeDeals: 0,
    closedDeals: 0,
    revenue: "₹0",
  });

  const fetchStats = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard`
      );

      setStats(response.data);

    } catch (error) {

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

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-sm">
            Total Leads
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.totalLeads}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-sm">
            Active Deals
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.activeDeals}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-sm">
            Closed Deals
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.closedDeals}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-sm">
            Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.revenue}
          </p>

        </div>

      </div>

      <div className="mt-10">
        <SalesChart />
      </div>

    </MainLayout>
  );
}

export default Dashboard;