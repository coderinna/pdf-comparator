import React, { useState, useEffect } from "react";
import Preloader from "./components/PreLoader/Pre.js";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";

import Home from "./components/Home/Home";
import Help from "./components/Help/Help.js";

import {

  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} /> 
      <div className="App" id={load ? "no-scroll" : "scroll"}>
       <Navbar />
        <div className="App2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
        <Footer />
    </Router>
  );
}

export default App;
