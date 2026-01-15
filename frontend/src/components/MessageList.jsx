import React, { useEffect, useRef } from 'react';
import { User, Bot, AlertCircle, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SourceCitation from './SourceCitation';
import SuggestedQuestions from './SuggestedQuestions';

/**
 * Professional Message List for TaxEase AI
 * Handles: Auto-scroll, Markdown rendering, Source Citations, 
 * Misconception banners, and Suggested Questions.
 */
const MessageList = ({ messages, isLoading, onSuggestedQuestion }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /** Handles suggested question click */
  const handleSuggestedClick = (question) => {
    if (!question) return;
    onSuggestedQuestion(question);
  };

  return (
    <div className="flex-1 w-full flex flex-col space-y-8 min-h-full">
      {/* Welcome screen - Shown only when chat is empty */}
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in duration-700">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-green-900/20">
            <Bot size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            TaxEase AI Assistant
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-10 leading-relaxed">
            I'm here to help you navigate the Nigerian Tax Reform Bills. 
            Ask me about VAT, small business exemptions, or CIT changes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
            {[
              "What are the tax reform bills?",
              "When do the changes take effect?",
              "How will this affect small businesses?",
              "Will my taxes increase?"
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggestedClick(q)}
                className="p-4 bg-white border border-gray-200 hover:border-green-600 hover:bg-green-50 rounded-xl text-left text-sm font-semibold text-gray-700 hover:text-green-800 transition-all shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat messages */}
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`flex w-full animate-in slide-in-from-bottom-2 duration-300 ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${
            message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
          }`}>
            
            {/* Avatar Icon */}
            <div className="shrink-0 mt-1">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${
                message.type === 'user' ? 'bg-gray-800' : 'bg-green-700'
              }`}>
                {message.type === 'user' ? (
                  <User size={18} className="text-white" />
                ) : (
                  <Bot size={18} className="text-white" />
                )}
              </div>
            </div>

            {/* Content Container */}
            <div className={`flex flex-col space-y-3 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
              
              {/* Message Bubble */}
              <div className={`
                p-4 md:p-5 rounded-2xl shadow-sm border h-auto w-full
                ${message.type === 'user' 
                  ? 'bg-green-700 border-green-800 text-white rounded-tr-none' 
                  : 'bg-white border-gray-200 text-gray-800 rounded-tl-none'}
              `}>
                {message.error ? (
                  <div className="flex items-start gap-3 text-red-600">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-bold uppercase tracking-wider text-[10px]">System Error</p>
                      <p className="mt-1">{message.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="markdown-content text-sm md:text-base leading-relaxed break-words">
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-4 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-4 space-y-2" {...props} />,
                        li: ({node, ...props}) => <li className="text-inherit" {...props} />,
                        strong: ({node, ...props}) => (
                          <strong className={message.type === 'user' ? 'font-bold text-white' : 'font-bold text-gray-900'} {...props} />
                        ),
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
                        code: ({node, ...props}) => (
                          <code className="bg-gray-100 text-red-600 px-1 rounded font-mono text-xs" {...props} />
                        )
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Auxiliary Content (AI Only) */}
              {message.type === 'assistant' && !message.error && (
                <div className="w-full space-y-3 animate-in fade-in duration-500 delay-150">
                  
                  {/* Fact Check / Misconception */}
                  {message.misconception_detected && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm">
                      <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest mb-1">
                        <Info size={14} className="text-amber-600" />
                        Official Fact Check
                      </div>
                      <p className="text-sm text-amber-800">
                        This response corrects a common tax-related misconception. Always cross-reference with official FIRS gazettes.
                      </p>
                    </div>
                  )}

                  {/* Legal Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-1">
                      <SourceCitation sources={message.sources} />
                    </div>
                  )}

                  {/* Follow-up Questions */}
                  {message.relatedQuestions && message.relatedQuestions.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2">Suggested Follow-ups</p>
                      <SuggestedQuestions
                        questions={message.relatedQuestions}
                        onQuestionClick={handleSuggestedClick}
                        isLoading={isLoading}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Thinking Indicator */}
      {isLoading && (
        <div className="flex justify-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-700 flex items-center justify-center shrink-0">
            <Bot size={18} className="text-white" />
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-duration:0.8s]"></span>
              <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></span>
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Processing</span>
          </div>
        </div>
      )}

      {/* Invisible scroll anchor */}
      <div ref={messagesEndRef} className="h-4 w-full shrink-0" />
    </div>
  );
};

export default MessageList;