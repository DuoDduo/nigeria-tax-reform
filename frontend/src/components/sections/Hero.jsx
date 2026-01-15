import React from 'react';
import { Bot, BookOpen, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const Hero = ({ onOpenChat }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#004d2f] text-white py-16 md:py-24 lg:py-28">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial Gradient Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4 text-[#A88948]" />
              Official Tax Reform Guide 2026
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              A Simpler, Fairer <br />
              <span className="text-[#A88948]">Tax System</span> for All.
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-green-50/90 leading-relaxed max-w-xl mx-auto md:mx-0">
              Navigate Nigeria's new tax landscape with confidence. Get source-backed answers on how the 2026 reforms impact your business and personal finances.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={onOpenChat}
                className="bg-[#A88948] hover:bg-[#8E7239] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-[#A88948]/20 flex items-center justify-center gap-3 text-base uppercase tracking-wider group"
              >
                <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ask AI Assistant
              </button>
              
              <button
                onClick={() => scrollToSection('overview')}
                className="bg-white/5 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#004d2f] transition-all flex items-center justify-center gap-3 text-base uppercase tracking-wider"
              >
                <BookOpen className="w-5 h-5" />
                Read the Bills
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center md:justify-start gap-4 text-sm text-green-200/70 font-medium">
              <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-[#A88948]" /> Fast Response</span>
              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
              <span>Verified Content</span>
              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
              <span>24/7 Support</span>
            </div>
          </div>

          {/* Right Column: Key Info Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#A88948]/20 blur-3xl rounded-full"></div>
            <div className="relative bg-white text-gray-900 rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-800">Key Highlights</h3>
                <CheckCircle2 className="w-8 h-8 text-[#008751]" />
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Effective Date", desc: "Full implementation begins January 1, 2026." },
                  { title: "SME Protection", desc: "Small businesses under ₦50M turnover are now 100% exempt." },
                  { title: "Fairer VAT", desc: "New consumption-based distribution model for all 36 states." },
                  { title: "Simplified Filing", desc: "Consolidation of multiple taxes into a single unified portal." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A88948] mt-2 group-hover:scale-150 transition-transform"></div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider text-[#008751]">{item.title}</h4>
                      <p className="text-gray-600 text-sm lg:text-base font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Verified by Federal Tax Reform Committee
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;