import { useState } from "react";
import Navbar from "../Home/Navbar";
import RideManage from "./RideManage";
import Sidebar from "../Home/Sidebar";


const RideManagement = () => {
    const [selectedOption, setSelectedOption] = useState("Ride Management");
    return (
      <div className="flex">
        <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <RideManage />
        </div>
      </div>
    )
}

export default RideManagement