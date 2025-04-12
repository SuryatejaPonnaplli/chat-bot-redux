import { takeLatest, put, call, delay, select } from "redux-saga/effects";
import {
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  sendBotReply,
} from "./messageSlice";
import { RootState } from "../store";

const botReplies: { [key: string]: string[] } = {
  hi: ["Hi there! 👋", "Hello! How can I help you?", "Hey! 😊"],
  how: [
    "I'm just a bot, but I'm here to help!",
    "I'm doing great! How about you?",
  ],
  help: [
    "Sure! What do you need help with?",
    "I'm here to assist. Ask me anything!",
  ],
  bye: ["Goodbye! Have a great day!", "See you soon! 👋"],
  default: [
    "I'm not sure I understand. Can you rephrase that?",
    "Hmm... Can you clarify? 🤔",
  ],
};

function getBotReply(message: string): string {
  message = message.toLowerCase();
  for (let key in botReplies) {
    if (message.includes(key)) {
      const responses = botReplies[key];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  const defaultResponses = botReplies["default"];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function* handleSendMessage(action: ReturnType<typeof sendMessageRequest>) {
  try {
    const { user, message } = action.payload;

    yield delay(500);

    yield put(sendMessageSuccess({ user, message }));

    const activeUser: string | null = yield select(
      (state: RootState) => state.messages.activeUser
    );

    if (activeUser !== user) return;

    yield delay(1000);
    const botMessage = {
      sender: "ChatBot",
      content: getBotReply(message.content),
    };

    yield put(sendBotReply({ user, message: botMessage }));
  } catch (error) {
    yield put(sendMessageFailure("Failed to send message"));
  }
}

function* messagesSaga() {
  yield takeLatest(sendMessageRequest.type, handleSendMessage);
}

export default messagesSaga;
