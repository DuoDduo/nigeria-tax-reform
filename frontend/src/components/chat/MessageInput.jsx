import React, { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed); // always pass string only
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-end p-2 border-t border-gray-200">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask me about policies, taxes, bills…"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
        rows={2}
      />
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="px-4 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <Send className="w-5 h-5" />
        <span className="hidden md:inline">Send</span>
      </button>
    </div>
  );
};

export default MessageInput;
