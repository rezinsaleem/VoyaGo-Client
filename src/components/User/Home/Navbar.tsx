const Navbar: React.FC = () => {
  return (
    <nav className="backdrop-blur-lg bg-white/30 shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="flex items-center">
          <img src="VOYAGO.png" alt="Company Logo" className="h-8 w-8 mr-2 ml-5" />
          <span className="text-2xl font-bold">
          <span style={{ color: 'rgb(129, 190, 91)' }}>Voya</span>
            <span className="text-gray-600 ">Go.</span>
          </span>
        </div>

        <div className="flex items-center space-x-4 mr-5">
          <a
            href="#about"
            className="text-gray-400 hover:text-gray-900"
          >
            About Us
          </a>
          <a
            href="#signin"
            className="text-gray-400 hover:text-gray-900"
          >
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
