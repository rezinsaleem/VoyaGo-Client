
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { useState } from 'react';

const Main = () => {
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  return (
    <div className="flex">
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  )
}
export default Main;
