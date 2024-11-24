import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import { UserState } from "../../../../interfaces/interface";
import { FaCheckCircle } from "react-icons/fa";

const RideComplete = () => {
  const user = useSelector((store: { user: UserState["user"] }) => store.user);
  const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
  const REGION = import.meta.env.VITE_AWS_S3_REGION;
  const navigate = useNavigate();

  const showDetails =
    !user.image || user.isVerified === "false" || user.isVerified === 'rejected';
  const showVerifyId = user.isVerified === "false" || user.isVerified === 'rejected';
  const showUpdateProfile = !user.image;

  return (
    <>
      <Navbar />
      <div className="relative bg-green-600 min-h-[200px] flex items-center justify-center">
        {/* Heading in the center */}
        <h1 className="text-3xl font-bold text-white">Your ride is published!</h1>

        {/* Profile picture at the left-bottom corner of the green div */}
        <div className="absolute bottom-0 left-36 transform translate-y-1/2">
          <div className="bg-white rounded-full p-1">
            <img
              className="rounded-full border-4 border-white w-28 h-28"
              src={
                user.image
                  ? `https://${BUCKET}.s3.${REGION}.amazonaws.com/${user.image}`
                  : "userdefault.jpg"
              }
              alt="User Profile"
            />
          </div>
        </div>
      </div>

      {/* Content below the green section */}
      <div className="px-36 mt-20">
      {showDetails ? (
        <div >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Update the following details in order to boost your rides:
          </h2>
          <ul className="space-y-4 text-lg">
            {showVerifyId && (
              <>
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  <Link
                    to="/profile"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Verify your Govt. ID
                  </Link>
                </li>
                <hr />
              </>
            )}
            {showUpdateProfile && (
              <>
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  <Link
                    to="/profile"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Update your profile picture
                  </Link>
                </li>
                <hr />
              </>
            )}
          </ul>
        </div>
      ):( <h2 className="text-xl font-semibold text-gray-700 mb-4">
       Have a great Ride & Publish your Return Ride soon!
      </h2>)}
        {/* Centered button */}
        <div className="mt-14 flex justify-center">
          <button
            className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-4 w-[200px] shadow-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-3 mb-10`} onClick={()=>{navigate('/ride-plan')}}
          >
            See My Ride Offer
          </button>
        </div>
      </div>
    </>
  );
};

export default RideComplete;
