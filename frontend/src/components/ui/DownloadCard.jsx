import React from 'react';
import { Download } from 'lucide-react';

const DownloadCard = ({ icon: Icon, title, description, color, link }) => {
  const colorClasses = {
    green: {
      iconBg: 'bg-green-600',
      text: 'text-green-700',
      hoverText: 'hover:text-green-800',
      border: 'border-green-100',
      hoverBorder: 'hover:border-green-300'
    },
    blue: {
      iconBg: 'bg-blue-600',
      text: 'text-blue-700',
      hoverText: 'hover:text-blue-800',
      border: 'border-blue-100',
      hoverBorder: 'hover:border-blue-300'
    },
    purple: {
      iconBg: 'bg-purple-600',
      text: 'text-purple-700',
      hoverText: 'hover:text-purple-800',
      border: 'border-purple-100',
      hoverBorder: 'hover:border-purple-300'
    }
  };

  const colors = colorClasses[color] || colorClasses.green;

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 ${colors.border} ${colors.hoverBorder} group`}>
      <div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 mb-2 text-lg">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      <a
        href={link}
        className={`${colors.text} ${colors.hoverText} font-semibold inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all`}
      >
        <Download className="w-4 h-4" />
        Download
      </a>
    </div>
  );
};

export default DownloadCard;