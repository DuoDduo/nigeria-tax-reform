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
      
      // Update conversation ID if changed
      if (response.conversation_id && response.conversation_id !== conversationId) {
        setConversationId(response.conversation_id);
      }

      // Add assistant response
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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] md:h-[85vh] flex flex-col shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-900 text-white px-4 md:px-6 py-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg">TaxEase AI Assistant</h3>
              <p className="text-xs text-green-100">Ask me anything about the tax reforms</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewConversation}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="New Conversation"
              aria-label="Start new conversation"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Close"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-4 md:px-6 py-3 flex items-center gap-2 text-red-800 flex-shrink-0">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Messages - Fixed scrolling container */}
        <div className="flex-1 min-h-0 overflow-hidden bg-gray-50">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            onSuggestedQuestion={handleSendMessage}
          />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4 md:p-6 rounded-b-2xl flex-shrink-0">
          <MessageInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;