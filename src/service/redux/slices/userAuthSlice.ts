import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAuthState {
    user: string;
    userId: string;
    image: string;
    email: string;
    phoneNumber: string;
    isVerified?: string;
    loggedIn: boolean;
}

const initialState: UserAuthState = {
    user: "",
    userId: "",
    image: "",
    email: "",
    phoneNumber: "",
    isVerified: '',
    loggedIn: false,
}

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        userLogin: ((state, action: PayloadAction<UserAuthState>) => { 
            state.user = action.payload.user;
            state.userId = action.payload.userId;
            state.image = action.payload.image;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.isVerified = action.payload.isVerified;
            state.loggedIn = action.payload.loggedIn;
        }),
        userLogout: (state => {
            state.user = "";
            state.userId = "";
            state.image = "";
            state.email = "";
            state.phoneNumber = "";
            state.loggedIn = false;
            state.isVerified = '';
            localStorage.removeItem('userToken')
            localStorage.removeItem('refreshToken')
        })
    }
})

export const { userLogin, userLogout } = userAuthSlice.actions;

export default userAuthSlice;