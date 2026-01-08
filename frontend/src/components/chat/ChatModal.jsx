import React from "react";
import { X, RefreshCw, AlertCircle, Bot, Send } from "lucide-react";
import MessageList from "./MessageList";

const ChatModal = ({
  show,
  onClose,
  messages,
  input,
  setInput,
  onSend,
  onNewConversation,
  isLoading,
  error,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-4xl md:h-[600px] h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">AI Tax Assistant</h3>
              <p className="text-xs text-green-100">Ask me anything about the tax reforms</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onNewConversation} className="p-2 hover:bg-white/10 rounded-lg" title="New Conversation">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-3 flex items-center gap-2 text-red-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          <MessageList messages={messages} isLoading={isLoading} onSuggestedQuestion={onSend} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about tax rates, VAT, small businesses..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
                rows="2"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">Press Enter to send • Powered by AI</p>
            </div>
            <button
              onClick={onSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 h-fit"
            >
              <Send className="w-5 h-5" />
              <span className="hidden md:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
