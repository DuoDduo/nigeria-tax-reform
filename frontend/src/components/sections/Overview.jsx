import React from 'react';
import { Users, Building2, Map } from 'lucide-react';

const Overview = () => {
  return (
    <section id="overview" className="py-16 md:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
          Overview
        </h2>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 md:mb-10 border border-gray-100">
          <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
            The Nigerian Tax Reform Bills of 2024 represent a comprehensive modernization of the country's tax system. 
            These reforms are designed to simplify taxation, support small businesses, and ensure fairer distribution 
            of tax revenues across all states.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* For Citizens */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-green-900 mb-2 text-lg">For Citizens</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Tax rates remain stable with clearer guidelines on what you owe. 
                Most Nigerians will see no increase in their tax burden.
              </p>
            </div>

            {/* For Businesses */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-blue-900 mb-2 text-lg">For Businesses</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Small businesses under ₦50M revenue pay zero corporate tax, 
                allowing them to reinvest and grow.
              </p>
            </div>

            {/* For States */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Map className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-purple-900 mb-2 text-lg">For States</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                VAT distributed more fairly based on consumption patterns, 
                ensuring all regions benefit equitably.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;