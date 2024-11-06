import { useState } from "react";
import Navbar from "../Home/Navbar";
import UserManage from "./UserManage";
import Sidebar from "../Home/Sidebar";


const UserManagement = () => {
    const [selectedOption, setSelectedOption] = useState("User Management");
    return (
      <div className="flex">
        <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <UserManage />
        </div>
      </div>
    )
}

export default UserManagement