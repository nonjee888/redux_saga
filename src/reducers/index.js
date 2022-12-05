import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import userReducer from "./user/reducer";
import userSaga from "./user/saga";

export const reducers = combineReducers({
  userReducer,
});

// 사가 함수를 작성할땐 * 별표 키워드와 함께 시작
export function* rootSaga() {
  yield all([fork(userSaga)]);
}
