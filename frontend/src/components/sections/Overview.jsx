import React from 'react';
import { Users, Building2, Map, ShieldCheck, ArrowUpRight } from 'lucide-react';

const Overview = () => {
  return (
    <section id="overview" className="py-20 md:py-28 bg-gray-50 scroll-mt-20 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 skew-x-12 translate-x-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#008751] font-bold uppercase tracking-[0.2em] text-xs mb-3">
              <ShieldCheck className="w-4 h-4" />
              Policy Framework
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Reforming for <span className="text-[#008751]">Prosperity.</span>
            </h2>
          </div>
          <p className="text-gray-500 font-medium text-sm uppercase tracking-widest border-b-2 border-[#A88948] pb-2">
            Effective January 2026
          </p>
        </div>
        
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Main Text Content */}
            <div className="lg:col-span-2">
              <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
                The Nigerian Tax Reform Bills represent a historic modernization of our fiscal landscape. 
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                By consolidating 60+ different taxes into a streamlined system, the Federal Government is eliminating "nuisance taxes" that hinder economic growth and disproportionately affect the vulnerable.
              </p>
              <div className="inline-flex items-center gap-2 text-[#008751] font-extrabold text-sm group cursor-pointer">
                DOWNLOAD FULL POLICY DOCUMENT 
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

            {/* Pillar Grid */}
            <div className="lg:col-span-3 grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* For Citizens */}
              <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#008751]/30 transition-all">
                <div className="w-12 h-12 bg-[#008751]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#008751] transition-colors">
                  <Users className="w-6 h-6 text-[#008751] group-hover:text-white" />
                </div>
                <h3 className="font-black text-gray-900 mb-3 uppercase text-xs tracking-widest">For Citizens</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  Lower personal income tax for 90% of the workforce. Clearer exemptions for essential goods and services.
                </p>
              </div>

              {/* For Businesses */}
              <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#A88948]/30 transition-all">
                <div className="w-12 h-12 bg-[#A88948]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#A88948] transition-colors">
                  <Building2 className="w-6 h-6 text-[#A88948] group-hover:text-white" />
                </div>
                <h3 className="font-black text-gray-900 mb-3 uppercase text-xs tracking-widest">For Businesses</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  Zero corporate tax for SMEs under ₦50M. Reduced 25% rate for larger enterprises to encourage hiring.
                </p>
              </div>

              {/* For States */}
              <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-900/10 transition-all">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
                  <Map className="w-6 h-6 text-gray-900 group-hover:text-white" />
                </div>
                <h3 className="font-black text-gray-900 mb-3 uppercase text-xs tracking-widest">For States</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  A derivation-based VAT model ensuring revenue generated in a region supports local development directly.
                </p>
              </div>

            </div>
          </div>

          {/* New: Statistical Impact Ribbon */}
          <div className="mt-16 pt-10 border-t border-gray-50 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-black text-[#008751]">60+</div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Taxes Unified</p>
            </div>
            <div>
              <div className="text-2xl font-black text-[#008751]">0%</div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Tax for SMEs</p>
            </div>
            <div>
              <div className="text-2xl font-black text-[#008751]">36</div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">States Benefiting</p>
            </div>
            <div>
              <div className="text-2xl font-black text-[#008751]">2026</div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Launch Year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;