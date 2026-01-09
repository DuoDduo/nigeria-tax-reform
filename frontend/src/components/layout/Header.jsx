import React, { useState } from 'react';
import { Menu, X, Phone, Mail, Scale } from 'lucide-react';

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
    <header className="bg-white border-b-4 border-green-600 shadow-md sticky top-0 z-40">
      {/* Top Bar */}
      <div className="bg-green-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6">
              <a href="tel:+2347008294636" className="flex items-center gap-1.5 hover:text-green-200 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>+234 700 TAXINFO</span>
              </a>
              <a href="mailto:info@taxease.gov.ng" className="flex items-center gap-1.5 hover:text-green-200 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>info@taxease.gov.ng</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span>🇳🇬 Federal Republic of Nigeria</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Branding */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <Scale className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                TaxEase Nigeria
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight mt-0.5">
                Tax Reform Information Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('overview')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors text-sm"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('bills')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors text-sm"
            >
              The Bills
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors text-sm"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('resources')}
              className="text-gray-700 hover:text-green-700 font-medium transition-colors text-sm"
            >
              Resources
            </button>
            <button
              onClick={onOpenChat}
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors text-sm shadow-md hover:shadow-lg"
            >
              Ask AI
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3 pb-2">
            <button
              onClick={() => scrollToSection('overview')}
              className="text-left text-gray-700 hover:text-green-700 font-medium transition-colors py-2"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('bills')}
              className="text-left text-gray-700 hover:text-green-700 font-medium transition-colors py-2"
            >
              The Bills
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left text-gray-700 hover:text-green-700 font-medium transition-colors py-2"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('resources')}
              className="text-left text-gray-700 hover:text-green-700 font-medium transition-colors py-2"
            >
              Resources
            </button>
            <button
              onClick={onOpenChat}
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-lg font-semibold transition-colors text-center mt-2"
            >
              Ask AI Assistant
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;