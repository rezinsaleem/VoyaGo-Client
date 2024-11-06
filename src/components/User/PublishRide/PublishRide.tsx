import React, { useState } from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import {motion} from 'framer-motion'
import { FaMapMarkerAlt, FaUserFriends, FaCar, FaRegCheckCircle, FaUserEdit, FaUserCircle,  } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';



const PublishRide: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const navigate = useNavigate()

  // Function to toggle question expansion
  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* First Section */}
      <section className="bg-[url('/bg-pattern-light.svg')]  text-center  p-12">
      <motion.h1
            className="text-4xl text-slate-700 font-bold mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >Become a  <span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
            <span className="text-gray-600">Go</span> driver and save on travel costs by sharing your ride with passengers. </motion.h1>
      <div className='flex justify-center items-center mt-10'>
      <motion.div
  className="w-1/2 p-6"
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
>
<form className="p-8 rounded-xl shadow-xl bg-gradient-to-r from-blue-50 to-blue-200 space-y-6 max-w-sm mx-auto">
  <h2 className="text-2xl font-bold text-gray-600 text-center mb-4">Publish Your Ride</h2>
  
  <div className="relative">
    <FaMapMarkerAlt className="absolute top-[18px] left-[14px] text-blue-500" />
    <input
      type="text"
      value="Bengaluru"
      readOnly
      className="w-full p-3 font-semibold pl-10 border border-gray-300 rounded-lg text-gray-600 focus:outline-none cursor-not-allowed"
      placeholder="Departure"
    />
  </div>

  <div className="relative">
    <FaMapMarkerAlt className="absolute top-[18px] left-[14px] text-green-500" />
    <input
      type="text"
      value="Kannur"
      readOnly
      className="w-full p-3 font-semibold pl-10 border border-gray-300 rounded-lg text-gray-600 focus:outline-none cursor-not-allowed"
      placeholder="Destination"
    />
  </div>

  <div className="relative">
    <FaUserFriends className="absolute top-[18px] left-[14px] text-purple-500" />
    <input
      type="number"
      value="2"
      readOnly
      className="w-full p-3 font-semibold pl-10 border border-gray-300 rounded-lg text-gray-600 focus:outline-none cursor-not-allowed"
      placeholder="Passengers"
    />
  </div>
  
    <button 
     onClick={() => navigate('/ride-pickup')} 
      className="w-full flex items-center justify-center text-white py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
    >
      <FaCar className="mr-2" />
      Publish Ride
    </button>
  
</form>

 </motion.div>

 <motion.div
  className="w-1/2  h-[450px] bg-[url('/bg-publish.svg')] bg-cover bg-center bg-no-repeat "
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
></motion.div>
          
        </div>
      </section>
      <hr className="h-[10px] bg-white/30 backdrop-blur-sm" />


      {/* Second Section */}
      <section className="bg-blue-100 p-12 text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">Drive. Share. Save.</h1>
        <div className="flex justify-around space-x-8">
          {[
            {
              title: "Drive",
              description: "Keep your plans! Hit the road just as you anticipated and make the most of your vehicle’s empty seats.",
            },
            {
              title: "Share",
              description: "Travel with good company. Share a memorable ride with travellers from all walks of life.",
            },
            {
              title: "Save",
              description: "Tolls, petrol, electricity… Easily divvy up all the costs with other passengers.",
            },
          ].map((item, index) => (
            <div key={index} className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-500 mb-4">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Third Section */}
      <section className=" p-12 flex items-center">
        <div className="w-1/2">
          {/* Video placeholder */}
          <iframe
            src="https://www.youtube.com/embed/oZr8xoR-_U0"
            className="w-full h-64 rounded-lg"
            title="How to Publish Your Ride"
          />
        </div>
        <div className="w-1/2 pl-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Publish your ride in just minutes</h1>
          <ul className="space-y-2 font-medium text-gray-700">
  <li className="flex items-start">
    <FaUserCircle className="mr-2 mt-[6px]" />
    Create a VoyaGo account
  </li>
  <li className="flex items-start">
    <FaUserEdit className="mr-2 mt-[6px]" />
    Add your profile picture, a few words about you and your phone number to increase trust between members.
  </li>
  <li className="flex items-start">
    <FaMapMarkerAlt className="mr-2  mt-[6px]" />
    Publish your ride: Indicate departure and arrival points, date, and check our recommended price.
  </li>
  <li className="flex items-start">
    <FaRegCheckCircle className="mr-2 mt-[6px]" />
    Accept booking requests: Review passenger profiles and accept their requests to ride with you.
  </li>
</ul>

        </div>
      </section>

      {/* Fourth Section - FAQ */}
      <section className="p-12 bg-blue-50 text-center">
  <h1 className="text-3xl font-bold text-gray-700 mb-8">Frequently Asked Questions</h1>
  <div className="flex flex-wrap justify-center gap-8">
    {[
      { question: "When do I get the Money?", answer: "We send your money 48 hours after the ride if you travelled as planned. You’ll get your money 1 to 5 weekdays (not counting weekends and holidays) after we send it. If you don’t see any money in Awaiting transfers, it’s because we already sent it. You can check out what we’ve sent in your Transfer history." },
      { question: "How do I set the passenger contribution for my ride?", answer: "We recommend a contribution per passenger on your rides. These suggestions help you set fair contributions for your rides (those most likely to get your seats filled!), but can still be adjusted within a margin of our recommendation." },
      { question: "What should I do if there’s an error with my ride?", answer: "You should edit your ride as soon as you spot the error. If you can’t edit your ride because passengers have already booked, contact them explaining the mistake. If the changes don’t suit them, you should cancel your ride and publish a new one." },
      { question: "What if I need to cancel a ride?", answer: "You can cancel a ride by going to your rides section and selecting 'Cancel Ride'. However, if a driver cannot fulfill a ride that has been already booked, it is their responsibility to cancel in a timely manner to allow the passenger time to adjust their plans. Before cancelling we advise drivers to let passengers know by message that they cannot travel anymore." },
    ].map((item, index) => (
      <div
        key={index}
        className="w-full md:w-[45%] p-4 flex flex-col justify-between min-h-[150px] border-b border-gray-300"
      >
        <div>
          <h3
            className="text-lg font-semibold text-gray-700 cursor-pointer text-left"
            onClick={() => toggleExpand(index)}
          >
            {item.question}
          </h3>
          <p
            className={`mt-2 text-gray-700 text-left ${
              expanded === index ? 'block' : 'line-clamp-2'
            }`}
          >
            {item.answer}
          </p>
        </div>
        <div className="text-left mt-2">
          {expanded !== index && (
            <button
              className="text-blue-600"
              onClick={() => toggleExpand(index)}
            >
              See More
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Fifth Section - Sticky Button */}
      <div className="sticky bottom-0 flex justify-center backdrop-blur-lg bg-white/50 z-50 p-4 text-center">
      <Link to='/ride-pickup'>
         <button className="flex items-center space-x-2 border-2 border-blue-500 bg-transparent text-blue-500 font-semibold py-1 px-3 rounded-full transition duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg">
            <FaCar className="text-lg" />
            <span>Publish a Ride</span>
          </button>
          </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublishRide;
