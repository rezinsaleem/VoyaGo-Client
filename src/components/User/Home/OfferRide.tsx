import React from 'react';


const OfferRide: React.FC = () => {
  return (
    <section
      className="h-screen flex items-center"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
   
        <div className="w-full md:w-1/2 ml-[50px]">
          <h1 className="text-4xl text-slate-700 font-bold mb-7 typing-animation">Offer a Ride and Earn with VoyaGo!</h1>
      
           
          <p className="text-slate-400 mb-6">
          With VoyaGo, you can easily publish your ride, connect with passengers, and earn while helping others reach their destinations. 
  Our platform makes it simple to share your journey, whether you're commuting or taking a road trip. Start offering rides today 
  and experience the benefits of flexible, eco-friendly travel.
</p>

<div className="flex space-x-4 mb-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 w-[140px] shadow-lg rounded-md">
              Offer a Ride!
            </button>
            
          </div>


         
        </div>

      
        <div
          className="hidden md:block w-full md:w-1/2"
        >
          <img src="/offerride.webp" alt="" className='w-[400px] ml-[90px]' />
        </div>
      </div>
    </section>
  );
};

export default OfferRide;
