import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Purchases() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await api.get("/purchase-orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete purchase order?")) return;

    try {
      await api.delete(`/purchase-orders/${id}`);
      fetchPurchases();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting");
    }
  };

  const handleView = (id) => {
    window.location.href = `/purchase/${id}`;
  };

  return (
    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Purchase Orders</h3>

        <a href="/purchase/create" className="btn btn-primary">
          + Create Purchase
        </a>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">

          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Order Number</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.order_number}</td>
                <td>${o.total_amount}</td>
                <td>
                  <span className="badge bg-success">
                    {o.status}
                  </span>
                </td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(o.id)}
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