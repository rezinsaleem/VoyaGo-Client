import  { useState } from 'react'
import Sidebar from '../Home/Sidebar';
import Navbar from '../Home/Navbar';
import UserVerification from './UserVerification';

const UserVerify = () => {
    const [selectedOption, setSelectedOption] = useState("ID Approval");
    return (
      <div className="flex">
        <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          < UserVerification/>
        </div>
      </div>
    )
}

export default UserVerify