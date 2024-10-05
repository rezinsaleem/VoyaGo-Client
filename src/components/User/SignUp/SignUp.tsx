import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Navbar from '../Home/Navbar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp: React.FC = () => {

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
    const {data} = ;
  };
  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-gray-200">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-700 my-10 text-center">Join VoyaGo Today</h2>

      {/* Main Container */}
      <div className="flex w-full max-w-6xl mx-auto">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/3 bg-cover bg-center" style={{ backgroundImage: `url('/left-side-image.jpg')` }}></div>

        {/* Center Signup Section */}
        <div className="w-full md:w-1/3 bg-white bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-lg">
          {/* Formik Form */}
          <Formik
            initialValues={{
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md mb-6"
                  disabled={isSubmitting}
                >
                  Sign Up with Email
                </button>
              </Form>
            )}
          </Formik>

          {/* Google and Facebook Auth */}
          <div className="text-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full w-full mb-4 flex justify-center items-center">
              <FaGoogle className="mr-2" /> Sign Up with Google
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full w-full flex justify-center items-center">
              <FaFacebook className="mr-2" /> Sign Up with Facebook
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hidden md:block w-1/3 bg-cover bg-center" style={{ backgroundImage: `url('/right-side-image.jpg')` }}></div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
