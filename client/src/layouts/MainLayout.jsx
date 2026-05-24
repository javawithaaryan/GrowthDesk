import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiSettings } from "react-icons/fi";

function MainLayout({ children }) {

  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {

    localStorage.removeItem("userInfo");

    navigate("/");

  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors flex">

      <div className="w-64 bg-black dark:bg-slate-950 text-white p-6 flex flex-col justify-between border-r border-transparent dark:border-slate-800">

        <div>

          <h1 className="text-3xl font-bold mb-10">
            GrowthDesk
          </h1>

          <ul className="space-y-3 text-sm font-medium">

            <li>
              <Link
                to="/dashboard"
                className={`flex items-center px-4 py-3 rounded-xl transition ${isActive('/dashboard') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                Sales Overview
              </Link>
            </li>

            <li>
              <Link
                to="/leads"
                className={`flex items-center px-4 py-3 rounded-xl transition ${isActive('/leads') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                Leads
              </Link>
            </li>

            <li>
              <Link
                to="/pipeline"
                className={`flex items-center px-4 py-3 rounded-xl transition ${isActive('/pipeline') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                Pipeline
              </Link>
            </li>

            <li>
              <Link
                to="/reports"
                className={`flex items-center px-4 py-3 rounded-xl transition ${isActive('/reports') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                Performance Insights
              </Link>
            </li>

            <li>
              <Link
                to="/ai-assistant"
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition ${isActive('/ai-assistant') ? 'bg-indigo-500/20 text-indigo-300' : 'text-indigo-400/70 hover:text-indigo-300 hover:bg-indigo-500/10'}`}
              >
                ✦ Sales AI Workspace
              </Link>
            </li>
            
            <li className="pt-6">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">System</p>
              <Link
                to="/settings"
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition ${isActive('/settings') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <FiSettings /> Settings
              </Link>
            </li>

          </ul>

        </div>

        <div className="space-y-4">
          
          <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
              JD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">John Doe</p>
              <p className="text-xs text-gray-400 truncate">Sales Exec</p>
            </div>
          </div>

          <button
            onClick={logoutHandler}
            className="w-full py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition"
          >
            Sign out
          </button>

        </div>

      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar Simulation */}
        <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 h-16 flex items-center justify-end px-8 shrink-0">
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition">
              <FiBell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer">
              JD
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-10 bg-gray-50 dark:bg-slate-900/50">
          {children}
        </main>
      </div>

    </div>
  );
}

export default MainLayout;