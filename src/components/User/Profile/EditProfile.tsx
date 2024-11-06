import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosUser from '../../../service/axios/axiosUser';
import { userLogin } from '../../../service/redux/slices/userAuthSlice';
import { EditProfileProps, EditProfileValues } from '../../../interfaces/interface';


// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
  image: Yup.mixed().nullable(),
});

const BUCKET =  import.meta.env.VITE_AWS_S3_BUCKET;
const REGION =  import.meta.env.VITE_AWS_S3_REGION;

const EditProfile: React.FC<EditProfileProps> = ({ onUpdate }) => {
  
  const dispatch = useDispatch();
  const currentUser = useSelector((store: { user: { user: string; userId: string; email: string; phoneNumber: string; image: string } }) => store.user);

  const userDP = currentUser.image ?`https://${BUCKET}.s3.${REGION}.amazonaws.com/${currentUser.image}`:'userdefault.jpg';

  const [initialValues] = useState<EditProfileValues>({
    name: currentUser.user || '',
    phoneNumber: currentUser.phoneNumber || '',
    userImage: null,
  });

  const [imagePreview, setImagePreview] = useState( userDP);
  const fileRef = useRef<HTMLInputElement>(null);

  const [originalValues, setOriginalValues] = useState(initialValues);

  useEffect(() => {
    setOriginalValues(initialValues);
  }, [initialValues]);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: keyof EditProfileValues, value: File | null) => void) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      if (selectedImage.size <= 2 * 1024 * 1024) {
        setFieldValue('userImage', selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
      } else {
        toast.error('File size must be less than 2 MB');
      }
    }
  };

  const handleSubmit = async (values: EditProfileValues) => {

    const isNameChanged = values.name !== originalValues.name;
    const isPhoneChanged = values.phoneNumber !== originalValues.phoneNumber;
    const isImageChanged = !!values.userImage;

    if (!isNameChanged && !isPhoneChanged && !isImageChanged) {
      toast.info('No changes to update');
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
        setOriginalValues({
          name: values.name,
          phoneNumber: values.phoneNumber,
          userImage: values.userImage
        });
        toast.success('Profile updated successfully');
        onUpdate();
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
  className="h-24 w-24 self-center cursor-pointer rounded-full object-cover border-2 border-blue-300"
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

            <div className="bg-slate-200 p-3 pl-5 rounded-lg font-medium text-slate-700 text-opacity-80">
    {currentUser.email}
  </div>

            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg uppercase font-medium"
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
