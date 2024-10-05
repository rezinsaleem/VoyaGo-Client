import React, { useEffect, useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Navbar from "../Home/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosUser from "../../../service/axios/axiosUser";
import { toast } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";

const SignUp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [otpPage, setOtpPage] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [, setIsResendVisible] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (otpPage && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevCounter) => prevCounter - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, otpPage]);

  const validationSchema = Yup.object({
    username: Yup.string().required("Invalid User Name"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phoneNumber: Yup.string().required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await signupOtp(values.email, values.username);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  const signupOtp = async (email: string, name: string): Promise<void> => {
    try {
      const { data } = await axiosUser().post('/signupOtp', { email, name });
      if (data.message === 'success') {
        toast.success('OTP sent Successfully');
        setOtpPage(true);
      } else {
        toast.error(data.message);
      } 
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <>
      <Navbar />
      <div>
      {otpPage ? (
        <div className="min-h-screen flex items-center justify-between px-10">
          {/* Left side - Signup Form */}
          <div className="w-1/2 space-y-1">
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-md">
                <h1 className="text-2xl font-semibold text-center">
                  Verify OTP
                </h1>

                {/* OTP Input Fields */}
                <div className="flex justify-center space-x-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center border rounded text-lg focus:outline-none focus:ring-2 focus:ring-black"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>

                {/* Timer or Resend OTP */}
                <div className="text-center mt-4">
                  {timeLeft > 0 ? (
                    <p className="text-gray-600">
                      Resend OTP in {timeLeft} seconds
                    </p>
                  ) : (
                    <button
                      // onClick={}
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  // onClick={}
                  className="w-full py-2 mt-4 bg-black text-white rounded hover:bg-gray-800"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Lottie Animation */}
          <div className="w-1/2 flex justify-center items-center">
            <Player
              autoplay
              loop
              src="/Animation - 1726125252610.json"
              style={{ height: '300px', width: '300px' }}
            />
          </div>
        </div>
      ) : (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-gray-200">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-700 my-10 text-center">
          Join VoyaGo Today
        </h2>

        {/* Main Container */}
        <div className="flex w-full max-w-6xl mx-auto">
          {/* Left Image Section */}
          <div
            className="hidden md:block w-1/3 bg-cover bg-center"
            style={{ backgroundImage: `url('/left-side-image.jpg')` }}
          ></div>

          {/* Center Signup Section */}
          <div className="w-full md:w-1/3 bg-white bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-lg">
            {/* Formik Form */}
            <Formik
              initialValues={{
                username: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      placeholder="Enter your username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      placeholder="Confirm your password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
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
          <div
            className="hidden md:block w-1/3 bg-cover bg-center"
            style={{ backgroundImage: `url('/offerride.webp')` }}
          ></div>
        </div>
      </div>
      )}
      </div>
    </>
  );
};

export default SignUp;
