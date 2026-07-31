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
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-indigo-600 px-5 py-4 text-white shadow-2xl transition hover:bg-indigo-700"
      >
        <MessageCircle size={22} />
        <span className="font-medium">
          Ask Resume AI
        </span>
      </motion.button>
    </>
  );
}