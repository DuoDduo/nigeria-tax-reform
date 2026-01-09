import React from 'react';
import { FileText, Scale, BookOpen, MapPin, ChevronRight } from 'lucide-react';

const Bills = () => {
  const bills = [
    {
      icon: FileText,
      title: 'Nigeria Tax Bill',
      description: 'Covers income tax, VAT, and other main taxes. Sets rates and rules for individuals and businesses.',
      color: 'green',
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-600',
      textColor: 'text-green-700',
      hoverBorder: 'hover:border-green-400',
      link: 'https://fiscalreforms.ng/wp-content/uploads/2024/12/HB.-1759-The-Nigeria-Tax-Bill-2024.pdf'
    },
    {
      icon: Scale,
      title: 'Tax Administration Bill',
      description: 'Explains how taxes are collected, managed, and how disputes are resolved fairly.',
      color: 'blue',
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-700',
      hoverBorder: 'hover:border-blue-400',
      link:'https://fiscalreforms.ng/wp-content/uploads/2024/12/HB.-1756-The-Nigeria-Tax-Administration-Bill-2024.pdf'
    },
    {
      icon: BookOpen,
      title: 'Nigeria Revenue Service Bill',
      description: 'About the new tax collection agency (formerly FIRS) and its powers and responsibilities.',
      color: 'purple',
      bgColor: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-600',
      textColor: 'text-purple-700',
      hoverBorder: 'hover:border-purple-400',
      link: 'https://fiscalreforms.ng/wp-content/uploads/2024/12/HB.-1757-The-Nigeria-Revenue-Service-Establishment-Bill-2024.pdf'
    },
    {
      icon: MapPin,
      title: 'Joint Revenue Board Bill',
      description: 'How federal and state governments coordinate on tax matters and revenue sharing.',
      color: 'orange',
      bgColor: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-600',
      textColor: 'text-orange-700',
      hoverBorder: 'hover:border-orange-400',
     link: 'https://fiscalreforms.ng/wp-content/uploads/2024/12/HB.-1758-The-Joint-Revenue-Board-Establishment-Bill-2024.pdf'
    }
  ];

  return (
    <section id="bills" className="py-16 md:py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
          The Four Bills
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {bills.map((bill, index) => {
            const Icon = bill.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${bill.bgColor} rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border-2 ${bill.borderColor} ${bill.hoverBorder} group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${bill.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {bill.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
                      {bill.description}
                    </p>
                  <a
                    href={bill.link}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${bill.textColor} font-semibold hover:underline inline-flex items-center gap-1 text-sm group-hover:gap-2 transition-all`}
                  >
                    Download PDF
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Bills;