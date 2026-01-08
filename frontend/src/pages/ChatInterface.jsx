import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Overview from "../components/sections/Overview";
import Bills from "../components/sections/Bills";
import FAQ from "../components/sections/FAQ";
import Resources from "../components/sections/Resources";

import ChatModal from "../components/chat/ChatModal";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

import { askPolicyRAG } from "../components/services/ragService"; // fixed path
import { Bot } from "lucide-react";

const ChatInterface = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I’m your Policy Assistant. Ask me anything about Nigerian policies, bills, taxes, or student loans.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // ✅ Handle sending messages safely
  const handleSend = async (text) => {
    if (!text || typeof text !== "string") return; // make sure it's a string

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Only send plain string to API
      const answer = await askPolicyRAG(text);

      const aiMessage = {
        role: "assistant",
        content: answer || "I couldn't find an answer. Try asking differently.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling RAG service:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Sorry, I couldn’t reach the policy server. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <Hero onAskAI={() => setShowChatbot(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4">
        <Overview />
        <Bills />
        <FAQ onAskAI={() => setShowChatbot(true)} />
        <Resources />
      </main>

      <Footer />

      {/* Floating Ask AI Button */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white rounded-full px-5 py-4 shadow-xl flex items-center gap-2 z-50"
        >
          <Bot className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">
            Ask AI Assistant
          </span>
        </button>
      )}

      {/* Chat Modal */}
      <ChatModal isOpen={showChatbot} onClose={() => setShowChatbot(false)}>
        <div className="flex flex-col h-[70vh] w-[90vw] max-w-md">
          <MessageList messages={messages} />

          {loading && (
            <p className="text-sm text-gray-500 px-3 py-2">AI is thinking…</p>
          )}

          <MessageInput
            onSend={(msg) => {
              // Always send string only
              if (typeof msg === "string" && msg.trim() !== "") handleSend(msg.trim());
            }}
          />
        </div>
      </ChatModal>
    </div>
  );
};

export default ChatInterface;
