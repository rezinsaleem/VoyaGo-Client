import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogout } from "../../../service/redux/slices/userAuthSlice";
import { FaPlus, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { image, user } = useSelector(
    (store: { user: { user: string; image: string; userId: string } }) =>
      store.user
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    dispatch(userLogout());
    toast.success("Logged out Successfully");
  };

  const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
  const REGION = import.meta.env.VITE_AWS_S3_REGION;

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="backdrop-blur-lg bg-white/30 shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/VOYAGO.png"
            alt="Company Logo"
            className="h-8 w-8 mr-2 ml-5"
          />
          <span className="text-2xl font-bold">
            <span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
            <span className="text-gray-600">Go.</span>
          </span>
        </Link>

        {/* Navigation Links and Buttons */}
        <div className="flex items-center space-x-4 mr-5">
          <Link to="#about" className="text-gray-400 font-semibold hover:text-gray-900">
            About Us
          </Link>

          {user && (
          <Link to="/publish-ride" className="flex items-center">
          <button className="flex items-center space-x-2 border-2 border-blue-500 bg-transparent text-blue-500 font-semibold py-1 px-3 rounded-full transition duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg">
            <FaPlus className="text-lg" />
            <span>Publish Ride</span>
          </button>
        </Link>
        
         
          )}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Picture with Dropdown */}
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-glow border-2 border-blue-300">
                  <img
                    className="object-cover w-full h-full"
                    src={
                      image
                        ? `https://${BUCKET}.s3.${REGION}.amazonaws.com/${image}`
                        : "userdefault.jpg"
                    }
                    alt="User"
                  />
                </div>
                {dropdownOpen ? <FaCaretUp className="ml-1 text-gray-400" /> : <FaCaretDown className="ml-1 text-gray-400" />}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute -right-9 w-52 backdrop-blur-lg bg-white/80 shadow-md p-4  top-[56px] border border-gray-300 rounded-sm z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/inbox"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Inbox
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="text-gray-400 font-semibold hover:text-gray-900">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
