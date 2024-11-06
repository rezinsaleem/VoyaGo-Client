import { Link } from "react-router-dom";
import { SidebarProps } from "../../../interfaces/interface";




const Sidebar = ({ selectedOption, setSelectedOption }: SidebarProps) => {
  const options = [
    { name: 'Dashboard', icon: 'fas fa-chart-line', path: "/admin/dashboard" },
    { name: 'User Management', icon: 'fas fa-users', path: "/admin/user-management" },
    { name: 'Ride Management', icon: 'fas fa-tachometer-alt', path: "/admin/dashboard" },
    { name: 'Report/Complaints', icon: 'fas fa-cogs', path: "/admin/dashboard" },
    { name: 'ID Approval', icon: 'fas fa-check-circle', path: "/admin/ID-approval" }
  ];

  return (
   
    <div className="fixed top-24 font-medium left-0 h-full w-60 bg-white text-gray-800 shadow-lg flex flex-col">
      {options.map((option) => (
        <Link
        to={option.path}
        key={option.name}
        onClick={() => setSelectedOption(option.name)}
        className={`flex items-center space-x-4 py-4 px-6 cursor-pointer transition-colors ${
          selectedOption === option.name
            ? "bg-blue-200 border-l-4 border-x-gray-400"
            : "hover:bg-blue-100"
        }`}
        
        >
          <i className={`${option.icon} text-xl`}></i>
          <span className="text-lg">{option.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
