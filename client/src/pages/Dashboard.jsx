import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [stats, setStats] = useState({
    totalLeads: 0,
    activeDeals: 0,
    closedDeals: 0,
    revenue: "₹0",
  });

  const fetchStats = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/dashboard"
    );

    setStats(response.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <div className="w-64 bg-black text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          GrowthDesk
        </h1>

        <ul className="space-y-4">

          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/leads">
              Leads
            </Link>
          </li>

          <li>
            <Link to="/pipeline">
              Pipeline
            </Link>
          </li>

          <li>
            Reports
          </li>

        </ul>

      </div>

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Total Leads
            </h2>

            <p className="text-3xl font-bold mt-2">
              {stats.totalLeads}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Active Deals
            </h2>

            <p className="text-3xl font-bold mt-2">
              {stats.activeDeals}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Closed Deals
            </h2>

            <p className="text-3xl font-bold mt-2">
              {stats.closedDeals}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Revenue
            </h2>

            <p className="text-3xl font-bold mt-2">
              {stats.revenue}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;