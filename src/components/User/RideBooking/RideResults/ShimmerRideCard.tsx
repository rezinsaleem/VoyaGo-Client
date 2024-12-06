import React from "react";

const ShimmerRideCard: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 shadow-sm mb-4 w-[900px] h-[140px] transition bg-gray-100 animate-pulse">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/6"></div>
        <div className="h-5 bg-gray-300 rounded w-1/5"></div>
      </div>
      {/* Divider */}
      <div className="h-[2px] bg-gray-300 w-full rounded my-2"></div>
      {/* Bottom Section */}
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/6"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default ShimmerRideCard;
