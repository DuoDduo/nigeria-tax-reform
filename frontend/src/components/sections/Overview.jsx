import React from "react";

const Overview = () => {
  return (
    <section id="overview" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <p className="text-lg text-gray-700 mb-4">
          The Nigerian Tax Reform Bills of 2024 represent a comprehensive modernization of the country's tax system. These reforms are designed to simplify taxation, support small businesses, and ensure fairer distribution of tax revenues across all states.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold text-green-900 mb-2">For Citizens</h3>
            <p className="text-gray-700 text-sm">Tax rates remain stable with clearer guidelines on what you owe</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-bold text-blue-900 mb-2">For Businesses</h3>
            <p className="text-gray-700 text-sm">Small businesses under ₦50M revenue pay zero corporate tax</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
            <h3 className="font-bold text-purple-900 mb-2">For States</h3>
            <p className="text-gray-700 text-sm">VAT distributed more fairly based on consumption patterns</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
