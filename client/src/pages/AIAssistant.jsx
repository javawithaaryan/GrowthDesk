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
          <h1 className="text-4xl font-bold">AI Assistant</h1>
          <p className="text-gray-500 mt-2">Generate emails, strategies, and negotiation tactics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className={`p-3 text-left rounded-lg transition ${activeType === action.type ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 text-black"}`}
              >
                {action.label}
              </button>
            ))}
            <button
                onClick={() => {setPrompt(""); setActiveType("general");}}
                className={`p-3 text-left rounded-lg transition ${activeType === "general" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 text-black"}`}
              >
                General Question
              </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow flex flex-col">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here or select a quick action..."
            className="w-full border p-4 rounded-xl min-h-[150px] mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 self-start"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>

          {response && (
            <div className="mt-8 border-t pt-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Response</h3>
                <button
                  onClick={copyToClipboard}
                  className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
                >
                  Copy Text
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl whitespace-pre-wrap text-gray-800">
                {response}
              </div>
            </div>
          )}
          
          {history.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h3 className="font-bold text-lg mb-4 text-gray-600">Conversation History</h3>
              <div className="space-y-4">
                {history.map((item, index) => (
                  <div key={index} className="bg-white border rounded-xl p-4 shadow-sm">
                    <div className="text-sm font-semibold text-gray-800 mb-1">
                      <span className="uppercase text-[10px] bg-gray-200 px-2 py-0.5 rounded-full mr-2">{item.type}</span>
                      {item.prompt}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-3">
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
