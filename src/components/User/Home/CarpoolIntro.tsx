import React, {  useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion, useInView } from 'framer-motion';

const CarpoolIntro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true }); // Animate only once when the section is in view

  return (
    <motion.section
      ref={sectionRef}
      className="h-screen flex items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="hidden md:block w-full md:w-1/2">
          <Player
            autoplay
            loop
            src={'/carpool-animation.json'}
            style={{ height: '70%', width: '70%', background: 'transparent' }}
          />
        </div>

        <div className="w-full md:w-1/2 mr-6">
          <motion.h1
            className="text-4xl text-slate-700 font-bold mb-7 mt-5"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            Carpool with Confidence!
          </motion.h1>

          <motion.p
            className="text-slate-400 mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            At Voyago, carpooling is more than just sharing a ride—it's about creating a safe, reliable, and efficient way to travel. By connecting you with verified drivers and passengers heading in the same direction, we ensure a smooth and secure experience. Reduce your travel costs, cut down on traffic congestion, and lower your carbon footprint, all while enjoying the company of fellow travelers. With our robust platform, carpooling has never been easier or more trustworthy.
          </motion.p>

          {/* Button with Hover Effect */}
          <motion.div className="flex space-x-4 mb-6">
          <motion.button
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-2 px-4 w-[140px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              Book a Ride!
            </motion.button>
         
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CarpoolIntro;
