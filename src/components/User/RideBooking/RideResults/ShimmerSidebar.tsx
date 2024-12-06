
import React from "react";

const ShimmerSidebar: React.FC = () => {
  return (
    <div className="w-1/4 p-4 bg-white">
      <div className="bg-gray-100 shadow-md h-[300px] w-[250px] p-5 rounded-md mt-4 ml-3 animate-pulse">
        <div className="space-y-4">
          {/* Placeholder for title */}
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          {/* Placeholder for list items */}
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerSidebar;

