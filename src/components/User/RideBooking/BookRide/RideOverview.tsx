import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar"
import { useState } from "react";
import RouteModal from "./RouteModal";
import { FaComments } from "react-icons/fa";
import axiosRide from "../../../../service/axios/axiosRide";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

interface Passenger {
  id: string;
  name: string;
  phoneNumber: number;
}

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
  const REGION = import.meta.env.VITE_AWS_S3_REGION;

const RideOverview = () => {
  const location = useLocation();
  const { rideDetails } = location.state || {};
  console.log(rideDetails);

  const queryDetails = { id: rideDetails.riderDetails._id, name: rideDetails.riderDetails.name, userImage: rideDetails.riderDetails.userImage };
  const queryString = encodeURIComponent(JSON.stringify(queryDetails));

  const user = useSelector((store: { user: {user:string, userId: string, email:string, phoneNumber:string, image:string,isVerified?: string } }) => store.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

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

  function loadScript(src: string) {
    return new Promise((resolve, reject) => {
      // Check if the script already exists
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load script'));
      document.body.appendChild(script);
    });
  }
  
  const handleOnlinePayment = async () => {
    try {
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!scriptLoaded) {
        toast.error('Failed to load Razorpay SDK. Please check your internet connection.');
        return;
      }
  
      // Fetch order details from the server
      const { data: orderDetails } = await axiosRide().post(`/payment/${rideDetails._id}`, {
        amount: rideDetails.pricePerSeat * 100, // Convert to paise
        currency: 'INR',
      });
  
      if (!orderDetails) {
        toast.error('Failed to create order. Please try again later.');
        return;
      }
  
      const { amount, id: order_id, currency } = orderDetails;
  
      const options = {
        key: 'rzp_test_3TxK9TdVgtd1BD', // Use Razorpay test key
        amount: amount.toString(),
        currency,
        name: 'VoyaGo',
        description: 'Ride Payment',
        image: 'https://i.ibb.co/crz5BxX/voyago.jpg', // Add a valid path or URL
        order_id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
          try {
            const paymentData = {
              amount,
              paymentType: 'onlinePayment',
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              passengerName : user.user,
              passengerId : user.userId,
              passengerPhone : user.phoneNumber,
              passengerImage : user.image,
              passengerEmail : user.email,
              riderId : rideDetails.riderId,
              riderName : rideDetails.riderDetails.name,
              riderEmail : rideDetails.riderDetails.email,
              riderPhone : rideDetails.riderDetails.phoneNumber,

            };
  
            const result = await axiosRide().post(`/paymentSuccess/${rideDetails._id}`, paymentData);
  
            if (result.data.message === 'success') {
              toast.success('Payment successful!');
              rideDetails.numSeats -= 1;
              navigate('/')
              // Redirect or update UI
            } else {
              toast.error(result.data.message || 'Payment verification failed.');
            }
          } catch (error) {
            console.log(error);
            toast.error('Failed to process payment. Please contact support.');
          }
        },
        prefill: {
          name: user.user,
          email: user.email,
          contact: user.phoneNumber,
        },
        notes: {
          address: 'VoyaGo Corporate Office',
        },
        theme: {
          color: '#6fba47',
        },
      };
  
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.log(error);
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Example usage
  const endTime = calculateEndTime(rideDetails.rideTime, rideDetails.duration);
  return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto p-6">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-700 text-center mb-4">
            Ride Overview
          </h1>

          <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />
  
          {/* Ride Details */}
          {rideDetails && (
            <>
              <div className="ml-2">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold ml-3 mt-4  text-gray-700 mb-4">
                    {new Date(rideDetails.rideDate).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "2-digit",
                      month: "long",
                    })}
                  </h2>
                  <h2 className="text-xl font-bold mr-6 mt-4  text-gray-700 mb-4">
                   ₹ {rideDetails.pricePerSeat} 
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
                        {rideDetails.rideTime}{" - "}
                        {rideDetails.start_address.split(",").slice(-3,-2)[0]}
                      </p>
                      <p className="text-md text-gray-600">
                        {rideDetails.start_address}{` (${Math.round(rideDetails.startDistance)} km away)`}
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
                        {endTime}{" - "}
                        {rideDetails.end_address.split(",").slice(-3,-2)[0]}
                      </p>
  
                      <p className="text-md text-gray-600">
                        {rideDetails.end_address}{` (${Math.round(rideDetails.endDistance)} km away)`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />
  
              {/* Additional Ride Info */}
              <div className="space-y-4 ml-3">
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Car : </span>
                  {rideDetails.car}
                </p>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Distance : </span>
                  {rideDetails.distance}
                </p>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Duration : </span>
                  {rideDetails.duration}
                </p>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Seats Available : </span>
                  {rideDetails.numSeats}
                </p>
                {/* Conditionally render Additional Info only if it's available */}
                {rideDetails.additionalInfo &&
                  rideDetails.additionalInfo.trim() !== "" && (
                    <p className="text-gray-700 text-lg">
                      <span className="font-semibold">Additional Info : </span>
                      {rideDetails.additionalInfo}
                    </p>
                  )}
              </div>
  
              <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />
             
               <p className="text-gray-600 font-semibold ml-3 mb-6">
                {rideDetails.passengers.length === 0
                  ? (<span className="text-yellow-800">No passengers booked for this ride!</span>)
                  : rideDetails.passengers.map((passenger:Passenger) => (
                      <div key={passenger.id}>
                        <p className="text-gray-600">
                          {passenger.name} - {passenger.phoneNumber}
                        </p>
                      </div>
                    ))}
              </p>
  
             
  
              <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />

              <div className="space-y-4 ml-3">
                <div className="flex space-x-4 justify-between">
              <img
        src={
          rideDetails.riderDetails.userImage
            ? `https://${BUCKET}.s3.${REGION}.amazonaws.com/${rideDetails.riderDetails.userImage}`
            : "userdefault.jpg"
        }
        alt="Driver"
        className="w-12 h-12 rounded-full object-cover"
      />
      {rideDetails.riderDetails.isVerified === "true" && (
        <span className="flex items-center text-green-700  border border-green-700 rounded-full h-9 mr-7 px-7">
          Verified
        </span>
      )}
      </div>
     
                <p className="text-gray-700 text-lg mt-3">
                  <span className="font-semibold">Driver : </span>
                  {rideDetails.riderDetails.name}
                </p>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Email : </span>
                  {rideDetails.riderDetails.email}
                </p>
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold">Mobile : </span>
                  {rideDetails.riderDetails.phoneNumber}
                </p>
              </div>
  
              <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />
  
              <button className="flex items-center font-medium text-lg justify-between w-full text-left hover:bg-gray-100 rounded-lg p-3 transition-all duration-200"
              onClick={()=>{navigate(`/inbox/${queryString}`)}}>
                <span className="flex">
              <FaComments className="text-blue-400 mt-[5px]  mx-3" /> 
              <span className="text-blue-400 font-medium">Ask Driver a Question</span></span> <span className="text-blue-400 font-medium text-lg mr-4">›</span>
                  </button>

                  <hr className="rounded-lg w-full bg-gray-200 h-1 my-6" />
  
              <div className="mt-4 text-center">
                <button
                  className=" bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-4 w-[200px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-10"
                  onClick={handleOnlinePayment}
                >
                  Pay & Book Now 
                </button>
              </div>
            </>
          )}
           {isModalOpen && <RouteModal selectedRide={rideDetails} onClose={closeModal} />}
        </div>
      </>
    
  )
}

export default RideOverview