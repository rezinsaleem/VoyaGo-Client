import React from 'react';
import { motion } from 'framer-motion';

const OfferRide: React.FC = () => {
  return (
    <motion.section
      className="h-screen flex items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
   
        <div className="w-full md:w-1/2 ml-[50px]">
          <motion.h1
            className="text-4xl text-slate-700 font-bold mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Offer a Ride and Earn with VoyaGo!
          </motion.h1>
          
          <motion.p
            className="text-slate-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            With VoyaGo, you can easily publish your ride, connect with passengers, and earn while helping others reach their destinations. 
            Our platform makes it simple to share your journey, whether you're commuting or taking a road trip. Start offering rides today 
            and experience the benefits of flexible, eco-friendly travel.
          </motion.p>

          <motion.div
            className="flex space-x-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-2 px-4 w-[140px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              Offer a Ride!
            </motion.button>
          </motion.div>
        </div>

        <div className="hidden md:block w-full md:w-1/2">
          <motion.img
            src="/offerride.webp"
            alt=""
            className="w-[400px] ml-[90px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default OfferRide;
