import React from 'react';
import DownloadCard from '../ui/DownloadCard';
import { FileText, Info, BookOpen } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      icon: FileText,
      title: 'Official Bills (PDF)',
      description: 'Download the complete text of all four tax reform bills',
      color: 'green',
      link: '#'
    },
    {
      icon: Info,
      title: "Citizen's Guide",
      description: 'Simplified explanations for everyday Nigerians',
      color: 'blue',
      link: '#'
    },
    {
      icon: BookOpen,
      title: 'Business Guide',
      description: 'How the reforms affect your business operations',
      color: 'purple',
      link: '#'
    }
  ];

  return (
    <section id="resources" className="py-16 md:py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
          Resources & Downloads
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((resource, index) => (
            <DownloadCard key={index} {...resource} />
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Need Help Understanding the Bills?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-sm md:text-base">
            Our AI assistant can explain any section of the bills in simple terms, 
            answer specific questions, and help you understand how the reforms affect you personally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg text-sm md:text-base">
              Contact Support
            </button>
            <button className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-colors text-sm md:text-base">
              View All Resources
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;