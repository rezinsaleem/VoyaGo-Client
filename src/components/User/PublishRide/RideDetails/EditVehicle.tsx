import {  useState } from 'react';
import Navbar from '../../Home/Navbar';
import { carMakesAndModels } from '../../../../utils/Cars';
import {motion} from 'framer-motion';
import { toast } from 'react-toastify';
// import axiosRide from "../../../../service/axios/axiosRide";
// import { useSelector } from 'react-redux';
// import { RideData } from '../../../../interfaces/interface';
import { useNavigate } from 'react-router-dom';

const EditVehicle = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [carModels, setCarModels] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  // const user = useSelector((store: { user: {user:string, userId: string, email:string, phoneNumber:string, image:string } }) => store.user);

  const navigate = useNavigate()

  

  // Handle input change to filter car makes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter makes based on input value
    const filteredMakes = Object.keys(carMakesAndModels).filter((make) =>
      make.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredMakes); // Set filtered makes as suggestions
    setCarModels([]); // Clear models when user is still typing
  };


  const handleSuggestionClick = (make: string) => {
    setSelectedMake(make); 
    setInputValue(make); 
    setSuggestions([]); 
    setCarModels(carMakesAndModels[make as keyof typeof carMakesAndModels]);
  };

  const handleModelClick = (model: string) => {
    const fullInput = `${selectedMake}, ${model}`;
    setInputValue(fullInput); 
    setCarModels([]); 
    setSelectedMake('');
  };


  const handlePublishClick = async() => {
    try {
     
        navigate('/ride-plan')
     
    } catch (error) {
      console.error(error);  
      toast.error((error as Error).message);
    }
  
  };

  return (
    <>
      <Navbar />
      <motion.h1
            className="text-4xl text-slate-700 text-center font-bold mt-7 mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
           Add Your Vehicle and Something <br /> About the Ride!
          </motion.h1>
      <div className="flex flex-col items-center max-h-screen p-4">
        <div className="relative w-full max-w-xl space-y-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add your car"
            className="border border-gray-400 text-gray-700 bg-gray-200 font-semibold p-3 w-full rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border text-gray-700 font-medium border-gray-200 w-full max-h-60 overflow-y-auto mt-2 rounded-lg shadow-lg">
              {suggestions.map((make, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(make)}
                  className="cursor-pointer p-3 hover:bg-indigo-50 transition-colors"
                >
                  {make}
                </li>
              ))}
            </ul>
          )}
          {selectedMake && carModels.length > 0 && (
            <div className="mt-6 bg-white border border-gray-200 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Models for <span className="text-indigo-600">{selectedMake}</span>:
              </h3>
              <ul className="space-y-2">
                {carModels.map((model, index) => (
                  <li
                    key={index}
                    onClick={() => handleModelClick(model)}
                    className="cursor-pointer p-2 rounded-md font-medium text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                  >
                    {model}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input
            type="text"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Anything to add about your ride? (optional)"
            className="border border-gray-400 bg-gray-200 p-3 w-full min-h-[100px] rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-semibold text-gray-700"
          />
          <div className='flex justify-center mt-3'>
          <button
              className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-4 w-[200px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-3 mb-10`}
              onClick={handlePublishClick} disabled={!inputValue}>
              Save Changes!
            </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default EditVehicle