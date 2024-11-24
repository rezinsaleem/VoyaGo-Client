import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaComments, FaMusic, FaSmoking, FaPaw } from 'react-icons/fa';


const preferencesArray = [
  { label: 'I’m chatty when I feel comfortable.', icon: <FaComments /> },
  { label: 'I’ll jam depending on the mood.', icon: <FaMusic /> },
  { label: 'Cigarette breaks outside the car are ok.', icon: <FaSmoking /> },
  { label: 'I’ll travel with pets depending on the animal.', icon: <FaPaw /> },
];

const DefaultProfile: React.FC = () => {
  const user = useSelector((store: { user: {user:string, userId: string, email:string, phoneNumber:string, image:string,isVerified?: string } }) => store.user);

  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const handleCheckboxChange = (preference: string) => {
    setSelectedPreferences((prev: string[]) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference) // Deselect if already selected
        : [...prev, preference] // Select if not already selected
    );
  }
  const BUCKET =  import.meta.env.VITE_AWS_S3_BUCKET;
  const REGION =  import.meta.env.VITE_AWS_S3_REGION;
  console.log(user.image);
  return (
    <div className="relative bg-white p-6 rounded shadow mt-3">
  {/* Verified Badge */}
  {user.isVerified === 'true' && (
  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-green-100 text-green-600 text-sm font-semibold rounded-full px-3 py-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path d="M20.292 5.292a1 1 0 0 1 1.416 1.416l-11 11a1 1 0 0 1-1.416 0l-5-5a1 1 0 1 1 1.416-1.416L10 15.584l10.292-10.292z" />
    </svg>
    <span className="ml-1">Verified</span>
  </div>
)}


  {/* Profile Content */}
  <h2 className="text-xl font-semibold">Your Profile</h2>
  <div className="flex items-center mt-4">
    <img
      className="object-cover rounded-full w-14 h-14 border-2 border-blue-300"
      src={
        user.image
          ? `https://${BUCKET}.s3.${REGION}.amazonaws.com/${user.image}`
          : "userdefault.jpg"
      }
      alt="User"
    />
    <div className="ml-4">
      <p className="text-xl font-bold">{user.user}</p>
      <p className="text-gray-600"></p>
    </div>
  </div>

  <div className="flex mt-4">
    <span className="font-semibold">Email account :</span>
    <span className="text-gray-500 ml-2">{user.email}</span>
  </div>
  <div className="flex mt-4">
    <span className="font-semibold">Mobile :</span>
    <span className="text-gray-500 ml-2">{user.phoneNumber}</span>
  </div>
  <div className="mt-4">
    <label className="block text-lg font-medium text-gray-700">
      Travel Preferences:
    </label>
    <div className="mt-2 flex flex-col">
      {preferencesArray.map((preference, index) => (
        <label key={index} className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={selectedPreferences.includes(preference.label)}
            onChange={() => handleCheckboxChange(preference.label)}
          />
          <span className="ml-2 flex text-lg items-center">
            {preference.icon} <span className="ml-2">{preference.label}</span>
          </span>
        </label>
      ))}
    </div>
  </div>
</div>
  );
};

export default DefaultProfile;
