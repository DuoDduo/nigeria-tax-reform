import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ExternalLink, ChevronUp } from 'lucide-react';

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
    <footer className="bg-[#0a1a14] text-white pt-20 pb-10 mt-20 relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#008751] via-[#A88948] to-[#008751]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Coat_of_arms_of_Nigeria.svg" 
                alt="Nigeria Coat of Arms" 
                className="w-12 h-12"
              />
              <div className="border-l border-white/20 pl-4">
                <h4 className="font-black text-xl uppercase tracking-tighter leading-none">TaxPyre</h4>
                <p className="text-[9px] font-bold text-[#A88948] uppercase tracking-widest mt-1">Federal Republic of Nigeria</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              The official AI-powered intelligence portal designed to provide clarity on the 2024-2026 National Tax Reforms.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Official Government Resource
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[#A88948] font-black text-xs uppercase tracking-[0.2em] mb-6">Portal Map</h4>
            <ul className="space-y-4">
              {['Overview', 'Bills', 'FAQ', 'Resources'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(item.toLowerCase())} 
                    className="text-gray-300 hover:text-white transition-colors text-sm font-bold flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-[#A88948] transition-all mr-0 group-hover:mr-2"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Channels */}
          <div>
            <h4 className="text-[#A88948] font-black text-xs uppercase tracking-[0.2em] mb-6">Contact Channels</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-green-500 mt-1" />
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Help Desk</p>
                  <a href="tel:+2347008294636" className="text-sm font-bold hover:text-green-400 transition-colors">
                    +234 700 TAXINFO
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-green-500 mt-1" />
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Email Support</p>
                  <a href="mailto:info@taxmind.gov.ng" className="text-sm font-bold hover:text-green-400 transition-colors">
                    info@taxpyre.gov.ng
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-500 mt-1" />
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Location</p>
                  <p className="text-sm font-bold">Finance House, Abuja</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Related Agencies */}
          <div>
            <h4 className="text-[#A88948] font-black text-xs uppercase tracking-[0.2em] mb-6">Related Agencies</h4>
            <ul className="space-y-4">
              {[
                { name: 'NRS (formerly FIRS)', url: 'https://www.firs.gov.ng' },
                { name: 'Ministry of Finance', url: 'https://finance.gov.ng' },
                { name: 'National Assembly', url: 'https://nass.gov.ng' },
                { name: 'Data Protection (NDPC)', url: 'https://ndpc.gov.ng' }
              ].map((agency) => (
                <li key={agency.name}>
                  <a 
                    href={agency.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between text-gray-300 hover:text-white text-sm font-bold group"
                  >
                    {agency.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">
              © 2026 Federal Republic of Nigeria • <span className="text-green-500">Official Portal</span>
            </p>
            <p className="text-gray-600 text-[10px] mt-1 font-medium italic">
              Empowering transparency through Artificial Intelligence.
            </p>
          </div>

          <button 
            onClick={scrollToTop}
            className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all group"
            aria-label="Back to top"
          >
            <ChevronUp className="w-6 h-6 text-[#A88948] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;