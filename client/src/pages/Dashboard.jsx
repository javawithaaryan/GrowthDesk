import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalLeads: 0,
    activeDeals: 0,
    closedDeals: 0,
    revenue: "₹0",
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <div className="w-64 bg-black text-white p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-3xl font-bold mb-10">
            GrowthDesk
          </h1>

          <ul className="space-y-5 text-lg">

            <li>
              <Link
                to="/dashboard"
                className="hover:text-gray-300 transition"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/leads"
                className="hover:text-gray-300 transition"
              >
                Leads
              </Link>
            </li>

            <li>
              <Link
                to="/pipeline"
                className="hover:text-gray-300 transition"
              >
                Pipeline
              </Link>
            </li>

            <li>
              <Link
                to="/reports"
                className="hover:text-gray-300 transition"
              >
                Reports
              </Link>
            </li>

          </ul>

        </div>

        <button
          onClick={logoutHandler}
          className="bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Logout
        </button>

      </div>

      <div className="flex-1 p-10">

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

        <div className="grid grid-cols-4 gap-6">

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

        <div className="bg-white mt-10 p-8 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5">

            <div className="border-l-4 border-black pl-4">
              <p className="font-medium">
                Raj Industries moved to Negotiation stage
              </p>

              <p className="text-sm text-gray-500 mt-1">
                2 hours ago
              </p>
            </div>

            <div className="border-l-4 border-black pl-4">
              <p className="font-medium">
                New lead added from Skyline Manufacturing
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Today
              </p>
            </div>

            <div className="border-l-4 border-black pl-4">
              <p className="font-medium">
                Quotation shared with BuildCraft Ltd
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Yesterday
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;