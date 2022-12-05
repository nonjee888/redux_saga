import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./component/main";
import Search from "./component/Search";

const Router = () => {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default Router;
