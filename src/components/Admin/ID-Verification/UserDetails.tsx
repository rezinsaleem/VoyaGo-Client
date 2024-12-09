import { useEffect, useState } from 'react';
import Sidebar from '../Home/Sidebar';
import Navbar from '../Home/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosAdmin } from '../../../service/axios/axiosAdmin';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'animate.css';


interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  userImage: string;
  isVerified: string;
  verificationDetails: VerificationDetails;
}

interface VerificationDetails {
  govIdType: string;
  govIdNumber: string;
  document: string;
}

const BUCKET =  import.meta.env.VITE_AWS_S3_BUCKET;
const REGION =  import.meta.env.VITE_AWS_S3_REGION;

const UserDetails = () => {
  
  const [selectedOption, setSelectedOption] = useState('ID Approval');
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchUser = async () => {
    try {
      const { data } = await axiosAdmin().get(`/getUser/${id}`);
      console.log(data, 'user');
      setUser(data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };


  const handleVerificationAction = async (action: 'accepted' | 'rejected') => {
    let reason = '';

    if (action === 'rejected') {
      const { value: rejectionReason } = await Swal.fire({
        title: 'Provide Rejection Reason',
        input: 'textarea',
        inputPlaceholder: 'Enter reason for rejection...',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        background: 'white',
        color: 'black',
        iconColor: '#ff0000',
        buttonsStyling: true,
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
        inputValidator: (value) => {
          if (!value) {
            return 'Rejection reason is required!';
          }
          return null;
        },
      });

      if (!rejectionReason) {
        toast.error('Rejection reason is required!');
        return;
      }

      reason = rejectionReason;
    }

    try {
      const { data } = await axiosAdmin().post(`/user/${id}/verification`, {
        action,
        reason,
      });
      if (data.message === 'verified') {
        toast.success(`User Verified successfully!`);
        navigate('/admin/ID-approval')
      } else if (data.message === 'rejected') {
        toast.success('User Verification Rejected successfully');
        navigate('/admin/ID-approval')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="ml-60 mt-16 p-8 flex overflow-y-auto bg-gray-200 w-[80%] min-h-[600px] mx-auto">
      <Sidebar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          {/* User Details */}
          {user && (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
              {/* Header with User Image and Name */}
              <div className="flex items-center mb-6 p-4 bg-white shadow-md rounded-lg">
                {user.userImage && (
                  <div className="flex-shrink-0">
                    <img
                      src={user?.userImage?`https://${BUCKET}.s3.${REGION}.amazonaws.com/${user.userImage}`:'image'}
                      alt={user.name}
                      className="rounded-full w-24 h-24 object-cover shadow-lg border-2 border-gray-200"
                    />
                  </div>
                )}
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-gray-500">Mobile: {user.phoneNumber}</p>
                 
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-gray-100 p-4 rounded-lg border shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Verification Status
                </h2>
                <div className="mb-3">
                  <p className="text-lg font-semibold">
                    Current Status:
                    <span className="text-black font-semibold text-base">
                      {user.isVerified === 'true' && ' Verified'}
                      {user.isVerified === 'pending' &&
                        ' Verification Pending'}
                      {user.isVerified === 'false' && ' Not Requested'}
                      {user.isVerified === 'rejected' &&
                        ' Verification Rejected'}
                    </span>
                  </p>
                </div>

                {/* Verification Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold">Gov ID Type</h2>
                    <p className="text-gray-700">
                      {user.verificationDetails.govIdType}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Gov ID Number</h2>
                    <p className="text-gray-700">
                      {user.verificationDetails.govIdNumber}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <h2 className="text-lg font-semibold">Document</h2>
                    {user.verificationDetails.document && (
                      <img
                        className="w-[500px] h-auto rounded-md"
                        src={user?.verificationDetails?.document?`https://${BUCKET}.s3.${REGION}.amazonaws.com/${user.verificationDetails.document}`:'image'}
                      />
                    )}
                  </div>
                </div>
              </div>

              {user.isVerified === 'pending' && (
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    className="border-2 border-green-600 text-green-600 px-6 py-2 rounded-lg shadow-md hover:bg-green-600 hover:text-white"
                    onClick={() => handleVerificationAction('accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="border-2 border-red-500 text-red-500 px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:text-white"
                    onClick={() => handleVerificationAction('rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;