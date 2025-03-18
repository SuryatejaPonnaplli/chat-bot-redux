import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  userName: string;
  password: string;
  email: string;
  status: string;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
  isAuthenticated: !!localStorage.getItem("currentUser"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (
      state,
      action: PayloadAction<{ userName: string; password: string }>
    ) => {
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    signUpRequest: (state, action: PayloadAction<User>) => {
      state.error = null;
    },
    signUpSuccess: (
      state,
      action: PayloadAction<{ userName: string; password: string }>
    ) => {
      state.error = null;
      state.currentUser = {
        userName: action.payload.userName,
        password: action.payload.password,
      } as User;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  logoutRequest,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;
