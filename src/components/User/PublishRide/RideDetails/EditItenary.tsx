import { useEffect, useState } from "react";
import Navbar from "../../Home/Navbar";
import {  useNavigate, useParams } from "react-router-dom";
import {motion} from 'framer-motion';
import { FaMinus, FaPlus } from "react-icons/fa";


const EditItenary = () => {
  const { rideId, pricePerSeat, numSeats } = useParams();
const [numOfSeats, setNumOfSeats] = useState<number>(2);
const [seatPrice, setSeatPrice] = useState<number>(500);
const navigate = useNavigate();

useEffect(() => {
  // Ensure that numSeats and pricePerSeat are not undefined and can be converted to numbers
  if (numSeats && pricePerSeat) {
    setNumOfSeats(parseInt(numSeats));  // Convert to number (or use parseFloat if it's a decimal)
    setSeatPrice(parseInt(pricePerSeat));  // Convert to number
  }
}, [numSeats, pricePerSeat]);


   

  const incrementSeats = () => {
    if (numOfSeats < 3) setNumOfSeats(numOfSeats + 1);
  };

  const decrementSeats = () => {
    if (numOfSeats > 1) setNumOfSeats(numOfSeats - 1);
  };

  const incrementPrice = () => {
    setSeatPrice(seatPrice + 10);
  };

  const decrementPrice = () => {
    if (seatPrice > 250) setSeatPrice(seatPrice - 10);
  };

  const handleSave = async()=>{
    try {
   console.log(rideId);
   navigate('/ride-plan')
     
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
        disabled={numOfSeats <= 1}
        className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-full p-3"
      >
        <FaMinus size={18} />
      </button>
      <span className="text-[120px] font-bold text-blue-500 px-5">{numOfSeats}</span>
      <button
        onClick={incrementSeats}
        disabled={numOfSeats >= 4}
        className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-full p-3"
      >
        <FaPlus size={18} />
      </button>
    </div>
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
              onClick={handleSave}>
              Save Changes
            </button>
          </div>
    </>
  );
}

export default EditItenary