import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("general");
  const [history, setHistory] = useState([]);

  const quickActions = [
    { label: "Generate Follow-Up", type: "follow-up", sample: "Draft a follow-up email for a client who asked for a quote last week." },
    { label: "Sales Strategy", type: "strategy", sample: "Suggest a strategy to close a deal with a hesitant manufacturing client." },
    { label: "Cold Outreach", type: "cold-outreach", sample: "Write a cold email to the head of procurement at a mid-sized factory." },
    { label: "Negotiation Help", type: "negotiation", sample: "How do I respond to a client asking for a 20% discount?" },
  ];

  const handleQuickAction = (action) => {
    setPrompt(action.sample);
    setActiveType(action.type);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await api.post("/api/ai/generate", { prompt, type: activeType });
      const generatedText = res.data.result;
      setResponse(generatedText);
      setHistory([{ prompt, response: generatedText, type: activeType }, ...history]);
      toast.success("AI response generated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate AI response.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold dark:text-white">Sales AI Workspace</h1>
          <p className="text-gray-500 mt-2 dark:text-gray-400">Generate emails, sales strategies, and negotiation tactics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 h-fit">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className={`p-3 text-left rounded-xl transition font-medium ${activeType === action.type ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none" : "bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200"}`}
              >
                {action.label}
              </button>
            ))}
            <button
                onClick={() => {setPrompt(""); setActiveType("general");}}
                className={`p-3 text-left rounded-xl transition font-medium ${activeType === "general" ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none" : "bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200"}`}
              >
                General Question
              </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here or select a quick action..."
            className="w-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-4 rounded-xl min-h-[150px] mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          ></textarea>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 self-start shadow-sm"
          >
            {loading ? "Generating Output..." : "Generate with AI"}
          </button>

          {response && (
            <div className="mt-8 border-t border-gray-100 dark:border-slate-700 pt-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg dark:text-white">Workspace Response</h3>
                <button
                  onClick={copyToClipboard}
                  className="text-sm font-medium bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
                >
                  Copy Text
                </button>
              </div>
              <div className="bg-indigo-50/50 dark:bg-slate-700/50 p-5 rounded-xl whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed border border-indigo-100 dark:border-slate-600">
                {response}
              </div>
            </div>
          )}
          
          {history.length > 0 && (
            <div className="mt-8 border-t border-gray-100 dark:border-slate-700 pt-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Recent Activity</h3>
              <div className="space-y-4">
                {history.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600 rounded-xl p-5 transition">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                      <span className="uppercase text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full mr-3">{item.type}</span>
                      {item.prompt}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {item.response}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default AIAssistant;
