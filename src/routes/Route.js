import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourite from "../containers/favourite/Favourite";
import Homepage from "../containers/homepage/Homepage";
import RecentSearch from "../containers/recentSearch/RecentSearch";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/favourite" element={<Favourite />} />
        <Route exact path="/recent-search" element={<RecentSearch />} />
      </Routes>
    </Router>
  );
};

export default Routers;
