import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>

      <h4 className="text-center mb-4">Shop Admin</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/products">
            Products
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/sales">
            Sales
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/customers">
            Customers
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/invoices">
            Invoices
          </Link>
        </li>

      </ul>

    </div>
  );
}