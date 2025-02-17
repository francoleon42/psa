import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import AdocRenderer from "../page/components/AdocRenderer";

export const MyRoutes = () => {
  return (

    <Router basename="/psa"> { }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/render/:adocPath" element={<AdocRenderer />} />
      </Routes>
    </Router>

  );
};