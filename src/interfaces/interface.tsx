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

export interface RidePlanState {
  start_address: string;
  end_address: string;
  routeName: string;
  distance: string;
  duration: string;
  numSeats: number;
  rideDate: string;
  rideTime: string;
  pricePerSeat: number;
  car: string;
  additionalInfo: string;
  status: string;
  passengers: Passenger[];
}

interface Passenger {
  id: number;
  name: string;
  phoneNumber: number,
}

interface VerifyValues {
  govIdType: string;
  govIdNumber: string;
  document: string;
}
export interface Ride {
  _id : string;
  passengers: Passenger[];
  start_lat: number;
  start_lng: number;
  start_address: string;
  end_lat: number;
  end_lng: number;
  end_address: string;
  routeName: string;
  distance: string;
  duration: string;
  numSeats: number;
  rideDate: string;
  rideTime: string;
  pricePerSeat: number;
  car: string;
  additionalInfo: string;
  status: string;
  riderId: string;
  startDistance: number;
  endDistance: number;
  riderDetails: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    userImage: string;
    accountStatus: string;
    isVerified: string;
    verificationDetails: VerifyValues;
    createdAt: string;
    updatedAt: string;
  };
}

  
  export interface Rides{
    _id: string;
    start_address: string;
    end_address: string;
    numSeats: number;
    rideDate: string;
    rideTime: string;
    pricePerSeat: number;
    riderId : string;
    passengers: Passenger[];
  }
  
  export interface User {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
  }
  
  export interface Message {
    id: string;
    senderId: string; 
    text: string;
    timestamp: string;
  }  

