import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import axiosUser from "../../../service/axios/axiosUser";
import { useState } from 'react';
import ForgotPassOtp from './ForgotPassOtp';

const ForgotPassword = () => {
  const [otpPage, setOtpPage] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must contain "@" and "." without spaces')
      .required('Email is required'),
  });

  const handleSubmit = async (values: { email: string }) => {
    await forgotOtp(values.email);
  };

  const forgotOtp = async (email: string): Promise<void> => {
    try {
      const { data } = await axiosUser().post('/forgotPassOtp', { email });
      if (data.message === "success") {
        toast.success('OTP sent Successfully');
        setEmail(email);
        setOtpPage(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-gray-200">
        <h2 className="text-4xl font-bold text-gray-700 my-10 text-center">
          <span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
          <span className="text-gray-600">Go</span>!
        </h2>
        <div className="flex w-full max-w-6xl mx-auto relative">
          <div className="hidden md:block w-1/3 fixed left-0 top-2/5 h-screen items-center justify-center">
            <img src="/signup.svg" alt="Left Image" className="w-full" />
          </div>
          <div className="w-full md:w-1/3 bg-white mx-auto bg-opacity-30 backdrop-blur-md p-8 rounded-lg relative shadow-lg mb-4 z-20 min-h-[400px] flex flex-col justify-center">
            {otpPage ? (
              <ForgotPassOtp email={email} />
            ) : (
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-1">
                        Enter your email address to reset your password.
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="w-full p-2 mt-4 border rounded-md shadow-sm focus:outline-none focus:border-slate-700"
                        placeholder="Enter your email"
                        aria-label="Email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-slate-800 hover:bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md mb-6"
                      disabled={isSubmitting}
                    >
                      Send OTP
                    </button>
                    <div className="mt-4 flex items-center justify-center">
                      <span className="text-gray-400">or</span>
                    </div>
                    <p className="mt-6 text-center text-gray-600">
                      Remember the Password?{' '}
                      <Link to={'/signin'} className="text-blue-600 hover:underline">
                        Sign In
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            )}
          </div>
          <div className="hidden md:block w-1/3 fixed right-0 top-2/5 h-screen items-center justify-center">
            <img src="/signup1.svg" alt="Right Image" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
