import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import logolab from "../images.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const isAdmin = user?.roles?.includes("Admin");
  const isManager = user?.roles?.includes("Manager");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center">

      {/* LEFT */}
      <div className="d-flex align-items-center">
        <img
          src={logolab}
          alt="logo"
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            marginRight: 10
          }}
        />

        <Link className="navbar-brand mb-0" to="/dashboard">
          Cipher
        </Link>
      </div>

      {/* CENTER */}
      <div className="d-none d-md-flex gap-3">
        <Link className="text-white text-decoration-none" to="/dashboard">
          Dashboard
        </Link>

        <Link className="text-white text-decoration-none" to="/products">
          Products
        </Link>

        <Link className="text-white text-decoration-none" to="/sales">
          Sales
        </Link>

        <Link className="text-white text-decoration-none" to="/customers">
          Customers
        </Link>
      </div>

      {/* RIGHT */}
      <div className="d-flex align-items-center">

        <div className="text-end me-3 text-white">
          <div style={{ fontSize: 14 }}>
            {user?.first_name} {user?.last_name}
          </div>

          <small className="text-white-50">
            {user?.roles?.[0]}
          </small>
        </div>

        {/* DROPDOWN */}
        <div className="dropdown me-3">
          <button
            className="btn btn-outline-light btn-sm dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Menu
          </button>

          <ul className="dropdown-menu dropdown-menu-end">

            <li>
              <Link className="dropdown-item" to="/invoices">
                Invoices
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" to="/loyalty-cards">
                Loyalty Cards
              </Link>
            </li>

            {(isAdmin || isManager) && (
              <>
                <li>
                  <Link className="dropdown-item" to="/suppliers">
                    Suppliers
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/purchase">
                    Purchases
                  </Link>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li>
                  <Link className="dropdown-item" to="/categories">
                    Categories
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/brands">
                    Brands
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item" to="/users">
                    Users
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/audit-logs">
                    Audit Logs
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="btn btn-danger btn-sm"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}