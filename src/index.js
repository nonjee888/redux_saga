import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { reducers, rootSaga } from "./reducers";
import { createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware } from "redux";

// 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

// 그다음 스토어에 applyMiddleWare이용해 미들웨어 연결
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// 그다음 사가 미들웨어에서 통합 사가 함수를 실행시킨다
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
