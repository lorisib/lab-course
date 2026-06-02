import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">
        Store System
      </Link>

      <div>
        <Link className="text-white me-3" to="/products">Products</Link>
        <Link className="text-white me-3" to="/sales">Sales</Link>
        <Link className="text-white" to="/discounts">Discounts</Link>
      </div>
    </nav>
  );
} 