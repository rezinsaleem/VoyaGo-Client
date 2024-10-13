export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface OtpComponentProps {
  values: {
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
  };
}