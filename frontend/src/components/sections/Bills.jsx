import React from "react";
import { FileText, Scale, BookOpen, MapPin, ChevronDown } from "lucide-react";

const billsData = [
  {
    icon: FileText,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    title: "Nigeria Tax Bill",
    desc: "Covers income tax, VAT, and other main taxes. Sets rates and rules for individuals and businesses.",
    linkColor: "text-green-700",
  },
  {
    icon: Scale,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    title: "Tax Administration Bill",
    desc: "Explains how taxes are collected, managed, and disputes are resolved.",
    linkColor: "text-blue-700",
  },
  {
    icon: BookOpen,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    title: "Nigeria Revenue Service Bill",
    desc: "About the new tax collection agency (formerly FIRS) and its powers.",
    linkColor: "text-purple-700",
  },
  {
    icon: MapPin,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    title: "Joint Revenue Board Bill",
    desc: "How federal and state governments coordinate on tax matters.",
    linkColor: "text-orange-700",
  },
];

const Bills = () => {
  return (
    <section id="bills" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">The Four Bills</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {billsData.map((bill, idx) => {
          const Icon = bill.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`${bill.iconBg} rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${bill.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{bill.title}</h3>
                  <p className="text-gray-600 mb-3">{bill.desc}</p>
                  <a href="#" className={`${bill.linkColor} font-semibold hover:text-opacity-90 inline-flex items-center gap-1`}>
                    Read More <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Bills;
