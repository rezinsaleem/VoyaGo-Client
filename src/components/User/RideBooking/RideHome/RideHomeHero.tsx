import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

const RideHomeHero = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [leavingFrom, setLeavingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Custom Hook for Place Autocomplete
  const usePlaces = (_address: string, setAddress: React.Dispatch<React.SetStateAction<string>>) => {
    const { ready, value, suggestions, setValue, clearSuggestions } = usePlacesAutocomplete();

    const handleSelect = async (address: string) => {
      setValue(address, false);
      setAddress(address);
      clearSuggestions();

      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        console.log("Coordinates:", { lat, lng });
      } catch (error) {
        console.error("Error fetching geocode:", error);
      }
    };

    return { ready, value, suggestions, setValue, handleSelect };
  };

  const leavingFromProps = usePlaces(leavingFrom, setLeavingFrom);
  const goingToProps = usePlaces(goingTo, setGoingTo);

  return (
    <section className="bg-[url('/carpool-bg.svg')] bg-cover relative text-center p-12 min-h-[380px] shadow-md">
      {/* Title Section */}
      <motion.h1
        className="text-4xl text-white font-bold mb-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
        <span className="text-gray-600">Go</span> - Taking you places without breaking the bank!
      </motion.h1>

      {/* Search Section */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-lg flex items-center p-4  max-w-4xl absolute -bottom-[40px] ml-36">
        {/* Leaving From */}
        <div className="relative flex-1 p-2">
          <FaLocationArrow className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Combobox onSelect={leavingFromProps.handleSelect}>
            <ComboboxInput
              value={leavingFromProps.value}
              onChange={(e) => leavingFromProps.setValue(e.target.value)}
              disabled={!leavingFromProps.ready}
              className="w-full pl-10 bg-transparent text-gray-600 font-semibold outline-none"
              placeholder="Leaving from"
            />
            <ComboboxPopover>
              <ComboboxList>
                {leavingFromProps.suggestions.status === "OK" &&
                  leavingFromProps.suggestions.data.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>

        {/* Going To */}
        <div className="relative flex-1 p-2">
          <FaLocationArrow className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Combobox onSelect={goingToProps.handleSelect}>
            <ComboboxInput
              value={goingToProps.value}
              onChange={(e) => goingToProps.setValue(e.target.value)}
              disabled={!goingToProps.ready}
              className="w-full pl-10 bg-transparent text-gray-600 font-semibold outline-none"
              placeholder="Going to"
            />
            <ComboboxPopover>
              <ComboboxList>
                {goingToProps.suggestions.status === "OK" &&
                  goingToProps.suggestions.data.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>

        {/* Date Picker */}
        <div
          className="relative flex-1 p-2"
          onClick={() => setIsCalendarOpen(true)}
        >
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setIsCalendarOpen(false);
            }}
            className="w-full pl-10 bg-transparent text-gray-600 font-semibold outline-none"
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            open={isCalendarOpen}
            onClickOutside={() => setIsCalendarOpen(false)}
            readOnly
          />
        </div>

        {/* Search Button */}
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>
    </section>
  );
};

export default RideHomeHero;
