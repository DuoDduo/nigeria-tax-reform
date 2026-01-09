import React from 'react';
import { Bot, BookOpen } from 'lucide-react';

const Hero = ({ onOpenChat }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Understanding Nigeria's 2024 Tax Reform Bills
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-green-100 leading-relaxed">
              Get accurate, source-backed answers about how the tax reforms affect you. 
              Our AI assistant helps you understand complex policy in simple terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={onOpenChat}
                className="bg-white text-green-800 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Bot className="w-5 h-5 md:w-6 md:h-6" />
                Ask AI Assistant
              </button>
              <button
                onClick={() => scrollToSection('overview')}
                className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column - Key Info Card */}
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 shadow-2xl">
              <h3 className="text-xl lg:text-2xl font-bold mb-6">Key Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">✓</span>
                  </div>
                  <span className="text-sm lg:text-base leading-relaxed">
                    4 comprehensive tax reform bills passed by National Assembly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">✓</span>
                  </div>
                  <span className="text-sm lg:text-base leading-relaxed">
                    Takes effect January 1, 2026
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">✓</span>
                  </div>
                  <span className="text-sm lg:text-base leading-relaxed">
                    Small businesses under ₦50M exempt from corporate tax
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">✓</span>
                  </div>
                  <span className="text-sm lg:text-base leading-relaxed">
                    Fairer VAT distribution across all states
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;