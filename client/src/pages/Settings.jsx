import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@growthdesk.io",
    role: "Sales Executive"
  });

  const [aiPreferences, setAiPreferences] = useState({
    autoFollowUp: true,
    tone: "Professional"
  });

  return (
    <MainLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold dark:text-white">Account Settings</h1>
        <p className="text-gray-500 mt-2 dark:text-gray-400">Manage your profile, application preferences, and AI features.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Profile Information</h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center text-2xl font-bold">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <button className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-600 transition dark:text-white">
                  Change Avatar
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role (Frontend Mockup)</label>
                <input 
                  type="text" 
                  value={profile.role}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-black dark:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-indigo-700 transition">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Security</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition">
                Update Password
              </button>
            </div>
          </div>

        </div>

        {/* Preferences */}
        <div className="space-y-8">
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Application</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
              </div>
              <button 
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-indigo-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-6 dark:text-white">AI Assistant</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold dark:text-white">Auto-draft Follow-ups</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gemini analyzes lead status changes</p>
                </div>
                <button 
                  onClick={() => setAiPreferences({...aiPreferences, autoFollowUp: !aiPreferences.autoFollowUp})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${aiPreferences.autoFollowUp ? 'bg-indigo-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${aiPreferences.autoFollowUp ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default AI Tone</label>
                <select 
                  value={aiPreferences.tone}
                  onChange={(e) => setAiPreferences({...aiPreferences, tone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-700 dark:text-white"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Persuasive</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Settings;
