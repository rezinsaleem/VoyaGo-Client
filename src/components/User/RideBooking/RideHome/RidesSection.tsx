import { useState } from "react";
import {motion} from 'framer-motion';

const RidesSection = () => {
  const [showMore, setShowMore] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const rides = [
    { from: "New Delhi", to: "Chandigarh" },
    { from: "New Delhi", to: "Jaipur" },
    { from: "New Delhi", to: "Agra" },
    { from: "New Delhi", to: "Lucknow" },
    { from: "New Delhi", to: "Mumbai" },
    { from: "New Delhi", to: "Bangalore" },
    { from: "New Delhi", to: "Pune" },
    { from: "New Delhi", to: "Hyderabad" },
    { from: "New Delhi", to: "Kolkata" },
  ];

  const toggleRides = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <>
       <motion.div
            className="bg-slate-600 text-white py-12 px-6 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
      {/* Heading */}
      <div className="min-w-[1050px]">
      <h2 className="text-2xl lg:text-3xl font-bold  mb-8">
        Where do you want to go?
      </h2>

      {/* Ride Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        {rides.slice(0, showMore ? rides.length : 3).map((ride, index) => (
          <div
            key={index}
            className="bg-white text-slate-700 font-semibold px-6 py-4 rounded-lg shadow-md w-full max-w-md flex items-center justify-between hover:bg-gray-200 cursor-pointer"
          >
            <span>
              {ride.from} → {ride.to}
            </span>
            <span>→</span>
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      <div className="text-right mt-6">
        <button
          onClick={toggleRides}
          className="text-blue-300 font-semibold hover:underline"
        >
          {showMore ? "See fewer rides" : "See our most popular rides"}
        </button>
      </div>
      </div>
      </motion.div>

       {/* Fourth Section - FAQ */}
       <motion.section
      className="p-12 bg-white text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
  <h1 className="text-3xl font-bold text-gray-700 mb-8">Carpool Help Centre</h1>
  <div className="flex flex-wrap justify-center gap-8">
    {[
      { question: "How do I book a carpool ride?", answer: "You can book a carpool ride on our mobile app, or on blablacar.in. Simply search for your destination, choose the date you want to travel and pick the carpool that suits you best! Some rides can be booked instantly, while other rides require manual approval from the driver. Either way, booking a carpool ride is fast, simple and easy." },
      { question: "How do I set the passenger contribution for my ride?", answer: "We recommend a contribution per passenger on your rides. These suggestions help you set fair contributions for your rides (those most likely to get your seats filled!), but can still be adjusted within a margin of our recommendation." },
      { question: "How much does a carpool ride cost?", answer: "The costs of a carpool ride can vary greatly, and depend on factors like distance, time of departure, the demand of that ride and more. It is also up to the driver to decide how much to charge per seat, so it’s hard to put an exact price tag on a ride. Check out some of our top carpool destinations to get an idea of price, or start searching for your next carpool ride on VoyaGo." },
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
</motion.section>
      </>
  );
};

export default RidesSection;
