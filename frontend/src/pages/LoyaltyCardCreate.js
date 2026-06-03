import { useEffect, useState } from "react";
import api from "../api/axios";

export default function LoyaltyCreate() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    total_points: 0,
    level: "Bronze",
    status: "active",
    issue_date: "",
    expiration_date: ""
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/loyalty", form);
      window.location.href = "/loyalty";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3>Create Loyalty Card</h3>

        <form onSubmit={handleSubmit}>

          {/* CUSTOMER */}
          <select
            name="customer_id"
            className="form-select mt-2"
            onChange={handleChange}
            value={form.customer_id}
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.first_name} {c.last_name}
              </option>
            ))}
          </select>

          {/* POINTS */}
          <input
            type="number"
            name="total_points"
            className="form-control mt-2"
            placeholder="Points"
            value={form.total_points}
            onChange={handleChange}
          />

          {/* LEVEL ENUM */}
          <select
            name="level"
            className="form-select mt-2"
            value={form.level}
            onChange={handleChange}
          >
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>

          {/* STATUS ENUM */}
          <select
            name="status"
            className="form-select mt-2"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="frozen">Frozen</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* DATES */}
          <input
            type="date"
            name="issue_date"
            className="form-control mt-2"
            value={form.issue_date}
            onChange={handleChange}
          />

          <input
            type="date"
            name="expiration_date"
            className="form-control mt-2"
            value={form.expiration_date}
            onChange={handleChange}
          />

          <button className="btn btn-success w-100 mt-3">
            Save
          </button>

        </form>
      </div>
    </div>
  );
}