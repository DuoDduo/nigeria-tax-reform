import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MessageSquare, Sparkles } from 'lucide-react';

const Header = ({ onOpenChat }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowMobileMenu(false);
    }
  };

  return (
    <header className="bg-white border-b-4 border-[#008751] shadow-md sticky top-0 z-40 font-sans">
      {/* Top Bar - Forced Visibility and High Contrast */}
      <div className="bg-[#004d2f] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-[11px] sm:text-xs font-bold tracking-wide uppercase">
            <div className="flex gap-5 sm:gap-8">
              <a href="tel:+2347008294636" className="flex items-center gap-2 hover:text-green-300 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>+234 700 TAXINFO</span>
              </a>
              <a href="mailto:info@taxease.gov.ng" className="flex items-center gap-2 hover:text-green-300 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>info@taxpyre.gov.ng</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Federal Republic of Nigeria</span>
              <img src="https://flagcdn.com/w20/ng.png" alt="Nigeria Flag" className="w-5 h-auto rounded-sm shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo and Branding */}
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Coat_of_arms_of_Nigeria.svg" 
              alt="Nigerian Coat of Arms" 
              className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
            />
            <div className="border-l-2 border-gray-200 pl-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 leading-none uppercase tracking-tighter">
                Tax<span className="text-[#008751]">Pyre</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mt-1">
                National Reform Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Overview', 'Bills', 'FAQ', 'Resources'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-700 hover:text-[#008751] font-bold transition-colors text-xs uppercase tracking-widest"
              >
                {item}
              </button>
            ))}
            
            {/* Gold AI Button */}
            <button
              onClick={onOpenChat}
              className="bg-[#A88948] hover:bg-[#8E7239] text-white px-6 py-2.5 rounded shadow-lg flex items-center gap-2 font-bold transition-all text-xs uppercase tracking-widest active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Ask AI Assistant
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="bg-[#A88948] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-tight shadow-md active:scale-95"
            >
              <div className="relative">
                <MessageSquare className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              </div>
              <span>Ask AI</span>
            </button>
            
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2.5 text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {showMobileMenu && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-1">
            {['Overview', 'Bills', 'FAQ', 'Resources'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-gray-800 hover:bg-green-50 hover:text-[#008751] font-bold py-4 px-4 rounded-lg text-xs uppercase tracking-[0.2em]"
              >
                {item}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;