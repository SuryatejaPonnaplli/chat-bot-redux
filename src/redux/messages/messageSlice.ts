import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  sender: string;
  content: string;
}

interface MessagesState {
  messages: { [key: string]: Message[] };
}

const initialState: MessagesState = {
  messages: {},
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ user: string; message: Message }>
    ) => {
      const { user, message } = action.payload;
      if (!state.messages[user]) {
        state.messages[user] = [];
      }
      state.messages[user].push(message);
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
