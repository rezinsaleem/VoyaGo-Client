import Navbar from "../../Home/Navbar"
import { useState, useEffect } from "react";
import { APIProvider, Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const RideRoute = () => {
   const position = { lat: 11.8747, lng: 75.3704 }
  const apiKey = import.meta.env.VITE_GOOGLE_API;

  return (
    <>
    <Navbar/>
    <div className="items-center">
      
    <motion.h1
            className="text-4xl text-slate-700 text-center font-bold mb-7 mt-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
           Which is your route?
          </motion.h1>
      <div className="w-full p-5">
      <div className='relative w-[100%] h-[100vh]'>
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={position} defaultZoom={15} fullscreenControl={false}>
          <Directions/>
        </Map>
      </APIProvider>
      </div>
      </div>
    </div>
    
    </>
  )
}

export default RideRoute


function Directions(){
const map = useMap();
const routesLibrary = useMapsLibrary('routes');
const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
const [routes,setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
const [routeIndex,setRouteIndex] = useState(0);
const selected = routes[routeIndex];
const leg = selected ?.legs[0];
const navigate = useNavigate();

useEffect(()=>{
  if(!routesLibrary || !map) return;
  setDirectionsService(new routesLibrary.DirectionsService());
  setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
},[routesLibrary,map])

useEffect(()=>{
  if(!directionsRenderer || !directionsService) return;
const pickUpLocation = JSON.parse(localStorage.getItem("pickUpLocation") || '{}');
const dropOffLocation = JSON.parse(localStorage.getItem("dropOffLocation") || '{}');

 directionsService.route({
  origin: pickUpLocation.address, 
  destination: dropOffLocation.address,
  travelMode: google.maps.TravelMode.DRIVING,
  provideRouteAlternatives: true,
 }).then(response =>{
  directionsRenderer.setDirections(response);
  setRoutes(response.routes);
 })

},[directionsRenderer,directionsService])

console.log(routes);

useEffect(()=>{
  if(!directionsRenderer) return;
  directionsRenderer.setRouteIndex(routeIndex);
},[routeIndex,directionsRenderer])

const handleContinue = async() => {
  await localStorage.setItem('routeDetails', JSON.stringify({
    route : selected.summary,
    start_address: leg.start_address,
    end_address: leg.end_address,
    distance: leg.distance?.text,
    duration: leg.duration?.text,
  }));
  navigate('/ride-details');
  console.log("Route details saved:", {
    route : selected.summary,
    start_address: leg.start_address,
    end_address: leg.end_address,
    distance: leg.distance?.text,
    duration: leg.duration?.text,
  });
};

 if(!leg) return null;

 return(
  <div className="absolute top-5 right-5 w-80 backdrop-blur-lg bg-white/80 text-gray-600 font-semibold p-4 rounded-lg shadow-lg z-10 max-w-full">
  <h1 className="text-xl font-bold text-gray-800">{selected.summary}</h1>
  <p className="text-sm text-gray-500 mt-2">
    {leg.start_address} -<br/> {leg.end_address}
  </p>
  <p className="text-sm text-gray-500 mt-2">
    <strong>Distance:</strong> {leg.distance?.text}
  </p>
  <p className="text-sm text-gray-500 mt-2">
    <strong>Duration:</strong> {leg.duration?.text}
  </p>
  <h2 className="mt-4 text-lg font-semibold text-gray-800">Choose your Route</h2>
  <ul className="mt-2 space-y-2">
    {routes.map((route, index) => (
      <li key={route.summary} className="border-b last:border-none">
        <button
          className="w-full text-left p-2 bg-blue-100 hover:bg-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setRouteIndex(index)}
        >
          {route.summary}
        </button>
      </li>
    ))}
  </ul>

  <div className='flex justify-center mt-1'>
            <button
              className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-4 w-[200px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-5 ${!selected ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleContinue}
              disabled={!selected}
            >
              continue
            </button>
          </div>
</div>

 )
}