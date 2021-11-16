import React from "react";
import Router from "./Router";
import "./assets/style.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
