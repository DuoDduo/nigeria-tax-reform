import React from 'react';
import { Calendar, ShieldCheck, TrendingUp, Landmark, Clock, ArrowRight } from 'lucide-react';

const ImpactRoadmap = () => {
  const steps = [
    {
      date: "Q1 2025",
      title: "Legislative Passage",
      desc: "Final reading and harmonization of the four bills by the National Assembly.",
      status: "completed"
    },
    {
      date: "Q3 2025",
      title: "Agency Transition",
      desc: "Restructuring of FIRS into the Nigeria Revenue Service (NRS).",
      status: "current"
    },
    {
      date: "Jan 1, 2026",
      title: "Full Implementation",
      desc: "New tax rates, VAT derivation model, and SME exemptions take full effect.",
      status: "upcoming"
    }
  ];

  return (
    <section id="roadmap" className="py-20 md:py-28 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Impact Stats */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#008751] font-bold uppercase tracking-[0.2em] text-[10px] mb-4">
              <TrendingUp className="w-4 h-4" />
              Economic Impact
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
              Modernizing for <br />
              <span className="text-[#008751]">90 Million</span> Taxpayers.
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 max-w-lg">
              The 2026 reforms are designed to move Nigeria away from "taxing production" and toward "taxing consumption," creating a more business-friendly environment for the West African region.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 bg-[#A88948]/10 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#A88948]" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Tax Harmonization</h4>
                <p className="text-xs text-gray-500">Reducing 60+ taxes to 10 essential heads to stop double taxation.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 bg-[#008751]/10 rounded-lg flex items-center justify-center mb-4">
                  <Landmark className="w-5 h-5 text-[#008751]" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Fiscal Federalism</h4>
                <p className="text-xs text-gray-500">Empowering States with a fairer share of VAT based on local consumption.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Timeline Visual */}
          <div className="relative p-8 md:p-12 bg-[#0a1a14] rounded-[3rem] text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Clock className="w-32 h-32" />
            </div>
            
            <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
              <Calendar className="text-[#A88948]" />
              Implementation Roadmap
            </h3>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 relative group">
                  {/* Timeline Line */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-[15px] top-10 w-[2px] h-16 bg-white/10 group-hover:bg-[#A88948]/50 transition-colors" />
                  )}
                  
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                    step.status === 'completed' ? 'bg-[#008751] border-[#008751]' : 
                    step.status === 'current' ? 'bg-[#A88948] border-[#A88948] animate-pulse' : 
                    'bg-transparent border-white/20'
                  }`}>
                    {step.status === 'completed' && <span className="text-xs">✓</span>}
                  </div>

                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      step.status === 'current' ? 'text-[#A88948]' : 'text-gray-500'
                    }`}>
                      {step.date}
                    </span>
                    <h4 className="font-bold text-lg text-white mt-1">{step.title}</h4>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest">
                View Detailed 2026 Schedule
                <ArrowRight className="w-4 h-4 text-[#A88948]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactRoadmap;