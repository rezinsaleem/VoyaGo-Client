/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Navbar from "../../Home/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

const RideDetails = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numSeats, setNumSeats] = useState<number>(2);
  const [seatPrice, setSeatPrice] = useState<number>(500);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [minTime, setMinTime] = useState<Date>(new Date());
  const navigate = useNavigate()

  useEffect(()=>{
    const routeDetails = JSON.parse(localStorage.getItem("routeDetails") || '{}');
    const distance = Number(routeDetails.distance.replace(/,/g, '').split(' ')[0]);
    const price  = Math.round((distance*3) / 10) * 10;
    setSeatPrice(price)
  },[])

  const currentDate = new Date();

  // Define the default minTime and maxTime
  const minDefaultTime = new Date();
  minDefaultTime.setHours(0, 0, 0, 0); // Midnight

  const maxTime = new Date();
  maxTime.setHours(23, 45, 0, 0); // End of the day

  useEffect(() => {
    // Set the initial date to today with minTime restriction
    setSelectedDate(currentDate);
    const initialMinTime = new Date(currentDate);
    initialMinTime.setHours(currentDate.getHours() + 3);
    setMinTime(initialMinTime);
    setSelectedTime(initialMinTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const localDateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
      const localDate = new Date(localDateString); 
      setSelectedDate(localDate);
    }
    
    if (date) {
      const isToday = date.toDateString() === currentDate.toDateString();
      const newMinTime = isToday 
        ? new Date(new Date().setHours(new Date().getHours() + 3))  // 3 hours from now if today
        : minDefaultTime;  // Midnight if not today
  
      setMinTime(newMinTime);
  
      // Update selectedTime to match the newly selected time from the DatePicker
      setSelectedTime(date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }
  };

  const incrementSeats = () => {
    if (numSeats < 3) setNumSeats(numSeats + 1);
  };

  const decrementSeats = () => {
    if (numSeats > 1) setNumSeats(numSeats - 1);
  };

  const incrementPrice = () => {
    setSeatPrice(seatPrice + 10);
  };

  const decrementPrice = () => {
    if (seatPrice > 250) setSeatPrice(seatPrice - 10);
  };

  const handleContinue = async()=>{
    try {
      await localStorage.setItem('datePriceDetail', JSON.stringify({
        date : selectedDate,
        time : selectedTime,
        priceperseat : seatPrice,
        numofseat : numSeats,
      }));
      navigate('/ride-vehicle');
      console.log("details saved:", {
        date : selectedDate,
        time : selectedTime,
        priceperseat : seatPrice,
        numofseat : numSeats,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />

      <motion.h1
        className="text-4xl text-slate-700 text-center font-bold mb-12 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Select the following details of the ride!
      </motion.h1>

      <div className="p-7 flex  gap-6 justify-center items-start">
  <div className="w-[33.33%] rounded-lg p-5 flex flex-col items-center">
    <h2 className="m-3 font-bold text-xl text-gray-800 text-center">Number of Seats</h2>
    <p className="mb-3 font-semibold text-gray-400 text-center">
      (You can only have max 2 in the back!)
    </p>
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={decrementSeats}
        disabled={numSeats <= 1}
        className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-full p-3"
      >
        <FaMinus size={18} />
      </button>
      <span className="text-[120px] font-bold text-blue-500 px-5">{numSeats}</span>
      <button
        onClick={incrementSeats}
        disabled={numSeats >= 4}
        className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-full p-3"
      >
        <FaPlus size={18} />
      </button>
    </div>
  </div>

  <div className="w-[33.33%] rounded-lg p-5 flex flex-col items-center">
    <h2 className="m-3 font-bold text-xl text-gray-800 text-center">Date & Time</h2>
    <p className="mb-3 font-semibold text-gray-400 text-center">
      (You need to publish the ride 3 hours prior!)
    </p>
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={currentDate}
      minTime={selectedDate && selectedDate.toDateString() === currentDate.toDateString() ? minTime : minDefaultTime}
      maxTime={maxTime}
      showTimeSelect
      timeFormat="HH:mm"
      dateFormat="MMMM d, yyyy h:mm aa"
      timeIntervals={15}
      className="border p-2 rounded-md w-full"
      inline
    />
    {selectedDate && (
      <p className="mt-4 text-gray-600 text-center">
        Selected Date & Time:{" "}
        <span className="font-semibold">{selectedDate.toLocaleDateString()}</span> at{" "}
        <span className="font-semibold">{selectedTime}</span>
      </p>
    )}
  </div>

  <div className="w-[33.33%] rounded-lg p-5 flex flex-col items-center">
    <h2 className="m-3 font-bold text-xl text-gray-800 text-center">Price per seat</h2>
    <p className="mb-3 font-semibold text-gray-400 text-center">
      (Good fare, more passengers!)
    </p>
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={decrementPrice}
        disabled={seatPrice <= 250}
        className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-full p-3"
      >
        <FaMinus size={18} />
      </button>
      <span className="text-[110px] font-bold text-green-500 px-5">₹{seatPrice}</span>
      <button
        onClick={incrementPrice}
        className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-full p-3"
      >
        <FaPlus size={18} />
      </button>
    </div>
  </div>
</div>
<div className='flex justify-center mt-3'>
            <button
              className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-4 w-[200px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-3 mb-10`}
              onClick={handleContinue}>
              continue
            </button>
          </div>
    </>
  );
};

export default RideDetails;
