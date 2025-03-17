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
}

const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
const storedUser: User | null = JSON.parse(
  localStorage.getItem("currentUser") || "null"
);

const initialState: AuthState = {
  users: storedUsers,
  currentUser: storedUser,
  isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    login: (
      state,
      action: PayloadAction<{ userName: string; password: string }>
    ) => {
      const user = state.users.find(
        (u) =>
          u.userName === action.payload.userName &&
          u.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { signUp, login, logout } = authSlice.actions;
export default authSlice.reducer;
