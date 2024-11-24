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

export interface RideData {
  start_lat: number | null;
  start_lng: number | null;
  start_address: string;
  end_lat: number | null;
  end_lng: number | null;
  end_address: string;
  routeName: string;
  distance: string;
  duration: string;
  numSeats: number | null;
  rideDate: string;
  rideTime: string;
  pricePerSeat: number;
  car: string;
  additionalInfo: string;
  status: string;
  riderId: string | null;
}

export interface UserState {
  user: {
    user: string;
    userId: string;
    email: string;
    phoneNumber: string;
    isVerified?: string;
    loggedIn: boolean;
    image: string;
  };
}