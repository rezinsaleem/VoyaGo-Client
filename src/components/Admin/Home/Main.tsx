import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const Main: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('Dashboard');

  return (
    <div>
      <Navbar />
      <Sidebar setSelectedOption={setSelectedOption} />
      <Dashboard selectedOption={selectedOption} />
    </div>
  );
};

export default Main;
