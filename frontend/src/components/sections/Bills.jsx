import React from 'react';
import { FileText, Scale, Landmark, Users2, ChevronRight, Download, ShieldCheck } from 'lucide-react';

const Bills = () => {
  const bills = [
    {
      icon: FileText,
      title: 'Nigeria Tax Bill',
      id: 'HB. 1759',
      description: 'The primary legislation governing income tax, VAT, and excise duties. Establishes new thresholds for individual and corporate taxpayers.',
      link: 'https://fiscalreforms.ng/wp-content/uploads/2024/12/HB.-1759-The-Nigeria-Tax-Bill-2024.pdf'
    },
    {
      icon: Scale,
      title: 'Tax Administration Bill',
      id: 'HB. 1756',
      description: 'Streamlines tax collection processes across the Federation. Provides a legal framework for fair dispute resolution and digital filing.',
      link: 'https://fiscalreforms.ng/wp-content/uploads/2024/12/HB.-1756-The-Nigeria-Tax-Administration-Bill-2024.pdf'
    },
    {
      icon: Landmark,
      title: 'Nigeria Revenue Service Bill',
      id: 'HB. 1757',
      description: 'Establishes the NRS (successor to the FIRS) as the central unified agency for collecting all federal revenues and optimizing efficiency.',
      link: 'https://fiscalreforms.ng/wp-content/uploads/2024/12/HB.-1757-The-Nigeria-Revenue-Service-Establishment-Bill-2024.pdf'
    },
    {
      icon: Users2,
      title: 'Joint Revenue Board Bill',
      id: 'HB. 1758',
      description: 'Creates a collaborative framework between Federal and State governments to eliminate double taxation and harmonize revenue sharing.',
      link: 'https://fiscalreforms.ng/wp-content/uploads/2024/12/HB.-1758-The-Joint-Revenue-Board-Establishment-Bill-2024.pdf'
    }
  ];

  return (
    <section id="bills" className="py-20 md:py-28 bg-white scroll-mt-20 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#008751]/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[#008751] font-bold uppercase tracking-[0.2em] text-xs mb-4">
            <ShieldCheck className="w-4 h-4" />
            Legislative Instruments
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            The <span className="text-[#008751]">Four Pillars</span> of Reform
          </h2>
          <p className="mt-4 text-gray-500 font-medium max-w-2xl">
            Download and review the official Gazetted copies of the 2024 Tax Reform Bills currently under implementation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {bills.map((bill, index) => {
            const Icon = bill.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-[#008751]/30 hover:bg-white hover:shadow-2xl hover:shadow-[#008751]/5 transition-all duration-300"
              >
                {/* Document ID Tag */}
                <div className="absolute top-8 right-8 text-[10px] font-black text-gray-300 uppercase tracking-widest border border-gray-200 px-2 py-1 rounded">
                  {bill.id}
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100 group-hover:bg-[#008751] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#008751] group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-[#008751] transition-colors">
                      {bill.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base font-medium opacity-80">
                      {bill.description}
                    </p>
                    
                    <a
                      href={bill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-[#008751] border border-[#008751]/20 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#008751] hover:text-white transition-all shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download Official PDF
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Footer */}
        <div className="mt-16 p-8 rounded-3xl bg-[#004d2f] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#A88948]" />
            </div>
            <div>
              <p className="font-bold text-lg leading-none">Verified Government Source</p>
              <p className="text-green-200/70 text-sm mt-1">All documents are sourced directly from the National Assembly archives.</p>
            </div>
          </div>
          <button className="whitespace-nowrap bg-[#A88948] hover:bg-[#8E7239] px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all">
            Review Summary Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Bills;