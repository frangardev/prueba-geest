import React from 'react';

export const ContactSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <div
          key={key}
          className="bg-white rounded-2xl p-6 border border-[#828d9e]/20 shadow-sm animate-pulse flex flex-col justify-between h-[210px]"
        >
          <div className="space-y-3">
            {/* Header / Name and Department Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gray-200 rounded-full shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded-full shrink-0" />
            </div>

            {/* Email & Phone Details */}
            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-44 bg-gray-200 rounded" />
              <div className="h-3.5 w-32 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-[#f6f5f5] flex justify-end">
            <div className="h-8 w-24 bg-gray-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
