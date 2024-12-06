import { useRef, useState } from "react";
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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  GeocodeResult,
} from "use-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Improved type definition
interface SearchData {
  start_lat?: number;
  start_lng?: number;
  start_address?: string;
  end_lat?: number;
  end_lng?: number;
  end_address?: string;
  date?: string;
  lat?: number;
  lng?: number;
  address?: string;
}

const SearchComponent: React.FC = () => {
  const [searchData, setSearchData] = useState<SearchData>({});
  const navigate = useNavigate();

  const goingToRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLInputElement>(null);

  const usePlaces = (
    updateField: (fieldData: Partial<SearchData>) => void,
    focusNextField?: () => void
  ) => {
    const { ready, value, suggestions, setValue, clearSuggestions } =
      usePlacesAutocomplete({
        debounce: 300, // Add debounce to reduce unnecessary API calls
        requestOptions: {
          // Optional: Add any Google Places API request options
        },
      });

    const handleSelect = async (address: string) => {
      setValue(address, false);
      clearSuggestions();

      try {
        const results: GeocodeResult[] = await getGeocode({ address });
        if (results.length > 0) {
          const { lat, lng } = await getLatLng(results[0]);
          updateField({
            lat,
            lng,
            address,
          });
          if (focusNextField) focusNextField();
        }
      } catch (error) {
        console.error("Error fetching geocode:", error);
        // Optional: Add user-friendly error handling
        alert("Could not find the location. Please try again.");
      }
    };

    return { ready, value, suggestions, setValue, handleSelect };
  };

  const updateLeavingFrom = (fieldData: Partial<SearchData>) => {
    setSearchData((prev) => ({
      ...prev,
      start_lat: fieldData.lat,
      start_lng: fieldData.lng,
      start_address: fieldData.address,
    }));
  };

  const updateGoingTo = (fieldData: Partial<SearchData>) => {
    setSearchData((prev) => ({
      ...prev,
      end_lat: fieldData.lat,
      end_lng: fieldData.lng,
      end_address: fieldData.address,
    }));
  };

  const updateDate = (date: Date | null) => {
    if (date) {
      const localDateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
      setSearchData((prev) => ({
        ...prev,
        date: localDateString,
      }));
    }
  };
  

  const leavingFromProps = usePlaces(updateLeavingFrom, () => {
    goingToRef.current?.focus();
  });

  const goingToProps = usePlaces(updateGoingTo, () => {
    datePickerRef.current?.focus();
  });

  const isSubmitDisabled =
    !searchData.start_lat || !searchData.end_lat || !searchData.date;

  const handleSearch = async () => {
    if (isSubmitDisabled) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      navigate("/ride-results", { state: { searchData } });
    } catch (error) {
      console.error("Error fetching rides from backend:", error);
      toast.error("Failed to search rides. Please try again.");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-lg flex items-center p-4 max-w-4xl absolute -bottom-[40px] ml-36">
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
                leavingFromProps.suggestions.data.map(
                  ({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  )
                )}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>

      {/* Going To */}
      <div className="relative flex-1 p-2">
        <FaLocationArrow className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Combobox onSelect={goingToProps.handleSelect}>
          <ComboboxInput
            ref={goingToRef}
            value={goingToProps.value}
            onChange={(e) => goingToProps.setValue(e.target.value)}
            disabled={!goingToProps.ready}
            className="w-full pl-10 bg-transparent text-gray-600 font-semibold outline-none"
            placeholder="Going to"
          />
          <ComboboxPopover>
            <ComboboxList>
              {goingToProps.suggestions.status === "OK" &&
                goingToProps.suggestions.data.map(
                  ({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  )
                )}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>

      {/* Date Picker */}
      <div className="relative flex-1 p-2">
        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <DatePicker
          selected={searchData.date ? new Date(searchData.date) : null}
          onChange={(date) => updateDate(date)}
          className="w-full pl-10 bg-transparent text-gray-600 font-semibold outline-none"
          placeholderText="Select Date"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          customInput={
            <input
              ref={datePickerRef}
              className="w-full pl-10 bg-transparent text-gray-600 font-semibold outline-none"
            />
          }
        />
      </div>

      {/* Search Button */}
      <button
        className={`px-8 py-2 rounded-lg ${
          isSubmitDisabled
            ? "bg-gradient-to-r from-blue-500 to-blue-700 opacity-70 text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
        }`}
        disabled={isSubmitDisabled}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
