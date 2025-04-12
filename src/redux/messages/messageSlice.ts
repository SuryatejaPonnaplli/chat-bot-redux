import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  sender: string;
  content: string;
}

interface MessagesState {
  messages: { [key: string]: Message[] };
  activeUser: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: {},
  activeUser: null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<string | null>) => {
      state.activeUser = action.payload;
    },
    clearMessages: (state) => {
      state.messages = {};
      state.activeUser = null;
      state.loading = false;
      state.error = null;
    },
    sendMessageRequest: (
      state,
      action: PayloadAction<{ user: string; message: Message }>
    ) => {
      state.loading = true;
    },
    sendMessageSuccess: (
      state,
      action: PayloadAction<{ user: string; message: Message }>
    ) => {
      state.loading = false;
      state.error = null;
      const { user, message } = action.payload;
      if (!state.messages[user]) {
        state.messages[user] = [];
      }
      state.messages[user].push(message);
    },
    sendMessageFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    sendBotReply: (
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

export const {
  setActiveUser,
  clearMessages,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  sendBotReply,
} = messageSlice.actions;
export default messageSlice.reducer;
