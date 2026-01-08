import React, { useState } from "react";
import { Phone, Mail, Menu, X, Scale } from "lucide-react";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-white border-b-4 border-green-600 shadow-md">
      <div className="bg-green-800 text-white py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> +234 700 TAXINFO
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" /> info@taxreform.gov.ng
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span>🇳🇬 Federal Republic of Nigeria</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Tax Reform Information Portal
              </h1>
              <p className="text-sm text-gray-600">
                Federal Ministry of Finance, Budget and National Planning
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#overview" className="text-gray-700 hover:text-green-700 font-medium">Overview</a>
            <a href="#bills" className="text-gray-700 hover:text-green-700 font-medium">The Bills</a>
            <a href="#faq" className="text-gray-700 hover:text-green-700 font-medium">FAQ</a>
            <a href="#resources" className="text-gray-700 hover:text-green-700 font-medium">Resources</a>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-3">
            <a href="#overview" className="text-gray-700 hover:text-green-700 font-medium">Overview</a>
            <a href="#bills" className="text-gray-700 hover:text-green-700 font-medium">The Bills</a>
            <a href="#faq" className="text-gray-700 hover:text-green-700 font-medium">FAQ</a>
            <a href="#resources" className="text-gray-700 hover:text-green-700 font-medium">Resources</a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
