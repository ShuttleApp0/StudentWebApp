import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>  {/* Wrapping your app with Router */}
    <Routes>  {/* Define Routes here */}
      <Route path="/" element={<Home />} />  
    </Routes>
  </Router>
);
