"use client"

import { Bot } from "lucide-react"

const Hero = ({ onChatClick }) => {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Understanding Nigeria's 2024 Tax Reform Bills</h2>
            <p className="text-lg mb-6 text-green-100">
              Get accurate, source-backed answers about how the tax reforms affect you. Our AI assistant helps you
              understand complex policy in simple terms.
            </p>
            <div className="flex gap-4">
              <button
                onClick={onChatClick}
                className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <Bot className="w-5 h-5" />
                Ask AI Assistant
              </button>
              <a
                href="#overview"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">Key Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>4 comprehensive tax reform bills passed by National Assembly</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Takes effect January 1, 2026</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Small businesses under ₦50M exempt from corporate tax</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Fairer VAT distribution across all states</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
