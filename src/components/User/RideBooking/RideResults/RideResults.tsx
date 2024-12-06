import { useLocation } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import RideCard from "./RideCard";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { Key, useEffect, useState } from "react";
import { Ride } from "../../../../interfaces/interface";
import axiosRide from "../../../../service/axios/axiosRide";
import ShimmerSidebar from "./ShimmerSidebar";
import ShimmerRideCard from "./ShimmerRideCard";
import Footer from "../../Home/Footer";

const RideResults = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [sortedRides, setSortedRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation();
  const { searchData } = location.state || {};
  const searchDate = new Date(searchData.date);

  useEffect(() => {
    fetchRidesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRidesData = async () => {
    console.log(searchData, "Search Data Received");

    try {
      const response = await axiosRide().post("/search-rides", searchData);
      const data = response.data;

      if (data) {
        setRides(data);
        setSortedRides(data); // Default sorting: earliest departure
        console.log(data, "Fetched Rides");
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false); // Stop loading when API call completes
    }
  };

  const sortRides = (option: string) => {
    // Separate rides based on the search date
    const ridesForSearchDate = rides.filter((ride) => {
      const rideDate = new Date(ride.rideDate);
      return rideDate.toDateString() === searchDate?.toDateString();
    });

    const ridesForLaterDates = rides.filter((ride) => {
      const rideDate = new Date(ride.rideDate);
      return rideDate > searchDate;
    });

    const sortFunction = (ridesToSort: Ride[]) => {
      if (option === "shortest_ride") {
        return ridesToSort.sort((a, b) => {
          const distanceA = Number(a.distance.split(' ')[0])
          const distanceB = Number(b.distance.split(' ')[0])
          return distanceA - distanceB;
        });
        
      } else if (option === "lowest_price") {
        return ridesToSort.sort((a, b) => a.pricePerSeat - b.pricePerSeat);
      } else if (option === "departure_proximity") {
        return ridesToSort.sort((a, b) => a.startDistance - b.startDistance);
      } else if (option === "arrival_proximity") {
        return ridesToSort.sort((a, b) => a.endDistance - b.endDistance);
      }
      return ridesToSort; // Default case: return unsorted
    };

    // Sort each group independently
    const sortedSearchDateRides = sortFunction(ridesForSearchDate);
    const sortedLaterDateRides = sortFunction(ridesForLaterDates);

    // Combine the sorted groups
    setSortedRides([...sortedSearchDateRides, ...sortedLaterDateRides]);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex h-screen">
          <ShimmerSidebar />
          <div className="w-3/4 p-6 bg-white">
            <ShimmerRideCard />
            <ShimmerRideCard />
            <ShimmerRideCard />
            <ShimmerRideCard />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex h-auto">
        <Sidebar sortRides={sortRides} totalRides={rides.length} />
        <div className="w-3/4 p-6 bg-gray-50">
          {/* Rides for Search Date */}
          <h1 className="text-xl font-semibold text-gray-700 ml-2 my-4">
            {searchDate?.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h1>
          {sortedRides.filter((ride) => new Date(ride.rideDate).toDateString() === searchDate.toDateString()).length > 0 ? (
            sortedRides
              .filter((ride) => new Date(ride.rideDate).toDateString() === searchDate.toDateString())
              .map((ride: Ride, index: Key | null | undefined) => <RideCard key={index} ride={ride} />)
          ) : (
            <motion.h2
              className="text-lg text-slate-700 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              No rides available for the selected date.
            </motion.h2>
          )}

          {/* Rides for Later Dates */}
          {sortedRides.filter((ride) => new Date(ride.rideDate) > searchDate).length > 0 && (
            <>
              <h2 className="text-xl text-gray-700 font-semibold mt-7 ml-2 mb-4">
                Later Departures
              </h2>
              {sortedRides
                .filter((ride) => new Date(ride.rideDate) > searchDate)
                .map((ride: Ride, index: Key | null | undefined) => <RideCard key={index} ride={ride} />)}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RideResults;
