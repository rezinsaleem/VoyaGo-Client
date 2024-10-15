import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Player } from "@lottiefiles/react-lottie-player"; 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; 
import { axiosAdmin } from "../../../service/axios/axiosAdmin";
import { adminLogin } from "../../../service/redux/slices/adminAuthSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .test("no-blank-spaces", "Email cannot be blank", (value) => {
      return value?.trim() !== "";
    }),
  password: Yup.string()
    .required("Password is required")
    .test("no-blank-spaces", "Password cannot be blank", (value) => {
      return value?.trim() !== "";
    }),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formHandleSubmit = async (values: { email: string; password: string }) => {
    try {
      const { data } = await axiosAdmin().post('/adminLogin', values);
      if (data.message === 'Success') {
        console.log(data, 'logindata');
        localStorage.setItem('adminToken', data.token);
        dispatch(adminLogin({ name: data.name, loggedIn: true }));
        toast.success('Admin Logged in Successfully');
        navigate('/admin/dashboard');
      } else if (data.message === 'Invalid Credentials') {
        toast.error('Invalid Credentials');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-xl max-w-4xl w-full">
        {/* Left Side - Lottie Animation */}
        <div className="hidden md:block w-full md:w-1/2 bg-gradient-to-r from-green-100 to-blue-200 p-6">
          <Player
            autoplay
            loop
            src="/admin.json" 
            style={{ height: "400px", width: "400px" }}
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full h-[448px] md:w-1/2 bg-blue-200 p-8 ">
          <h2 className="text-3xl font-bold text-gray-600 mb-6 text-center">
            <span style={{ color: "rgb(129, 190, 91)" }}>Voya</span>
            <span className="text-gray-600">Go</span> Admin
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await formHandleSubmit(values); 
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out"
                  disabled={isSubmitting}
                >
                  Login
                </button>

                <p className="mt-4 text-center text-gray-600">
                  <Link to={"/forgot-password"} className="font-medium text-gray-600">
                    Forgot password?
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
