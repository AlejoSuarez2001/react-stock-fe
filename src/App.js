import Home from "./pages/Home.jsx";
import StockDetail from "./pages/StockDetail.jsx";
import WatchList from "./pages/WatchList.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

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
