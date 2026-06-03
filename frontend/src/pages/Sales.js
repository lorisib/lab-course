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


                <td>
                  {s.sale_date ? new Date(s.sale_date).toLocaleDateString() : "N/A"}
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(s.id)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
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