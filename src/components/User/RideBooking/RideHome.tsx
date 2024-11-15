import { Player } from "@lottiefiles/react-lottie-player";
import Navbar from "../Home/Navbar";
import { motion } from 'framer-motion';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles
import { FaCalendarAlt, FaLocationArrow, } from "react-icons/fa";

const RideHome = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // state for selected date

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // safely update the date, even if it's null
  };

  return (
    <>
      <Navbar />
      <section className="bg-[url('/bg-pattern-light.svg')] relative text-center p-12 min-h-[400px] shadow-md">
        {/* Lottie animation as background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Player
            autoplay
            loop
            src={'/ride-book-animation.json'}
            style={{ height: '50%', width: '100%', background: 'transparent' }} // Reduced height to 50%
          />
        </div>

        {/* Content above the animation */}
        <motion.h1
          className="text-4xl text-slate-700 font-bold mb-7 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
          <span className="text-gray-600">Go</span> - Taking you places without breaking <br />
          the bank!
        </motion.h1>

        {/* Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 border-2 border-slate-200 bg-white p-6 rounded-xl shadow-xl w-[85%] md:w-[60%] flex space-x-4 z-10 bottom-[-60px]">
          {/* Leaving from */}
          <div className="w-1/4 flex items-center bg-slate-100 rounded-md p-2">
            <FaLocationArrow className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Leaving from" 
              className="w-full text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
            />
          </div>

          {/* Vertical separator */}
          <div className="w-px bg-gray-300 mx-2"></div>

          {/* Going to */}
          <div className="w-1/4 flex items-center bg-slate-100 rounded-md p-2">
            <FaLocationArrow className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Going to" 
              className="w-full text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
            />
          </div>

          {/* Vertical separator */}
          <div className="w-px bg-gray-300 mx-2"></div>

          {/* Date */}
          <div className="w-1/4 flex items-center bg-slate-100 rounded-md p-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange} // pass the updated handler
              className="w-full text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
              dateFormat="MMMM d, yyyy"
              placeholderText="Select Date"
            />
          </div>

          {/* Vertical separator */}
          <div className="w-px bg-gray-300 mx-2"></div>

          {/* Search Button */}
          <div className="w-1/4 flex justify-center items-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
             Search
            </button>
          </div>
        </div>
      </section>
     
    </>
  );
};

export default RideHome;
