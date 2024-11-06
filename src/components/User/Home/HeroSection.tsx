import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section
      className="h-screen bg-[url('/hero-bg.png')] bg-cover bg-center flex items-center overflow-hidden"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left side: Heading, buttons, and paragraph */}
        <div className="w-full md:w-1/2 ml-[50px]">
        <h1 className="text-4xl text-slate-700 font-bold mb-7 typing-animation">
                Join Voyago and discover hassle-free carpooling designed for your convenience.
          </h1>

           {/* Buttons */}
           <div className="flex space-x-4 mb-6">
           <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-2 px-6 shadow-lg rounded-full hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none"
>
  Sign Up
</motion.button>

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  className="border-2 border-blue-700 text-blue-700 font-medium py-2 px-6 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none"
>
  Learn More
</motion.button>


          </div>
          <motion.p
  className="text-slate-400 mb-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
>
  Join us as we explore the wonders of the world together. With VoyaGo, every journey is an opportunity to create unforgettable memories. Discover exciting adventures that inspire and transform your travel experiences!
</motion.p>
     
        </div>

        {/* Right side: Lottie animation */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className="hidden md:block w-full md:w-1/2"
        >
          <Player
            autoplay
            loop
            src={'/hero-animation.json'}
            style={{ height: '80%', width: '80%', background: 'transparent' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
