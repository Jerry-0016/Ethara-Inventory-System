import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">Ethara.AI</div>
      <div className="nav-links">
        <Link
          to="/products"
          className={isActive("/products") ? "nav-link active" : "nav-link"}
        >
          Products
        </Link>

        <Link
          to="/customers"
          className={isActive("/customers") ? "nav-link active" : "nav-link"}
        >
          Customers
        </Link>

        <Link
          to="/orders"
          className={isActive("/orders") ? "nav-link active" : "nav-link"}
        >
          Orders
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
