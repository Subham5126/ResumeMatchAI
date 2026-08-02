import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import ChatWindow from "./ChatWindow";

export default function ChatBot({ analysis }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <ChatWindow
            analysis={analysis}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-2xl shadow-indigo-600/40 transition hover:bg-indigo-500 active:scale-95"
      >
        <MessageCircle size={18} className="text-amber-300" />
        <span>Ask Copilot AI</span>
      </motion.button>
    </>
  );
}