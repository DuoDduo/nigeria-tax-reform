import React from "react";
import { FileText, Info, BookOpen } from "lucide-react";

const resourcesData = [
  { icon: FileText, color: "green", title: "Official Bills (PDF)", desc: "Download the complete text of all four bills" },
  { icon: Info, color: "blue", title: "Citizen's Guide", desc: "Simplified explanations for everyday Nigerians" },
  { icon: BookOpen, color: "purple", title: "Business Guide", desc: "How the reforms affect your business" },
];

const Resources = () => {
  return (
    <section id="resources" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Resources & Downloads</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {resourcesData.map((res, idx) => {
          const Icon = res.icon;
          const iconColor = `text-${res.color}-700`;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <Icon className={`w-10 h-10 ${iconColor} mb-4`} />
              <h3 className="font-bold text-gray-900 mb-2">{res.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{res.desc}</p>
              <button className={`${iconColor} font-semibold hover:text-opacity-90`}>Download →</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Resources;
