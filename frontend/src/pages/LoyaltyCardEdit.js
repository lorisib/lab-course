import { useEffect, useState } from "react";
import api from "../api/axios";

export default function LoyaltyEdit() {
  const id = window.location.pathname.split("/").pop();

  const [form, setForm] = useState({
    customer_id: "",
    total_points: "",
    level: "",
    status: "",
    issue_date: "",
    expiration_date: ""
  });

  useEffect(() => {
    loadCard();
  }, []);

  const loadCard = async () => {
    try {
      const res = await api.get("/loyalty");
      const data = res.data.find((x) => x.id == id);
      setForm(data);
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
      await api.put(`/loyalty/${id}`, form);
      window.location.href = "/loyalty-cards";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3>Edit Loyalty Card</h3>

        <form onSubmit={handleSubmit}>

          <input
            name="total_points"
            type="number"
            className="form-control mt-2"
            value={form.total_points || ""}
            onChange={handleChange}
          />

          {/* LEVEL */}
          <select
            name="level"
            className="form-select mt-2"
            value={form.level || ""}
            onChange={handleChange}
          >
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>

          {/* STATUS */}
          <select
            name="status"
            className="form-select mt-2"
            value={form.status || ""}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="frozen">Frozen</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            name="issue_date"
            className="form-control mt-2"
            value={form.issue_date || ""}
            onChange={handleChange}
          />

          <input
            type="date"
            name="expiration_date"
            className="form-control mt-2"
            value={form.expiration_date || ""}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100 mt-3">
            Update
          </button>

        </form>
      </div>
    </div>
  );
}