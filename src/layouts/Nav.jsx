import "../styles/nav.css";
import { Outlet, Link } from "react-router-dom";
import { RiStockLine } from "react-icons/ri";

export default function Nav() {
  return (
    <div>
      <nav className="navbar mb-3 d-flex justify-content-between py-3">
        <div className="logoContainer col-2 d-flex align-items-center justify-content-center">
          <Link to="/">
            <h1 className="logo text-center">Nasdaq Stocks</h1>
          </Link>
          <RiStockLine className="logoIcon" style={{ fontSize: "36px" }} />
        </div>
        <ul className="col-8 d-flex align-items-center justify-content-start">
          <li>
            <Link className="nav_item px-5" to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="nav_item px-5" to="/watchList">
              Watch List
            </Link>
          </li>
        </ul>
        <div className="search col-2 d-flex align-items-center justify-content-center">
          <div>Search</div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
