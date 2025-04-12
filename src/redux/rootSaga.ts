import { all } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import messagesSaga from "./messages/messageSaga";

export default function* rootSaga() {
  yield all([authSaga(), messagesSaga()]);
}
