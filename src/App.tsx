import React from "react";
import Home from "./pages/Home";
import StockDetail from "./pages/StockDetail";
import WatchList from "./pages/WatchList";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:symbol" element={<StockDetail />} />
        <Route path="/watchList" element={<WatchList />} />
      </Routes>
    </Router>
  );
}

export default App;
