import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  logoutRequest,
  logoutSuccess,
} from "./authSlice";

const fakeAuthAPI = {
  login: async (userName: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return (
      users.find(
        (user: any) => user.userName === userName && user.password === password
      ) || null
    );
  },
  signUp: async (newUser: any) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.some(
      (user: any) => user.userName === newUser.userName
    );
    const emailExists = users.some((user: any) => user.email === newUser.email);

    if (userExists) {
      return { success: false, message: "Username already exists" };
    }

    if (emailExists) {
      return { success: false, message: "Email already exists" };
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  },
};

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<any, void, any> {
  try {
    const user = yield call(
      fakeAuthAPI.login,
      action.payload.userName,
      action.payload.password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure("Invalid credentials"));
    }
  } catch (error) {
    yield put(loginFailure("Login failed"));
  }
}
function* handleSignUp(
  action: ReturnType<typeof signUpRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(fakeAuthAPI.signUp, action.payload);

    if (response.success) {
      yield put(
        signUpSuccess({
          userName: action.payload.userName,
          password: action.payload.password,
        })
      );
    } else {
      yield put(signUpFailure(response.message)); // Show error message
    }
  } catch (error) {
    yield put(signUpFailure("Sign up failed"));
  }
}

function* handleLogout(): Generator<any, void, any> {
  try {
    localStorage.removeItem("currentUser");
    yield put(logoutSuccess());
  } catch (error) {
    console.error("Logout failed", error);
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signUpRequest.type, handleSignUp);
  yield takeLatest(logoutRequest.type, handleLogout);
}
