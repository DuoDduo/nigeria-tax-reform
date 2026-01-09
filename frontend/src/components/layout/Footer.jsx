import React from 'react';
import { Phone, Mail, MapPin, Scale } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg">TaxEase Nigeria</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Making Nigerian tax reforms accessible to everyone through AI-powered assistance and comprehensive information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button onClick={scrollToTop} className="hover:text-white transition-colors text-sm">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('overview')} className="hover:text-white transition-colors text-sm">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('bills')} className="hover:text-white transition-colors text-sm">
                  The Bills
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors text-sm">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('resources')} className="hover:text-white transition-colors text-sm">
                  Resources
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href="tel:+2347008294636" className="hover:text-white transition-colors text-sm">
                  +234 700 TAXINFO
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@taxease.gov.ng" className="hover:text-white transition-colors text-sm break-all">
                  info@taxease.gov.ng
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Federal Ministry of Finance<br />
                  Abuja, Nigeria
                </span>
              </li>
            </ul>
          </div>

          {/* Related Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Related Agencies</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="https://www.firs.gov.ng" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">
                  FIRS
                </a>
              </li>
              <li>
                <a href="https://finance.gov.ng" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">
                  Ministry of Finance
                </a>
              </li>
              <li>
                <a href="https://nass.gov.ng" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">
                  National Assembly
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-sm">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-gray-400 text-sm">
              <p>© 2024 Federal Republic of Nigeria. All rights reserved.</p>
              <p className="mt-1">TaxEase Nigeria - AI-Powered Tax Information Portal</p>
            </div>
            <div className="text-gray-400 text-xs">
              <p>Built with ❤️ for Nigeria 🇳🇬</p>
              <p className="mt-1">Powered by Advanced AI Technology</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;