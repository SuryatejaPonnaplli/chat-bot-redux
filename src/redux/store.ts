import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import messagesReducer from "../features/messageSlice";
import presenceReducer from "../features/presenceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
    presence: presenceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
