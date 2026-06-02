import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/sales");
      setSales(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sale?")) return;

    try {
      await api.delete(`/sales/${id}`);
      fetchSales();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting");
    }
  };

  const handleView = (id) => {
    window.location.href = `/sales/${id}`;
  };

  return (
    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Sales</h3>

        <a href="/sales/create" className="btn btn-primary">
          + Create Sale
        </a>
      </div>

      <div className="table-responsive">

        <table className="table table-bordered table-hover shadow-sm">

          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Discount</th>
              <th>Final</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>
                {s.Customer? `${s.Customer.first_name} ${s.Customer.last_name}`: "N/A"}</td>
                <td>${s.total_amount}</td>
                <td>${s.discount || 0}</td>
                <td>${s.final_amount}</td>
                <td>
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleView(s.id)}
                  >
                    👁
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(s.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}