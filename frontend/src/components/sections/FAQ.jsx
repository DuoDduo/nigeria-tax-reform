import React from 'react';
import { ChevronDown, Bot } from 'lucide-react';

const FAQ = ({ onOpenChat }) => {
  const faqs = [
    {
      question: "When do these changes take effect?",
      answer: "The tax reforms will take effect on January 1, 2026, giving everyone time to prepare for the transition."
    },
    {
      question: "Will my taxes increase?",
      answer: "Most Nigerians will see no increase. Tax rates remain the same for most income brackets. Small business owners under ₦50M may actually pay less in corporate taxes."
    },
    {
      question: "How does this affect small businesses?",
      answer: "Small businesses earning under ₦50 million per year are completely exempt from corporate income tax. This allows them to reinvest profits and grow without the burden of corporate taxation."
    },
    {
      question: "What is changing about VAT?",
      answer: "The VAT rate stays at 7.5%, but the distribution among states becomes fairer. It's now based more on where goods are consumed (60%), rather than just where companies have their headquarters."
    },
    {
      question: "How will this affect my state's revenue?",
      answer: "States with high consumption will receive more VAT revenue. The new formula ensures that states benefit based on economic activity within their borders, making the system more equitable."
    },
    {
      question: "Do I need to do anything to prepare?",
      answer: "For most individuals, no action is needed. Your employer will handle tax deductions automatically. Small business owners should review their revenue to understand if they qualify for exemptions."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="bg-white rounded-2xl shadow-lg divide-y divide-gray-200 border border-gray-100 overflow-hidden">
          {faqs.map((faq, index) => (
            <details key={index} className="group">
              <summary className="p-5 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                <span className="font-semibold text-gray-900 text-left flex-1 text-sm md:text-base">
                  {faq.question}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Have more questions? Get instant answers from our AI assistant.
          </p>
          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 hover:gap-3 transition-all text-sm md:text-base"
          >
            <Bot className="w-5 h-5" />
            Ask AI Assistant
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;