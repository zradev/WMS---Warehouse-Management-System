import React from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/global.css";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
