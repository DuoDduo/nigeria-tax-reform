import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Bot, AlertCircle } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessage, createConversation, clearConversation } from '../../api/chatAPI';

const ChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);

  // Initialize conversation when modal opens
  useEffect(() => {
    if (isOpen && !conversationId) {
      initializeConversation();
    }
  }, [isOpen]);

  const initializeConversation = async () => {
    try {
      const newConvId = await createConversation();
      setConversationId(newConvId);
    } catch (err) {
      console.error('Failed to create conversation:', err);
      setError('Failed to initialize chat. Please try again.');
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: messageText }]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(messageText, conversationId);

      if (response.conversation_id && response.conversation_id !== conversationId) {
        setConversationId(response.conversation_id);
      }

      setMessages(prev => [
        ...prev,
        {
          type: 'assistant',
          content: response.answer,
          sources: response.sources,
          misconception_detected: response.misconception_detected,
          relatedQuestions: response.related_questions,
        },
      ]);
    } catch (err) {
      console.error('Error sending message:', err);

      setMessages(prev => [
        ...prev,
        {
          type: 'assistant',
          content: err.response?.data?.detail || 'Sorry, I encountered an error. Please try again.',
          error: true,
        },
      ]);

      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = async () => {
    if (conversationId) {
      await clearConversation(conversationId);
    }

    const newConvId = await createConversation();
    setConversationId(newConvId);
    setMessages([]);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex flex-col w-full h-full sm:max-w-3xl sm:h-[90vh] bg-white sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-green-700 to-green-900 text-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <h3 className="font-semibold text-sm sm:text-base">TaxPyre AI Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewConversation}
              title="New Conversation"
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              title="Close chat"
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2 flex items-center gap-2 text-red-800 flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-600 hover:text-red-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Messages (scrollable container) */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            onSuggestedQuestion={handleSendMessage}
          />
        </div>

        {/* Input */}
        <footer className="border-t bg-white p-3 sm:p-4 flex-shrink-0">
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </footer>
      </div>
    </div>
  );
};

export default ChatModal;
