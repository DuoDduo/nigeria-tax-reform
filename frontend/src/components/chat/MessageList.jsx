import React from "react";

const MessageList = ({ messages, isLoading, onSuggestedQuestion }) => {
  return (
    <div className="p-4 flex flex-col gap-3 overflow-y-auto h-full">
      {messages.map((msg, idx) => (
        <div key={idx} className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-green-100 self-end' : 'bg-white self-start shadow-sm'}`}>
          {msg.content}
          {msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {msg.relatedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestedQuestion(q)}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hover:bg-gray-200"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      {isLoading && <div className="text-gray-500 text-sm animate-pulse">AI is typing...</div>}
    </div>
  );
};

export default MessageList;
