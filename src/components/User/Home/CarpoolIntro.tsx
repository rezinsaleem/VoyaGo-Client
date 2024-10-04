import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const CarpoolIntro: React.FC = () => {
  return (
    <section
      className="h-screen flex items-center"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        
        <div className="hidden md:block w-full md:w-1/2 ">
        <Player
            autoplay
            loop
            src={'/carpool-animation.json'}
            style={{ height: '70%', width: '70%', background: 'transparent' }}
          />
          
        </div>

        <div className="w-full md:w-1/2 mr-6">
          <h1 className="text-4xl text-slate-700 font-bold mb-7 mt-5">Carpool with Confidence!</h1>
           
          <p className="text-slate-400 mb-6">
          At Voyago, carpooling is more than just sharing a ride—it's about creating a safe, reliable, and efficient way to travel. By connecting you with verified drivers and passengers heading in the same direction, we ensure a smooth and secure experience. Reduce your travel costs, cut down on traffic congestion, and lower your carbon footprint, all while enjoying the company of fellow travelers. With our robust platform, carpooling has never been easier or more trustworthy.
</p>
{/* Buttons */}
<div className="flex space-x-4 mb-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1  w-[120px] shadow-lg rounded-md">
              Book a Ride!
            </button>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default CarpoolIntro;
