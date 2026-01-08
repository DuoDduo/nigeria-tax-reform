import React from "react";
import { Bot, ChevronDown } from "lucide-react";

const faqData = [
  { q: "When do these changes take effect?", a: "The tax reforms will take effect on January 1, 2026, giving everyone time to prepare." },
  { q: "Will my taxes increase?", a: "Most Nigerians will see no increase. Small business owners under ₦50M may actually pay less." },
  { q: "How does this affect small businesses?", a: "Small businesses earning under ₦50 million per year are exempt from corporate income tax." },
  { q: "What is changing about VAT?", a: "VAT rate stays at 7.5%, but distribution among states becomes fairer based on consumption." }
];

const FAQ = ({ onOpenChat }) => {
  return (
    <section id="faq" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="bg-white rounded-lg shadow-md divide-y">
        {faqData.map((item, idx) => (
          <details key={idx} className="p-6 cursor-pointer hover:bg-gray-50">
            <summary className="font-semibold text-gray-900 flex items-center justify-between">
              {item.q}
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </summary>
            <p className="mt-3 text-gray-600">{item.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={onOpenChat}
          className="text-green-700 font-semibold hover:text-green-800 inline-flex items-center gap-2"
        >
          <Bot className="w-5 h-5" />
          Ask AI Assistant for More Answers
        </button>
      </div>
    </section>
  );
};

export default FAQ;
