import React from 'react';

export const ContactSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <div
          key={key}
          className="bg-[#f6f5f5] rounded-[9px] border border-[#828d9e]/20 overflow-hidden shadow-xs animate-pulse flex flex-row items-stretch min-h-[141px]"
        >
          {/* Left Block Skeleton */}
          <div className="w-[103px] shrink-0 bg-gray-200 p-3 flex items-center justify-center">
            <div className="w-[59px] h-[59px] rounded-full bg-gray-300" />
          </div>

          {/* Right Area Skeleton */}
          <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-300 rounded" />
              <div className="h-3 w-16 bg-gray-300 rounded-full" />
            </div>

            <div className="space-y-2 pt-1">
              <div className="h-3 w-36 bg-gray-300 rounded" />
              <div className="h-3 w-24 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
