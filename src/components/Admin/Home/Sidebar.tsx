

interface SidebarProps {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedOption }) => {
  const options = [
    { name: 'Dashboard', icon: 'fas fa-chart-line' },
    { name: 'User Management', icon: 'fas fa-users' },
    { name: 'Ride Management', icon: 'fas fa-tachometer-alt' },
    { name: 'Report/Complaints', icon: 'fas fa-cogs' },
    { name: 'ID Approval', icon: 'fas fa-check-circle' }
  ];

  return (
    <div className="fixed top-24 font-medium left-0 h-full w-60 bg-white text-gray-800 shadow-lg flex flex-col">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => setSelectedOption(option.name)}
          className="flex items-center space-x-4 py-4 px-6 hover:bg-blue-100 cursor-pointer transition-colors"
        >
          <i className={`${option.icon} text-xl`}></i>
          <span className="text-lg">{option.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
