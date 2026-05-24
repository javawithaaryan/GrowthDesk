import { useState } from "react";
import { motion } from "framer-motion";
import { FiZap, FiCopy, FiCheck } from "react-icons/fi";
import api from "../services/api";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

const quickActions = [
  { label: "Draft Follow-Up", type: "follow-up", sample: "Draft a follow-up email for a manufacturing client who asked for a quote last week. Keep it professional and warm." },
  { label: "Cold Outreach", type: "cold-outreach", sample: "Write a concise cold email to the head of procurement at a mid-sized factory. Focus on efficiency and ROI." },
  { label: "Sales Strategy", type: "strategy", sample: "Suggest a closing strategy for a hesitant B2B manufacturing client who is comparing us with a competitor." },
  { label: "Negotiation Help", type: "negotiation", sample: "How do I professionally respond to a client asking for a 20% discount on a ₹40,000 deal?" },
];

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("general");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleQuickAction = (action) => {
    setPrompt(action.sample);
    setActiveType(action.type);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) { toast.error("Please enter a prompt."); return; }
    setLoading(true);
    setResponse("");
    try {
      const res = await api.post("/api/ai/generate", { prompt, type: activeType });
      setResponse(res.data.result);
      setHistory(prev => [{ prompt, response: res.data.result, type: activeType, time: new Date() }, ...prev].slice(0, 8));
      toast.success("Response generated.");
    } catch (error) {
      toast.error(error.response?.data?.message || "AI temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    toast.success("Copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  const timeAgo = (date) => {
    const m = Math.floor((Date.now() - date) / 60000);
    if (m < 1) return "just now";
    if (m === 1) return "1 min ago";
    if (m < 60) return `${m} mins ago`;
    return `${Math.floor(m / 60)}h ago`;
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2.5" style={{ color: "var(--text-primary)" }}>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <FiZap size={16} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            Sales AI Workspace
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "var(--text-muted)" }}>
            Gemini-powered drafting · AI suggestions enabled · Tone: Professional
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
             style={{ backgroundColor: "rgba(99,102,241,0.08)", color: "var(--accent)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
          Gemini AI Connected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Quick Actions Panel */}
        <div className="lg:col-span-1">
          <div className="card p-5 mb-5">
            <h2 className="font-bold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Quick Templates</h2>
            <div className="space-y-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(action)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                  style={{
                    backgroundColor: activeType === action.type ? "rgba(99,102,241,0.1)" : "var(--surface)",
                    color: activeType === action.type ? "var(--accent)" : "var(--text-primary)",
                    border: `1px solid ${activeType === action.type ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
                  }}
                >
                  {action.label}
                </button>
              ))}
              <button
                onClick={() => { setPrompt(""); setActiveType("general"); }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: activeType === "general" ? "rgba(99,102,241,0.1)" : "var(--surface)",
                  color: activeType === "general" ? "var(--accent)" : "var(--text-muted)",
                  border: `1px solid ${activeType === "general" ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
                }}
              >
                General Question
              </button>
            </div>
          </div>

          {/* Recent history */}
          {history.length > 0 && (
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Recent Workspace Activity</h2>
              <div className="space-y-3">
                {history.slice(0, 3).map((item, i) => (
                  <div key={i} className="p-3 rounded-xl cursor-pointer" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                       onClick={() => { setPrompt(item.prompt); setResponse(item.response); setActiveType(item.type); }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "var(--accent)" }}>
                        {item.type}
                      </span>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{timeAgo(item.time)}</span>
                    </div>
                    <p className="text-xs font-medium line-clamp-2" style={{ color: "var(--text-primary)" }}>{item.prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Workspace */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-6">
            <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
              Your prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt or pick a quick template from the left panel..."
              className="input-field resize-none"
              rows={5}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Press ⌘+Enter to generate</p>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary"
              >
                <FiZap size={14} />
                {loading ? "Generating..." : "Generate with AI"}
              </button>
            </div>
          </div>

          {/* Response */}
          {(loading || response) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <FiZap size={12} className="text-indigo-500" />
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>AI Response</h3>
                </div>
                {response && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    style={{ color: "var(--text-muted)", backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
                    {copied ? "Copied!" : "Copy text"}
                  </button>
                )}
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-4 rounded" style={{ width: `${85 - i * 8}%` }}></div>
                  ))}
                </div>
              ) : (
                <div
                  className="text-sm leading-relaxed whitespace-pre-wrap rounded-xl p-4"
                  style={{
                    color: "var(--text-primary)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    fontFamily: "inherit"
                  }}
                >
                  {response}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default AIAssistant;
