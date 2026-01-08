import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

/**
 * Component for displaying suggested follow-up questions
 */
const SuggestedQuestions = ({ questions, onQuestionClick, isLoading }) => {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4 text-green-700" />
        <span className="text-sm font-semibold text-gray-700">
          Related Questions
        </span>
      </div>
      <div className="space-y-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            disabled={isLoading}
            className="w-full text-left p-3 bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg text-sm text-gray-800 hover:text-green-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-between gap-2"
          >
            <span className="font-medium">{question}</span>
            <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">
        💡 Click any question to continue the conversation
      </p>
    </div>
  );
};

export default SuggestedQuestions;