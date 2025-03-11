import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PresenceState {
  onlineUsers: Record<string, boolean>;
}

const initialState: PresenceState = {
  onlineUsers: {},
};

const presenceSlice = createSlice({
  name: "presence",
  initialState,
  reducers: {
    setUserOnline: (state, action: PayloadAction<string>) => {
      state.onlineUsers[action.payload] = true;
    },
    setUserOffline: (state, action: PayloadAction<string>) => {
      state.onlineUsers[action.payload] = false;
    },
  },
});

export const { setUserOnline, setUserOffline } = presenceSlice.actions;
export default presenceSlice.reducer;
