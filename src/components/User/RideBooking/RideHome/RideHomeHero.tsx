
import { motion } from "framer-motion";
import SearchComponent from "./SearchComponent";

const RideHomeHero = () => {
  
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
        <span className="text-gray-600">Go</span> - Taking you places without breaking <br />the bank!
      </motion.h1>

      {/* Search Section */}
      <SearchComponent/>
      
    </section>
  );
};

export default RideHomeHero;
