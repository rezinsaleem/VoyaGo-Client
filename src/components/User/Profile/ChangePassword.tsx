

import {  useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosUser from '../../../service/axios/axiosUser';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { EditProfileProps, PasswordValues } from '../../../interfaces/interface';



type PasswordField = 'currentPassword' | 'newPassword' | 'confirmPassword';

const ChangePassword :React.FC<EditProfileProps> = ({ onUpdate }) => {

  const user = useSelector((store: { user: { userId: string } }) => store.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] =  useState<Record<PasswordField, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match') 
      .required('Confirm password is required'),
  });
  
  const handleSubmit = async (values: PasswordValues) => {
    try {
      setIsSubmitting(true);
      const { data } = await axiosUser().post(`/changePassword/${user?.userId}`, values);
      if (data.message === 'success') {
        toast.success('Password changed successfully');
        onUpdate()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-3">
       <div className="p-3 max-w-lg mx-auto">
      <h2 className="text-3xl text-center font-semibold mb-8">Change Password</h2>

      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            
            <div className="relative">
              <Field
                type={showPassword.currentPassword ? 'text' : 'password'}
                name="currentPassword"
                placeholder = 'Current Password'
                className="w-full p-3 pl-5 bg-slate-200 border border-gray-300 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('currentPassword')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                 <img 
    src={showPassword.currentPassword ?'/show.png':'/hide.png'} 
    alt={showPassword.currentPassword ? 'Hide password' : 'Show password'} 
    className="w-5 h-5" />
              </button>
            </div>
            <ErrorMessage
              name="currentPassword"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          <div className="mb-4">
           
            <div className="relative">
              <Field
                type={showPassword.newPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder='New Password'
                className="w-full p-3 pl-5 bg-slate-200 border border-gray-300 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <img 
    src={showPassword.newPassword ?'/show.png':'/hide.png'} 
    alt={showPassword.newPassword ? 'Hide password' : 'Show password'} 
    className="w-5 h-5" />
              </button>
            </div>
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          <div className="mb-4">
          
            <div className="relative">
              <Field
                type={showPassword.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder='Confirm New Password'
                className="w-full p-3 pl-5 bg-slate-200 border border-gray-300 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                 <img 
    src={showPassword.confirmPassword ?'/show.png':'/hide.png'} 
    alt={showPassword.confirmPassword ? 'Hide password' : 'Show password'} 
    className="w-5 h-5" />
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className={`bg-gray-800 w-full text-white py-2 px-4 rounded-lg font-semibold hover:bg-black transition ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'CHANGE PASSWORD'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
    </div>
  );
};

export default ChangePassword;