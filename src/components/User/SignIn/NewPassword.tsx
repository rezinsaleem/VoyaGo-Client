import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axiosUser from '../../../service/axios/axiosUser';
import { useState } from 'react';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/^\S*$/, "Password cannot contain blank spaces")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const NewPassword = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const formik = useFormik({
    initialValues: {
      email,
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axiosUser().post('/updatePassword', {
          email,
          password: values.password,
        });
        if (data.message === 'success') {
          toast.success('Password updated successfully!');
          navigate('/signin');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error((error as Error).message || 'An error occurred');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} method="post">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Set New Password!</h1>

      {/* Password Field */}
      <div className="mb-4 relative">
  <div className="relative h-11"> {/* Set fixed height */}
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full p-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      placeholder="Enter new password"
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
  {formik.touched.password && formik.errors.password ? (
    <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
  ) : null}
</div>

{/* Confirm Password Field */}
<div className="mb-6 relative">
  <div className="relative h-11"> {/* Set fixed height */}
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      name="confirmPassword"
      value={formik.values.confirmPassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full p-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      placeholder="Confirm new password"
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
  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
    <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
  ) : null}
</div>


      <button
        type="submit"
        className="w-full bg-slate-800 hover:bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md mb-6"
        disabled={formik.isSubmitting}
      >
        Update Password
      </button>

      <p className="mt-6 text-center text-gray-600">
        Remember the Password?{' '}
        <Link to={'/signin'} className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default NewPassword;
