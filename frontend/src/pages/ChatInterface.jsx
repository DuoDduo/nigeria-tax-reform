// src/pages/ChatInterface.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Overview from "../components/sections/Overview";
import Bills from "../components/sections/Bills";
import FAQ from "../components/sections/FAQ";
// import ImpactRoadmap from '../components/sections/ImpactRoadmap'


import { useAuth } from "../auth/AuthContext";
import { checkHealth } from "../api/chatAPI";

const ChatInterface = () => {
  const [systemStatus, setSystemStatus] = useState("checking");
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  // Check system health on mount
  useEffect(() => {
    const checkSystemHealth = async () => {
      try {
        const health = await checkHealth();
        setSystemStatus(health.status);
      } catch (err) {
        console.error("Health check failed:", err);
        setSystemStatus("error");
      }
    };
    checkSystemHealth();
  }, []);

  // Navigate to chat page
  const handleOpenChat = () => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header onOpenChat={handleOpenChat} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenChat={handleOpenChat} />
        <Overview />
        <Bills />
        <FAQ onOpenChat={handleOpenChat} />
        {/* <ImpactRoadmap /> */}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Chat Button */}
      {systemStatus === "healthy" && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-40 flex items-center gap-2 group"
          aria-label="Ask AI Assistant"
        >
          <Bot className="w-6 h-6" />
          <span className="hidden md:inline font-semibold pr-2 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 whitespace-nowrap">
            Ask AI
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatInterface;
