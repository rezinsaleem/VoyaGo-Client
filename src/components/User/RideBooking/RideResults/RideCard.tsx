import React from "react";
import { Ride } from "../../../../interfaces/interface";
import { useNavigate } from "react-router-dom";

interface RideCardProps {
  ride: Ride;
}
const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
  const REGION = import.meta.env.VITE_AWS_S3_REGION;

const RideCard: React.FC<RideCardProps> = ({ ride }) => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/ride-overview', { state: { rideDetails: ride } });
  };

 
const calculateEndTime = (rideTime: string, duration: string) => {
  // Parse the rideTime into hours and minutes
  const [time, modifier] = rideTime.split(" "); // e.g., ["02:00", "PM"]
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(":").map(Number);

  // Convert PM to 24-hour format
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Parse duration into hours and minutes
  const [durationHours, durationMinutes] = duration
    .replace(" hours", "")
    .replace(" mins", "")
    .split(" ")
    .map(Number);

  // Add duration to rideTime
  const totalMinutes = hours * 60 + minutes + durationHours * 60 + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24; // Keep within 24 hours
  const endMinutes = totalMinutes % 60;

  // Convert back to 12-hour format
  const formattedHours = endHours % 12 || 12; // Convert 0 hours to 12 for AM/PM
  const formattedMinutes = endMinutes.toString().padStart(2, "0"); // Ensure 2 digits
  const endModifier = endHours >= 12 ? "PM" : "AM";

  return `${formattedHours}:${formattedMinutes} ${endModifier}`;
};

// Example usage
const endTime = calculateEndTime(ride.rideTime, ride.duration);

  
  return (
    <div
  className={`border rounded-lg p-4 shadow-sm mb-4 transition flex flex-col ${
    ride.passengers.length === ride.numSeats
      ? "bg-gray-200 border-gray-300"
      : "bg-white cursor-pointer hover:shadow-md hover:border-gray-300"
  }`}
  onClick={ ride.numSeats <=0 ? undefined : handleCardClick}
>
    {/* Ride Info */}
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-gray-700">
          {ride.rideTime} - {endTime}
        </p>
        <div className="text-sm text-gray-500">
        <p>
 
</p>

        </div>
      </div>
      <div className="text-gray-500">
        <p className="text-md font-semibold text-slate-700">
  {ride.start_address
    .split(",")
    .slice(-3).join(',')} 
</p>
<p className="text-xs font-medium">{ride.start_address.split(",").slice(0,3).join(',')}</p>

        </div>
      
        <p className="text-sm font-semibold text-gray-600 p-2">{ride.duration}</p>
     
      <div className="text-gray-500">
          <p className="font-semibold text-slate-700 text-md"> {ride.end_address
    .split(",")
    .slice(-3).join(',')}  </p>
    <p className="text-xs font-medium">{ride.end_address.split(",").slice(0,3).join(',')}</p>
        </div>
      {/* Price Section */}
      <div className="text-right">
        {ride.numSeats <=0 ?<p className="text-lg font-semibold text-gray-700">Full</p>:<p className="text-lg font-semibold text-gray-700">{`₹${ride.pricePerSeat}`}</p>}
      </div>
    </div>
  
    {/* Divider */}
    <hr className="rounded-lg w-full bg-gray-200 h-1 mt-4" />
  
    {/* Driver Info */}
    <div className="flex items-center space-x-4 mt-3">
      {/* Driver Image */}
      <img
        src={
          ride.riderDetails.userImage
            ? `https://${BUCKET}.s3.${REGION}.amazonaws.com/${ride.riderDetails.userImage}`
            : "userdefault.jpg"
        }
        alt="Driver"
        className="w-8 h-8 rounded-full object-cover"
      />
  
      {/* Separator */}
      <div className="h-6 bg-gray-200 w-[2px] rounded-md"></div>
  
      {/* Driver Name and Verified Badge */}
      <div className="flex items-center space-x-2">
        <p className="text-gray-700 text-lg font-medium">{ride.riderDetails.name}</p>
        {ride.riderDetails.isVerified === "true" && (
          <span className="flex items-center text-green-700  border border-green-700 rounded-full px-2 py-[1px]">
            Verified
          </span>
        )}
      </div>
  
      <div className="h-6 bg-gray-200 w-[2px] rounded-md"></div>
      {/* Instant Booking */}
      <p className="text-yellow-700 text-sm">Instant Booking</p>
      <div className="h-6 bg-gray-200 w-[2px] rounded-md"></div>
      
      <p className="text-gray-500 text-sm">{Math.round(ride.startDistance)} km away from departure</p>
      <div className="h-6 bg-gray-200 w-[2px] rounded-md"></div>
      {/* Instant Booking */}
      <p className="text-gray-500 text-sm">{Math.round(ride.endDistance)} km away from arrival</p>
    </div>
  </div>
  
  );
};

export default RideCard;
