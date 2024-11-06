import React from 'react';
import { adminLogout } from '../../../service/redux/slices/adminAuthSlice';
import { useDispatch } from 'react-redux';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-blue-100 backdrop-blur-md z-50 flex items-center justify-between px-8 shadow-md">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-4">
        <img src="/VOYAGO.png" alt="Logo" className="h-10 w-10" />
        <span className="text-slate-800 text-2xl font-bold"><span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
        <span className="text-slate-800">Go</span> Admin</span>
      </div>
      {/* Chat Icon and Logout Button */}
      <div className="flex items-center space-x-6">
        <button className="text-slate-800 hover:text-black focus:outline-none">
          <i className="fas fa-comments text-2xl"></i>
        </button>
        <button className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-black focus:outline-none"  onClick={() => dispatch(adminLogout())}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
