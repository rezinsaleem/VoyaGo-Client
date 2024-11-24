
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosUser from "../../../service/axios/axiosUser";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../service/redux/slices/userAuthSlice';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; 
import { useState } from 'react';


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address') // Validates if the string is a valid email format (contains @ and .)
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        'Email must contain "@" and "." without spaces'
      ) // Custom regex to ensure no spaces in the email
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters') // Validates minimum length
      .matches(/^\S*$/, 'Password cannot contain blank spaces') // No blank spaces allowed
      .required('Password is required'),
  });
  
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
        const { data } = await axiosUser().post('/loginUser', values);
        if (data.message === 'Success') {
          console.log(data, 'logindata');
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);
          dispatch(
            userLogin({
              user: data.name,
              userId: data._id,
              image: data.image,
              loggedIn: true,
              email: data.email,
              phoneNumber: data.phoneNumber,
              isVerified: data.isVerified,
            })
          );
          toast.success('User Logged in Successfully');
          navigate('/');
        } else if (data.message === 'UserNotFound') {
          toast.error('User Not Found');
        } else if (data.message === 'passwordNotMatched') {
          toast.error('Entered password is wrong');
        } else if (data.message === 'blocked') {
          toast.info('Your Account is Blocked');
        } else {
          toast.error('User is not Registered, Please Sign Up!');
        }
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
      }
    };

    const googleLogin = async (datas: CredentialResponse) => {
    try {
      const token: string | undefined = datas.credential;
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decode = jwtDecode(token) as any;
        const { data } = await axiosUser().post('/googleLoginUser', {
          email: decode.email,
        });
        if (data.message === 'Success') {
          toast.success('Login success!');
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);
          dispatch(
            userLogin({
              user: data.name,
              userId: data._id,
              image: data.image,
              loggedIn: true,
              email: data.email,
              phoneNumber: data.phoneNumber,
              isVerified: data.isVerified,
            })
          );
          navigate('/');
        } else if (data.message === 'Blocked') {
          toast.error('Your Blocked By Admin');
        } else if (data.message === 'blocked') {
          toast.info('Your Account is Blocked');
        } else {
          toast.error('Not registered! Please Signup to  continue.');
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-gray-200">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-700 my-10 text-center">
          Welcome Back to <span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
          <span className="text-gray-600">Go</span>!
        </h2>

        {/* Main Container */}
        <div className="flex w-full max-w-6xl mx-auto relative">
          {/* Left Image Section */}
          <div className="hidden md:block w-1/3 fixed left-0 top-2/5 h-screen items-center justify-center">
            <img src="/signup.svg" alt="Left Image" className="w-full" />
          </div>

          {/* Center Section: Sign In */}
          <div className="w-full md:w-1/3 bg-white mx-auto bg-opacity-30 backdrop-blur-md p-8 rounded-lg relative shadow-lg mb-4 z-20 min-h-[400px] flex flex-col justify-center">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <>
                <Form>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-slate-700"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4 relative">
  <label className="block text-gray-700 font-medium mb-1">
    Password
  </label>
  <div className="relative">
    <Field
      type={showPassword ? 'text' : 'password'}
      name="password"
      className="w-full p-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:border-slate-700"
      placeholder="Enter your password"
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
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
<div className="-mt-3 mb-5 ml-1 text-sm">
            <Link
              to={'/forgot-password'}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md mb-6"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>
                </Form>
                <div className="mt-4 flex items-center justify-center">
                    <span className="text-gray-400">or</span>
                  </div>

                  <div className="w-full mt-3 flex items-center justify-center">
                    <GoogleLogin
                      ux_mode="popup"
                      onSuccess={googleLogin}
                      size="large"
                      shape="pill"
                      theme="filled_black"
                    />
                  </div>
                 <p className="mt-6 text-center text-gray-600">
                 Don't have an account?{' '}
                  <Link to={'/signup'} className="text-blue-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
                </>
              )}
            </Formik>
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

export default SignIn;
