import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosUser from '../../../service/axios/axiosUser';
import { userLogin } from '../../../service/redux/slices/userAuthSlice';
import { EditProfileValues, ProfileUpdates } from '../../../interfaces/interface';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
  image: Yup.mixed().nullable(),
});


const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store: { user: { user: string; userId: string; email: string; phoneNumber: string; image: string } }) => store.user);

  const [initialValues] = useState<EditProfileValues>({
    name: currentUser.user || '',
    phoneNumber: currentUser.phoneNumber || '',
    userImage: null,
  });

  const [imagePreview, setImagePreview] = useState(currentUser.image || '/userdefault.jpg');
  const fileRef = useRef<HTMLInputElement>(null);
let selectedImage:File;
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: keyof EditProfileValues, value: File | null) => void) => {
    if (e.target.files && e.target.files.length > 0) {
       selectedImage = e.target.files[0];
      if (selectedImage.size <= 2 * 1024 * 1024) { // 2 MB limit
        setFieldValue('userImage', selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
      } else {
        toast.error('File size must be less than 2 MB');
      }
    }
  };

  const handleSubmit = async (values: EditProfileValues) => {
    const updates: ProfileUpdates = {};
    if (values.name.trim() !== initialValues.name.trim()) {
      updates.name = values.name;
    }
    if (values.phoneNumber.trim() !== initialValues.phoneNumber.trim()) {
      updates.phoneNumber = values.phoneNumber;
    }
    if (selectedImage) {
      updates.userImage = selectedImage;
    }
    if (Object.keys(updates).length === 0) {
      toast.info('No changes detected, nothing to update.');
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phoneNumber', values.phoneNumber);
    if (values.userImage) {
      formData.append('userImage', values.userImage);
    }

    try {
      const { data } = await axiosUser().post(`/updateProfile/${currentUser.userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.message === 'success') {
        dispatch(userLogin({ 
          user: data.name, 
          phoneNumber: data.phoneNumber, 
          image: data.userImage, 
          userId: currentUser.userId, 
          email: currentUser.email,     
          loggedIn: true                  
        }));
        toast.success('Profile updated successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while updating the profile');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-3">
       <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold mb-5">Edit Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            <input
              type="file"
              name="userImage"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setFieldValue)}
            />
            <img
              src={imagePreview}
              alt="Profile"
              className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
              onClick={() => fileRef.current?.click()}
            />
            
            <Field
              name="name"
              type="text"
              placeholder="Username"
              className="bg-slate-200 p-3 pl-5 rounded-lg font-medium text-slate-700"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />

            <Field
              name="phoneNumber"
              type="text"
              placeholder="Mobile Number"
             className="bg-slate-200 p-3 pl-5 rounded-lg font-medium text-slate-700"
            />
            <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />

            <input
              value={currentUser.email}
              type="email"
              placeholder="Email"
              className="bg-slate-200 p-3 pl-5 rounded-lg font-medium text-slate-700"
              readOnly
            />

            <button
              type="submit"
              className="bg-slate-900 text-white p-2 rounded-lg uppercase font-medium"
            >
              Update Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default EditProfile;
