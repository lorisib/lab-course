import { useState } from "react";
import api from "../api/axios";

export default function DiscountCreate() {
  const [form, setForm] = useState({
    name: "",
    discount_type: "percentage",
    value: "",
    start_date: "",
    end_date: "",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/discounts", form);
      window.location.href = "/discounts";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3>Create Discount</h3>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            className="form-control mt-2"
            placeholder="Discount Name"
            onChange={handleChange}
          />

          <select
            name="discount_type"
            className="form-select mt-2"
            onChange={handleChange}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>

          <input
            name="value"
            type="number"
            className="form-control mt-2"
            placeholder="Value"
            onChange={handleChange}
          />

          <input
            type="date"
            name="start_date"
            className="form-control mt-2"
            onChange={handleChange}
          />

          <input
            type="date"
            name="end_date"
            className="form-control mt-2"
            onChange={handleChange}
          />

          <select
            name="status"
            className="form-select mt-2"
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="btn btn-success w-100 mt-3">
            Save
          </button>

        </form>
      </div>
    </div>
  );
}