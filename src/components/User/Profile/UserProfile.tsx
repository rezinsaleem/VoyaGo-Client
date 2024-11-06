import React, { useState } from 'react';

// Import components for each option
import ChangePassword from './ChangePassword';
import VerifyID from './VerifyID';
import DefaultProfile from './DefaultProfile';
import RideHistory from './RideHistory'; 
import Navbar from '../Home/Navbar';
import EditProfile from './EditProfile';

// Icon component
const Icon: React.FC<{ iconClass: string }> = ({ iconClass }) => (
  <i className={`${iconClass} mr-2`} />
);

const UserProfile: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('DefaultProfile');

  const navigateToDefaultProfile = () => {
    setSelectedOption('DefaultProfile');
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'DefaultProfile':
        return <DefaultProfile />;
      case 'EditProfile':
        return <EditProfile onUpdate={navigateToDefaultProfile} />;
      case 'ChangePassword':
        return <ChangePassword onUpdate={navigateToDefaultProfile}/>;
      case 'VerifyId':
        return <VerifyID />;
      case 'RideHistory':
        return <RideHistory />;
      default:
        return <DefaultProfile />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-6 mx-4 ml-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Profile Options</h2>
          <ul className="space-y-2">
            {[
              { name: 'Profile', icon: 'fas fa-user' },
              { name: 'EditProfile', icon: 'fas fa-edit' },
              { name: 'ChangePassword', icon: 'fas fa-lock' },
              { name: 'VerifyId', icon: 'fas fa-check-circle' },
              { name: 'RideHistory', icon: 'fas fa-history' }, 
            ].map(({ name, icon }) => (
              <li key={name}>
                <button
                  onClick={() => setSelectedOption(name)}
                  className={`w-full text-left p-3 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 ${
                    selectedOption === name ? 'bg-gray-200 font-bold' : 'bg-white'
                  }`}
                >
                  <Icon iconClass={icon} /> {/* Render the icon */}
                  {name.replace(/([A-Z])/g, ' $1')} {/* Format option name for display */}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{renderComponent()}</div>
      </div>
    </>
  );
};

export default UserProfile;
