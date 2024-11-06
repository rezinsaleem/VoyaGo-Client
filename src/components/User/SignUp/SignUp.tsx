import React, {  useState } from "react";
import Navbar from "../Home/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosUser from "../../../service/axios/axiosUser";
import { toast } from "react-toastify";
import OtpComponent from "./OtpComponent";
import { Link } from "react-router-dom";
import { SignUpFormValues } from "../../../interfaces/interface";


type PasswordField = 'password' | 'confirmPassword';

const SignUp: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field: PasswordField) => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const [otpPage, setOtpPage] = useState<boolean | null>(null);
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim() // Removes leading and trailing spaces
      .required("Username is required"),
  
    email: Yup.string()
      .email("Invalid email address") // Checks for valid email format
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format, ensure it contains '@' and '.' without spaces")
      .required("Email is required"),
  
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^\S*$/, "Password cannot contain blank spaces")
      .required("Password is required"),
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match") 
      .required("Confirm password is required"),
  });
  

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      console.log(values);
      setFormValues(values); 
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
      const { data } = await axiosUser().post("/signupOtp", { email, name });
      if (data.message === "success") {
        toast.success("OTP sent Successfully");
        setOtpPage(true);
      } else {
        toast.error(data.message + "hellooo");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-gray-200">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-700 my-10 text-center">
          Join <span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
          <span className="text-gray-600">Go</span> Today
        </h2>

        {/* Main Container */}
        <div className="flex w-full max-w-6xl mx-auto relative">
          {/* Left Image Section */}
          <div className="hidden md:block w-1/3 fixed left-0 top-2/5 h-screen items-center justify-center">
            <img src="/signup.svg" alt="Left Image" className="w-full" />
          </div>

          {/* Center Section: SignUp or OTP based on otpPage */}
          <div className="w-full md:w-1/3 bg-white mx-auto bg-opacity-30 backdrop-blur-md p-8 rounded-lg relative shadow-lg mb-4 z-20 min-h-[500px] flex flex-col justify-center">
            {otpPage ? (
             <OtpComponent values={formValues} />
            ) : (
              <>
                {/* Signup Form */}
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
                    <>
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

                      <div className="mb-4 relative">
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <div className="relative">
          <Field
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="w-full p-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('password')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <img
              src={showPassword ? '/hide.png' : '/show.png'}
              alt={showPassword ? 'Hide password' : 'Show password'}
              className="w-5 h-5"
            />
          </button>
        </div>
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Confirm Password Field */}
      <div className="mb-6 relative">
        <label className="block text-gray-700 font-medium mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <Field
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            className="w-full p-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirmPassword')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <img
              src={showConfirmPassword ? '/hide.png' : '/show.png'}
              alt={showConfirmPassword ? 'Hide password' : 'Show password'}
              className="w-5 h-5"
            />
          </button>
        </div>
        <ErrorMessage
          name="confirmPassword"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-800 hover:bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md mb-6"
                        disabled={isSubmitting}
                      >
                        Sign Up
                      </button>
                     
                    </Form>
                    <p className="mt-6 text-center text-gray-600">
                   Have an account?{' '}
                    <Link to={'/signin'} className="text-blue-600 hover:underline">
                      Sign In
                    </Link>
                  </p>
                  </>
                  )}
                </Formik>
              </>
            )}
          </div>

          {/* Right Image Section */}
          <div className="hidden md:block w-1/3 fixed right-0 top-2/5 h-screen items-center justify-center">
            <img src="/signup1.svg" alt="Right Image" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
