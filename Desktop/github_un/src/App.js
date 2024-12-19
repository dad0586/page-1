import React from "react";
import Login from "./components/login";
import Home from "./components/home";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  );
}

export default App;
