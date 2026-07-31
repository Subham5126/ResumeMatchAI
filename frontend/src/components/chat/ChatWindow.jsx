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

  const suggestions = [
    "Why is my ATS score low?",
    "How can I improve my resume?",
    "Rewrite my project description",
    "What skills should I learn first?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (!analysis) {
      alert("Please analyze your resume first.");
      return;
    }

    const question = input;

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
      const response = await api.post("/chat/", {
        question,
        analysis,
        history, // We'll replace this with real chat history next
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
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 40,
      }}
      transition={{
        duration: 0.25,
      }}
      className="fixed bottom-24 right-6 z-50 flex h-[650px] w-[400px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
    >
      {/* Header */}

      <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/20 p-2">
            <Bot size={22} />
          </div>

          <div>
            <h2 className="font-semibold">
              AI Career Coach
            </h2>

            <p className="text-xs text-indigo-100">
              Powered by AI
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-white/20"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto bg-slate-50 p-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-3 shadow-sm ${
                message.role === "assistant"
                  ? "rounded-tl-md bg-white text-slate-700"
                  : "rounded-tr-md bg-indigo-600 text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="mb-4 flex justify-start">
            <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                  style={{
                    animationDelay: "0.2s",
                  }}
                ></span>

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                  style={{
                    animationDelay: "0.4s",
                  }}
                ></span>
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Suggested Questions
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    handleSuggestion(item)
                  }
                  className="rounded-full border bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-indigo-500 hover:bg-indigo-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}

      <div className="border-t bg-white p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            placeholder="Ask anything..."
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-5 text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}