import * as Yup from 'yup';
import { ErrorMessage, Field, Formik, Form } from 'formik'; // Use Formik's Form
import Select from 'react-select';
import axiosUser from '../../../service/axios/axiosUser';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../../service/redux/slices/userAuthSlice';
import { toast } from 'react-toastify';

type GovIdType = 'passport' | 'aadhaar' | 'driver-license' | 'voter-id' | 'pan-card';

interface VerifyFormValues {
  govIdType: GovIdType;
  govIdNumber: string;
  document: File | null;
}

interface UserState {
  user: {
    user: string;
    userId: string;
    email: string;
    phoneNumber: string;
    isVerified?: string;
    loggedIn: boolean;
    image: string;
  };
}

interface OptionType {
  value: GovIdType;
  label: string;
}

const VerifyID = () => {
  const user = useSelector((store: { user: UserState['user'] }) => store.user);
  const dispatch = useDispatch();

  const handleVerifySubmit = async (values: VerifyFormValues) => {
    try {
      const formData = new FormData();
      formData.append('govIdType', values.govIdType);
      formData.append('govIdNumber', values.govIdNumber);
      if (values.document) {
        formData.append('document', values.document);
      }
      try {
        const { data } = await axiosUser().post(`/verifyUser/${user.userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (data.message === 'success') {
          console.log(data.isVerified);
          // Set isVerified to 'pending' after successful submission
          dispatch(
            userLogin({
              ...user,
              isVerified: 'pending', // Update to 'pending'
            })
          );
          console.log(user);
          toast.success('Verification Requested successfully');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const idNumberPatterns: Record<GovIdType, RegExp> = {
    passport: /^[a-zA-Z0-9]{5,17}$/,
    aadhaar: /^\d{12}$/,
    'driver-license': /^[a-zA-Z0-9]{5,15}$/,
    'voter-id': /^[a-zA-Z0-9]{1,15}$/,
    'pan-card': /^[A-Z]{5}\d{4}[A-Z]{1}$/,
  };

  const verificationSchema = Yup.object().shape({
    govIdType: Yup.string().required('Please select the type of government ID'),
    govIdNumber: Yup.string()
      .required('Please enter your ID number')
      .test('matches-pattern', 'Invalid ID number format for the selected ID type', function (value) {
        const { govIdType } = this.parent;
        if (value && govIdType) {
          const pattern = idNumberPatterns[govIdType as GovIdType];
          return pattern ? pattern.test(value) : false;
        }
        return false;
      }),
    document: Yup.mixed<File>()
      .required('Please upload your document')
      .test('fileSize', 'File too large', (value) => value && value.size <= 5 * 1024 * 1024)
      .test('fileType', 'Unsupported File Format', (value) =>
        value ? ['image/jpg', 'image/jpeg', 'image/png', 'image/avif', 'image/webp'].includes(value.type) : false
      ),
  });

  const options: OptionType[] = [
    { value: 'passport', label: 'Passport' },
    { value: 'aadhaar', label: 'Aadhaar Card' },
    { value: 'driver-license', label: "Driver's License" },
    { value: 'voter-id', label: 'Voter ID' },
    { value: 'pan-card', label: 'PAN Card' },
  ];

  return (
    <div className="bg-white p-6 rounded shadow mt-3 min-h-[400px]">
      <div className="p-3 max-w-lg mx-auto ">
        <h2 className="text-2xl text-center font-semibold mb-8">KYC Verification</h2>
        {/* Conditionally render based on isVerified status */}
        {user.isVerified === 'pending' ? (
          <div className="text-center">
            <p className="text-lg text-gray-700">Your verification is in progress...</p>
          </div>
        ) : (
          <Formik
            initialValues={{ govIdType: '' as GovIdType, govIdNumber: '', document: null }}
            validationSchema={verificationSchema}
            onSubmit={handleVerifySubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gov-id-type">
                    Type of Government ID
                  </label>
                  <Select
                    id="gov-id-type"
                    name="govIdType"
                    options={options}
                    value={options.find((option) => option.value === values.govIdType)}
                    onChange={(option) => setFieldValue('govIdType', option?.value)}
                    classNamePrefix="react-select"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: '100%',
                        padding: '0.35rem',
                        paddingLeft: '0.60rem',
                        backgroundColor: '#e2e8f0',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontWeight: 500,
                        color: '#334155',
                        boxShadow: 'none',
                        '&:hover': {
                          borderColor: '#d1d5db',
                        },
                        '&:focus-within': {
                          borderColor: 'black',
                          boxShadow: '0 0 0 2px black',
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        color: state.isSelected ? 'white' : '#334155',
                        backgroundColor: state.isSelected ? 'black' : state.isFocused ? '#f1f5f9' : 'white',
                        ':hover': {
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                        },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: '#334155',
                        fontWeight: 500,
                      }),
                    }}
                  />
                  <ErrorMessage name="govIdType" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gov-id-number">
                    Government ID Number
                  </label>
                  <Field
                    type="text"
                    id="gov-id-number"
                    name="govIdNumber"
                    className="w-full p-3 pl-5 bg-slate-200 border border-gray-300 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your ID number"
                  />
                  <ErrorMessage name="govIdNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="document">
                    Upload Document
                  </label>
                  <input
                    type="file"
                    id="document"
                    name="document"
                    className="shadow appearance-none p-3 pl-5 bg-slate-200 border border-gray-300 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-black w-full"
                    onChange={(event) => {
                      if (event.currentTarget.files && event.currentTarget.files[0]) {
                        setFieldValue('document', event.currentTarget.files[0]);
                      }
                    }}
                  />
                  <ErrorMessage name="document" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className={`bg-gray-800 w-full text-white py-2 px-4 rounded-lg font-semibold hover:bg-black transition`}
                  >
                    Verify ID
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default VerifyID;
