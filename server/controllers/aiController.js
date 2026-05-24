const { GoogleGenAI } = require("@google/genai");

const generateAIResponse = async (req, res) => {
  try {
    const { prompt, type } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "GEMINI_API_KEY is not configured." });
    }

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let systemInstruction = "You are a senior sales assistant and CRM expert. Provide concise, professional, and actionable advice or email drafts for sales teams.";

    if (type === "follow-up") {
      systemInstruction = "You are an expert sales writer. Write a professional, polite, and persuasive follow-up email.";
    } else if (type === "strategy") {
      systemInstruction = "You are a sales strategist. Provide a brief, actionable step-by-step strategy for the given scenario.";
    } else if (type === "cold-outreach") {
      systemInstruction = "You are an expert copywriter. Write a compelling, concise cold outreach email.";
    } else if (type === "negotiation") {
      systemInstruction = "You are a negotiation expert. Provide tactical advice on how to negotiate this deal successfully.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ result: response.text });

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ message: error.message || "Failed to generate AI response." });
  }
};

module.exports = {
  generateAIResponse,
};
