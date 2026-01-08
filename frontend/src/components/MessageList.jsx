import React, { useEffect, useRef } from 'react';
import { User, Bot, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SourceCitation from './SourceCitation';
import SuggestedQuestions from './SuggestedQuestions';

/**
 * Component for displaying the message list
 */
const MessageList = ({ messages, isLoading, onSuggestedQuestion }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
      {messages.length === 0 && !isLoading && (
        <div className="text-center py-12 px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Bot className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Welcome to the Tax Reform AI Assistant
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            I'm here to help you understand the Nigerian Tax Reform Bills in simple terms. 
            Ask me anything about tax rates, VAT, small business exemptions, and more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto mt-8">
            {[
              "What are the tax reform bills?",
              "When do the changes take effect?",
              "How will this affect small businesses?",
              "Will my taxes increase?"
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => onSuggestedQuestion(q)}
                className="p-4 bg-white border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 rounded-lg text-left text-sm font-medium text-gray-700 hover:text-green-800 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((message, index) => (
        <div key={index} className="animate-fade-in">
          {message.type === 'user' ? (
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-gradient-to-r from-green-700 to-green-800 text-white rounded-2xl rounded-tr-sm p-4 max-w-2xl shadow-md">
                <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1 max-w-3xl">
                <div className="bg-white border-2 border-gray-200 rounded-2xl rounded-tl-sm p-5 shadow-md">
                  {message.error ? (
                    <div className="flex items-start gap-3 text-red-600">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Error</p>
                        <p className="text-sm mt-1">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-green-700">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                  
                  {message.misconception_detected && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-lg">
                      <p className="font-semibold text-yellow-900 flex items-center gap-2 mb-1">
                        <AlertCircle className="w-5 h-5" />
                        Common Misconception Addressed
                      </p>
                      <p className="text-sm text-yellow-800">
                        This answer corrects misinformation that's been spreading. Always verify facts from official sources.
                      </p>
                    </div>
                  )}

                  {message.sources && message.sources.length > 0 && (
                    <SourceCitation sources={message.sources} />
                  )}

                  {message.relatedQuestions && message.relatedQuestions.length > 0 && (
                    <SuggestedQuestions
                      questions={message.relatedQuestions}
                      onQuestionClick={onSuggestedQuestion}
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-start gap-3 animate-fade-in">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-2xl rounded-tl-sm p-5 shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm text-gray-600 font-medium">AI is thinking...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;