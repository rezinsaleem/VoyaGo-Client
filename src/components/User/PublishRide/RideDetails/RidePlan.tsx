import { useEffect, useState } from "react";
import Navbar from "../../Home/Navbar";
import Swal from "sweetalert2";
import axiosRide from "../../../../service/axios/axiosRide";
import { RidePlanState } from "../../../../interfaces/interface";
import { toast } from "react-toastify";
import RouteModal from "../../RideBooking/BookRide/RouteModal";

const RidePlan = () => {
  const [selectedRide, setSelectedRide] = useState<RidePlanState | null>(null);
  const [endTimeFormat, setEndTimeFormat] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRideData();
  }, []);

  const fetchRideData = async () => {
    try {
      const currentRide = JSON.parse(
        localStorage.getItem("currentRide") || "{}"
      );
      const currentRideId = currentRide.rideId;
      const { data } = await axiosRide().get<RidePlanState>(
        `/getRide/${currentRideId}`
      );
      console.log(data);
      if (data) {
        setSelectedRide(data);
        const startDate = new Date(data.rideDate);

        const parseDuration = (durationString: string) => {
          const matches = durationString.match(
            /(\d+)\s*hours?\s*(\d+)?\s*mins?/
          );
          if (!matches) return { hours: 0, minutes: 0 };

          const hours = parseInt(matches[1] || "0", 10);
          const minutes = parseInt(matches[2] || "0", 10);
          return { hours, minutes };
        };
        const { hours, minutes } = parseDuration(data.duration);
        const endDate = new Date(
          startDate.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000
        );
        const endTimeFormatted = endDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setEndTimeFormat(endTimeFormatted);
      } else {
        toast.error("No Ride Found");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this ride?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the cancellation (e.g., make an API call or update state)
        Swal.fire("Cancelled!", "Your ride has been cancelled.", "success");
      }
    });
  };

  const convertTo24HourFormat = (time: string) => {
    const [timeStr, modifier] = time.split(" ");
    // eslint-disable-next-line prefer-const
    let [hours, minutes] = timeStr.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-700 text-center mb-4">
          Ride Plan
        </h1>

        <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />

        {/* Ride Details */}
        {selectedRide && (
          <>
            <div className="ml-2">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold ml-3 mt-4  text-gray-700 mb-4">
                  {new Date(selectedRide.rideDate).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "long",
                  })}
                </h2>
                <h2 className="text-xl font-bold mr-6 mt-4  text-gray-700 mb-4">
                 ₹ {selectedRide.pricePerSeat} 
                </h2>
              </div>
              <div className="space-y-6 cursor-pointer hover:bg-gray-100 rounded-lg p-4 transition-all duration-200"onClick={openModal}>
                {/* Starting Point */}
                <div className="flex items-start">
                  <div className="flex flex-col items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-3"></span>
                    <div className="w-0.5 bg-gray-400 h-[80px]"></div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-lg text-gray-700">
                      {convertTo24HourFormat(selectedRide.rideTime)}{" - "}
                      {selectedRide.start_address.split(",").slice(-3,-2)[0]}
                    </p>
                    <p className="text-md text-gray-600">
                      {selectedRide.start_address}
                    </p>
                  </div>
                </div>

                {/* Ending Point */}
                <div className="flex items-start">
                  <div className="flex flex-col items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full -mt-6"></span>
                  </div>
                  <div className="ml-4 -mt-9">
                    <p className="font-bold text-lg text-gray-700">
                      {endTimeFormat}{" - "}
                      {selectedRide.end_address.split(",").slice(-3,-2)[0]}
                    </p>

                    <p className="text-md text-gray-600">
                      {selectedRide.end_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

           <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />

            {/* Additional Ride Info */}
            <div className="space-y-4 ml-3">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Car: </span>
                {selectedRide.car}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Distance: </span>
                {selectedRide.distance}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Duration: </span>
                {selectedRide.duration}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Seats Available: </span>
                {selectedRide.numSeats}
              </p>
              {/* Conditionally render Additional Info only if it's available */}
              {selectedRide.additionalInfo &&
                selectedRide.additionalInfo.trim() !== "" && (
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">Additional Info: </span>
                    {selectedRide.additionalInfo}
                  </p>
                )}
            </div>

            <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />
            {/* Passengers Info */}
            <p className="text-gray-600 font-semibold ml-3 mb-6">
              {selectedRide.passengers.length === 0
                ? (<span className="text-yellow-800">No passengers booked for this ride!</span>)
                : selectedRide.passengers.map((passenger) => (
                    <div key={passenger.id}>
                      <p className="text-gray-600">
                        {passenger.name} - {passenger.phoneNumber}
                      </p>
                    </div>
                  ))}
            </p>

            <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />

            {/* Actions */}
            <div className="space-y-4 text-blue-500">
              <p className="text-gray-600 font-semibold ml-3">
                You can only edit your publication until no one has booked.
              </p>
              {selectedRide.passengers.length === 0 && (
                <>
                  <button className="flex items-center font-medium text-lg justify-between w-full text-left hover:bg-gray-100 rounded-lg p-3 transition-all duration-200">
                    Edit your Itinerary Plans <span>›</span>
                  </button>
                  <button className="flex items-center font-medium text-lg justify-between w-full text-left hover:bg-gray-100 rounded-lg p-3 transition-all duration-200">
                    Edit Vehicle or Add Additional Info <span>›</span>
                  </button>
                </>
              )}
            </div>

            <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />

            {/* Cancel Button */}
            <div className="mt-4 text-center">
              <button
                className=" py-3 font-semibold text-lg text-blue-400 hover:text-blue-600 transition-all duration-200"
                onClick={handleCancel}
              >
                Cancel this Ride!
              </button>
            </div>
          </>
        )}
         {isModalOpen && <RouteModal selectedRide={selectedRide!} onClose={closeModal} />}
      </div>
    </>
  );
};

export default RidePlan;
