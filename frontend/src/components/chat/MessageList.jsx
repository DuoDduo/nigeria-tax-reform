import React, { useEffect, useRef } from 'react';
import { User, Bot, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SourceCitation from './SourceCitation';
import SuggestedQuestions from './SuggestedQuestions';

const MessageList = ({ messages, isLoading, onSuggestedQuestion }) => {
  const messagesEndRef = useRef(null);
  const lastMessageCountRef = useRef(0);

  // Auto-scroll only when new message is added
  useEffect(() => {
    if (messages.length > lastMessageCountRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      lastMessageCountRef.current = messages.length;
    }
  }, [messages]);

  return (
    <div className="h-full px-3 py-4 space-y-4 sm:px-5 sm:space-y-6">
      {/* Empty State */}
      {messages.length === 0 && !isLoading && (
        <div className="text-center py-12 px-2">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-lg">
            <Bot className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to the Tax Reform AI Assistant</h2>
          <p className="text-gray-600 max-w-xs mx-auto mb-4 text-sm sm:max-w-lg sm:text-base">
            I'm here to help you understand the Nigerian Tax Reform Bills in simple terms.
            Ask me anything about tax rates, VAT, small business exemptions, and more.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-xs sm:max-w-lg mx-auto mt-4">
            {[
              "What are the tax reform bills?",
              "When do the changes take effect?",
              "How will this affect small businesses?",
              "Will my taxes increase?"
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => onSuggestedQuestion(q)}
                className="p-3 text-left text-sm sm:text-base font-medium bg-white border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 hover:text-green-800 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message, index) => (
        <div key={index}>
          {message.type === 'user' ? (
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-[85%] sm:max-w-2xl bg-gradient-to-r from-green-700 to-green-800 text-white rounded-2xl rounded-tr-sm p-4 shadow-md">
                <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
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

              <div className="flex-1 max-w-[90%] sm:max-w-3xl">
                <div className="bg-white border-2 border-gray-200 rounded-2xl rounded-tl-sm p-4 shadow-md">
                  {message.error ? (
                    <div className="flex items-start gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="font-semibold">Error</p>
                        <p className="text-sm mt-1">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-sm sm:prose-base max-w-none break-words text-gray-700">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}

                  {message.misconception_detected && (
                    <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                      <p className="font-semibold text-yellow-900 flex items-center gap-2 mb-1">
                        <AlertCircle className="w-5 h-5" />
                        Common Misconception Addressed
                      </p>
                      <p className="text-sm text-yellow-800">
                        This answer corrects misinformation. Always verify facts from official sources.
                      </p>
                    </div>
                  )}

                  {message.sources?.length > 0 && (
                    <SourceCitation sources={message.sources} />
                  )}

                  {message.relatedQuestions?.length > 0 && (
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

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-2xl rounded-tl-sm p-4 shadow-md">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce" />
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
              <span className="text-sm text-gray-600 font-medium">AI is thinking…</span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
