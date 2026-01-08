import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#overview" className="hover:text-white">Overview</a></li>
              <li><a href="#bills" className="hover:text-white">The Bills</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#resources" className="hover:text-white">Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +234 700 TAXINFO</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@taxreform.gov.ng</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Abuja, Nigeria</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Related Agencies</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">FIRS</a></li>
              <li><a href="#" className="hover:text-white">Ministry of Finance</a></li>
              <li><a href="#" className="hover:text-white">National Assembly</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© 2024 Federal Republic of Nigeria. All rights reserved.</p>
          <p className="text-sm mt-2">Tax Reform Information Portal - Built with AI Technology</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
