import { Link, useNavigate } from "react-router-dom";

function MainLayout({ children }) {

  const navigate = useNavigate();

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

            <li>
              <Link
                to="/ai-assistant"
                className="hover:text-gray-300 transition flex items-center gap-2 text-indigo-300 font-semibold"
              >
                ✦ AI Assistant
              </Link>
            </li>

          </ul>

        </div>

        <div>

          <button
            onClick={logoutHandler}
            className="bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition w-full"
          >
            Logout
          </button>

          <p className="text-xs text-gray-400 mt-6 text-center">
            GrowthDesk CRM v1.0
          </p>

        </div>

      </div>

      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
}

export default MainLayout;