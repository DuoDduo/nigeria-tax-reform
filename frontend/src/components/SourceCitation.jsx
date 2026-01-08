import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, ExternalLink, CheckCircle } from 'lucide-react';

/**
 * Component for displaying official source citations
 */
const SourceCitation = ({ sources }) => {
  const [expanded, setExpanded] = useState(false);

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-4 hover:bg-green-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-bold text-green-900 block">
              Official Sources ({sources.length})
            </span>
            <span className="text-xs text-green-700">
              Click to view bill references
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-green-700" />
          ) : (
            <ChevronDown className="w-5 h-5 text-green-700" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t-2 border-green-200 pt-4">
          {sources.map((source, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-green-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex-shrink-0">
                      {index + 1}
                    </span>
                    <h4 className="font-bold text-gray-900 text-sm">
                      {source.bill_name}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-gray-500 text-xs font-medium block mb-1">Section</span>
                      <span className="text-gray-900 font-semibold">{source.section}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-gray-500 text-xs font-medium block mb-1">Page</span>
                      <span className="text-gray-900 font-semibold">{source.page}</span>
                    </div>
                  </div>
                </div>
              </div>

              {source.excerpt && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-1 font-medium">Excerpt:</p>
                  <p className="text-xs text-gray-700 italic leading-relaxed pl-3 border-l-2 border-green-300">
                    {source.excerpt}
                  </p>
                </div>
              )}

              {source.relevance !== undefined && source.relevance > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(1 - source.relevance) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    {Math.round((1 - source.relevance) * 100)}% relevant
                  </span>
                </div>
              )}
            </div>
          ))}

          <div className="mt-4 pt-4 border-t-2 border-green-200">
            <div className="flex items-start gap-2 text-xs text-green-800 bg-green-50 rounded-lg p-3">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Official Verification:</strong> All information is sourced directly from the Nigerian Tax Reform Bills passed by the National Assembly. These are official government documents.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceCitation;