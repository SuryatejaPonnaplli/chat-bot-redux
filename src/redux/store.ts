import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import messagesReducer from "../features/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
