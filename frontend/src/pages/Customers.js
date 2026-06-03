import { useEffect, useState } from "react";
import api from "../api/axios";
import { getUser } from "../utils/auth";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const user = getUser();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting customer");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/customers/edit/${id}`;
  };

  return (
    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Customers</h3>

        {user?.roles?.includes("Admin") && (
          <a href="/customers/create" className="btn btn-primary">
            + Create Customer
          </a>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">

          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Status</th>

              {user?.roles?.includes("Admin") && (
                <th>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.first_name}</td>
                <td>{c.last_name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.city}</td>

                <td>
                  <span
                    className={`badge bg-${
                      c.status === "active"
                        ? "success"
                        : "secondary"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                {user?.roles?.includes("Admin") && (
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(c.id)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(c.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}