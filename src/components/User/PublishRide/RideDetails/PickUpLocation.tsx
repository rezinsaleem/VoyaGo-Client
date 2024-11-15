import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { motion } from 'framer-motion';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Navbar from '../../Home/Navbar';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

interface PickUpLocationProps {
  heading: string;
  navigateRoute: string;
  storageKey: string;
}

const PickUpLocation: React.FC<PickUpLocationProps> = ({ heading, navigateRoute, storageKey }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ lat: 11.8747, lng: 75.3704 });
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const apiKey = import.meta.env.VITE_GOOGLE_API;
  const hasSelectedLocation = useRef(false);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    if (navigator.geolocation && !hasSelectedLocation.current) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          if (!hasSelectedLocation.current) {
            setPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleShowModal = () => {
    MySwal.fire({
      title: 'Why Exact Location?',
      html: '<p>Your exact location helps us provide you with the most accurate and convenient pickup options.</p>',
      icon: 'info',
      confirmButtonText: 'Got it!',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full',
      },
      buttonsStyling: false,
    });
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setPosition({ lat, lng });
      setAddress(address);
      hasSelectedLocation.current = true;
      setOpen(true);
    } catch (error) {
      MySwal.fire({
        title: 'Error',
        text: 'Could not fetch location data. Please try again.',
        icon: 'error',
      });
      console.log(error);
    }
  };

  const handleContinue = async() => {
    await localStorage.setItem(storageKey, JSON.stringify({
      lat: position.lat,
      lng: position.lng,
      address: address,
    }));
    navigate(navigateRoute);
    console.log("Location details saved:", { lat: position.lat, lng: position.lng, address });
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center'>
        <div className='w-1/2 p-5'>
          <motion.h1
            className="text-4xl text-slate-700 text-center font-bold mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {heading}
          </motion.h1>
          <button className='font-medium py-3 px-4 w-[200px] text-gray-500 border-2 border-gray-300 rounded-full mb-5' onClick={handleShowModal}>why exact location?</button>
          <Combobox onSelect={handleSelect}>
            <ComboboxInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              className="combobox-input w-full text-gray-600 font-semibold p-3 py-4 border border-gray-300 rounded-md"
              placeholder="Enter the address"
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} className=' bg-blue-50 text-lg text-gray-700 font-semibold' />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
          <div className='flex justify-center mt-1'>
            <button
              className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-4 w-[200px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-10 ${!value ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleContinue}
              disabled={!value}
            >
              continue
            </button>
          </div>
        </div>

        <div className='w-1/2 p-5'>
          <div className='w-[100%] h-[100vh]'>
            <APIProvider apiKey={apiKey}>
              <Map defaultCenter={position} defaultZoom={12}>
                <Marker position={position} onClick={() => setOpen(true)} />
                {open && (
                  <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                    <div>
                      <p>I'm here!</p>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default PickUpLocation;