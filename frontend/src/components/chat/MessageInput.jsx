import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

const MessageInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  // Focus input when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input.trim());
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about tax rates, VAT, small businesses..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none transition-all text-sm md:text-base"
          rows="1"
          disabled={isLoading}
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
        <p className="text-xs text-gray-500 mt-2 px-1">
          Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">Shift + Enter</kbd> for new line
        </p>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!input.trim() || isLoading}
        className="px-5 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center gap-2 h-12 shadow-md hover:shadow-lg disabled:shadow-none flex-shrink-0"
        aria-label="Send message"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline font-semibold text-sm">Send</span>
          </>
        )}
      </button>
    </div>
  );
};

export default MessageInput;