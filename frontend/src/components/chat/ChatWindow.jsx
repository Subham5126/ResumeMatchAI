import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Bot, Send } from "lucide-react";

import api from "../../services/api";

export default function ChatWindow({ onClose, analysis }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi 👋 I'm your AI Career Coach.\n\nI can help you improve your resume, explain your ATS score, prepare for interviews, rewrite resume sections, generate learning roadmaps, and answer career questions.\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Personalized suggestions if analysis available, otherwise generic
  const suggestions = analysis
    ? [
        `Why did I score ${Math.round(analysis.overall_score ?? 0)}% overall?`,
        analysis.keyword_analysis?.missing_skills?.length
          ? `How do I add "${analysis.keyword_analysis.missing_skills[0]}" to my resume?`
          : "What keywords should I add to my resume?",
        `How can I improve my ATS score of ${Math.round(analysis.ats_report?.ats_score ?? 0)}%?`,
        "Suggest interview questions for this role",
      ]
    : [
        "What is ATS and how does it work?",
        "How can I improve my resume?",
        "What skills are in demand for software engineers?",
        "What should I learn first to get hired faster?",
      ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Keywords that indicate the user needs analysis data to answer
  const analysisKeywords = [
    "ats score", "my score", "my resume", "my result", "my analysis",
    "missing keyword", "matched skill", "vector match", "skill gap",
    "why is my", "improve my resume", "rewrite my", "my ats", "my match",
    "my skill", "my job", "my application", "my cover letter",
  ];

  const needsAnalysis = (text) => {
    const lower = text.toLowerCase();
    return analysisKeywords.some((kw) => lower.includes(kw));
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const question = input;

    // Only block if the question is specifically about their analysis results
    if (!analysis && needsAnalysis(question)) {
      const gateMessage = {
        id: Date.now(),
        role: "assistant",
        content:
          "It looks like you're asking about your resume analysis results. Please run an analysis first by uploading your resume and job description above — then I can give you personalised insights! 🚀",
        timestamp: new Date(),
      };
      setMessages((prev) => [
        ...prev,
        { id: Date.now() - 1, role: "user", content: question, timestamp: new Date() },
        gateMessage,
      ]);
      setInput("");
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setInput("");

    const history = updatedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
    }));

    setLoading(true);

    try {
      const response = await api.post("/chat", {
        question,
        analysis: analysis || {},
        history,
      });

      const aiReply = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error(error);

      const aiReply = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "Sorry, I couldn't connect to the AI assistant. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (question) => {
    setInput(question);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-20 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 text-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white">
              Resume Copilot AI
            </h2>
            <p className="text-[10px] text-slate-400">
              AI Career Assistant
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-850 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-slate-950/80 p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                message.role === "assistant"
                  ? "border border-slate-800 bg-slate-900 text-slate-200"
                  : "bg-indigo-600 font-medium text-white shadow-md shadow-indigo-600/30"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="mt-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Suggested Prompts
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSuggestion(item)}
                  className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:border-indigo-500/40 hover:bg-slate-850 hover:text-white transition-colors text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-slate-800 bg-slate-950 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            placeholder="Ask Copilot AI..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-3.5 text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}