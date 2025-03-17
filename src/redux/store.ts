import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import messagesReducer from "./messages/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
