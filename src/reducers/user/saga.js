import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  SEARCH_USERS_FAIL,
  SEARCH_USERS_REQ,
  SEARCH_USERS_SUCCESS,
} from "./action";
import axios from "axios";

function getUsers(params = "") {
  // api호출을 하기 위해 axios를 사용한다.
  // users api 호출을 위해 해당 주소를 가져오고 params를 합쳐서 검색 조건에 따라 필터가 되도록 한다.
  return axios.get("http://localhost:8080/users" + params);
}

// 사용자 검색 액션 요청에 따라 실행되는 함수
// 이 함수를 통해 액션을 dispatch해서 api를 호출하여 결과를 전달함
// 먼저 api를 호출하는 함수를 만든다
function* searchRequest(action) {
  // call 함수를 이용해 api를 호출한다
  // call은 함수를 동기적으로 실행해줌
  // getUsers 함수를 호출하고 SEARCH_USERS_REQ 액션 실행시 전달되는 params를 getUsers함수로 넘긴다
  const userData = yield call(getUsers, action.params);
  // put으로 action dispatch 해줌
  // try catch 이용해 성공시 실패시를 분기처리하기
  try {
    yield put({ type: SEARCH_USERS_SUCCESS, data: userData.data });
  } catch (error) {
    yield put({ type: SEARCH_USERS_FAIL, data: error.response.data });
  }
}
// SEARCH_USERS_REQ 액션을 감지하는 함수를 userSaga에 세팅
function* waitSearchReq() {
  // yield는 다음 동작을 제어하는 의미를 가지는 es6문법
  // takeLatest는 가장 마지막에 실행된 액션을 감지하는 것
  // 두번째로 핸들러를 제공해서 실행할 함수를 구성한다.
  yield takeLatest(SEARCH_USERS_REQ, searchRequest);
}

//1. userSaga를 먼저 만든다음 액션을 리슨하는 함수를 만든다.
export default function* userSaga() {
  // all 함수는 내부배열에 등록된 사가 함수들을 리덕스 사가 미들웨어에 등록하는 부수효과 함수
  // 다음으로 rootSaga함수 세팅하기
  yield all([waitSearchReq()]);
}
