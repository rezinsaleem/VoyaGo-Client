export interface LoginFormValues {
  email: string | null;
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

export interface ProfileValues {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  userImage: string;
}


export interface EditProfileValues {
  name: string;
  phoneNumber: string;
  userImage: File | null; 
}
export interface ProfileUpdates {
  name?: string;
  phoneNumber?: string;
  userImage?: File | null;
}

export interface PasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EditProfileProps {
  onUpdate: () => void;
}

export interface DecodedToken {
  exp?: number;
  id: string;
  role: string;
}


export interface SidebarProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}