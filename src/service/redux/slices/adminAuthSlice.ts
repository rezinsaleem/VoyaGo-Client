import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  name: string;
  loggedIn: boolean;
}

const initialState: AdminState = {
  name: '',
  loggedIn: false,
};

const adminAuthSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<{ name: string; loggedIn: boolean }>) => {
      state.name = action.payload.name;
      state.loggedIn = action.payload.loggedIn;
    },
       adminLogout: (state) => {
            state.name = "";
            state.loggedIn = false;
            localStorage.removeItem('adminToken');
       },
    }
})

export const { adminLogin, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice;
