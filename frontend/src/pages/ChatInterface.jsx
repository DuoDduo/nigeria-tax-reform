import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Overview from '../components/sections/Overview';
import Bills from '../components/sections/Bills';
import FAQ from '../components/sections/FAQ';
import Resources from '../components/sections/Resources';
import ChatModal from '../components/chat/ChatModal';
import { checkHealth } from '../api/chatAPI';

const ChatInterface = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [systemStatus, setSystemStatus] = useState('checking');

  // Check system health on mount
  useEffect(() => {
    const checkSystemHealth = async () => {
      try {
        const health = await checkHealth();
        setSystemStatus(health.status);
      } catch (err) {
        console.error('Health check failed:', err);
        setSystemStatus('error');
      }
    };

    checkSystemHealth();
  }, []);

  const handleOpenChat = () => {
    setShowChatbot(true);
  };

  const handleCloseChat = () => {
    setShowChatbot(false);
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
        <Resources />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Chat Button */}
      {!showChatbot && systemStatus === 'healthy' && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-40 flex items-center gap-2 group"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-6 h-6" />
          <span className="hidden md:inline font-semibold pr-2 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 whitespace-nowrap">
            Ask AI
          </span>
        </button>
      )}

      {/* Chat Modal */}
      <ChatModal isOpen={showChatbot} onClose={handleCloseChat} />
    </div>
  );
};

export default ChatInterface;