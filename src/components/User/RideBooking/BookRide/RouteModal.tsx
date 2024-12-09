import { useEffect, useState } from "react";
import { Ride, RidePlanState } from "../../../../interfaces/interface";

interface RouteModalProps {
  selectedRide: Ride | RidePlanState ; // Use the Ride interface
  onClose: () => void;
}

const apiKey = import.meta.env.VITE_GOOGLE_API;

const RouteModal: React.FC<RouteModalProps> = ({ selectedRide, onClose }) => {
  const [startLocation, setStartLocation] = useState<string | null>(null);
  const [endLocation, setEndLocation] = useState<string | null>(null);

  useEffect(() => {
    // Extract start and end locations when the modal opens
    const start = selectedRide.start_address.split(",").slice(-3, -2)[0];
    const end = selectedRide.end_address.split(",").slice(-3, -2)[0];
    setStartLocation(start);
    setEndLocation(end);
  }, [selectedRide]);

  const handleGoogleMapsRedirect = () => {
    const startLatLng = encodeURIComponent(selectedRide.start_address);
    const endLatLng = encodeURIComponent(selectedRide.end_address);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLatLng}&destination=${endLatLng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Route Overview</h2>
        <div className="space-y-6">
          <p>
          <span className="font-bold text-lg text-gray-700">{startLocation} - {endLocation}</span> <br />
            <span className="text-gray-600 text-md">{selectedRide.routeName}</span>
          </p>
          {/* <p className="text-gray-600 text-md">Route: {selectedRide.routeName}</p> */}
          <div className="flex justify-center">
            {/* Google Maps Embed with focused zoom */}
            <iframe
              src={`https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(
                selectedRide.start_address
              )}&destination=${encodeURIComponent(
                selectedRide.end_address
              )}&zoom=9&mode=driving`}
              width="100%"
              height="320"
              frameBorder="0"
              style={{ border: "0" }}
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex justify-around">
          <div className="text-center mt-4">
            <button
              onClick={handleGoogleMapsRedirect}
              className=" bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-4 w-[200px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 "
            >
              Open in Google Maps
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className=" bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-medium py-3 px-4 w-[200px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 "
            >
              Close
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteModal;
