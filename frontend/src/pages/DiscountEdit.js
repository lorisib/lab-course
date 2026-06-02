import { useEffect, useState } from "react";
import api from "../api/axios";

export default function DiscountEdit() {
  const id = window.location.pathname.split("/").pop();

  const [form, setForm] = useState({
    name: "",
    discount_type: "",
    value: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  useEffect(() => {
    loadDiscount();
  }, []);

  const loadDiscount = async () => {
    try {
      const res = await api.get(`/discounts/${id}`);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/discounts/${id}`, form);
      window.location.href = "/discounts";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3>Edit Discount</h3>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            className="form-control mt-2"
            value={form.name || ""}
            onChange={handleChange}
          />

          <select
            name="discount_type"
            className="form-select mt-2"
            value={form.discount_type || ""}
            onChange={handleChange}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>

          <input
            name="value"
            type="number"
            className="form-control mt-2"
            value={form.value || ""}
            onChange={handleChange}
          />

          <input
            type="date"
            name="start_date"
            className="form-control mt-2"
            value={form.start_date || ""}
            onChange={handleChange}
          />

          <input
            type="date"
            name="end_date"
            className="form-control mt-2"
            value={form.end_date || ""}
            onChange={handleChange}
          />

          <select
            name="status"
            className="form-select mt-2"
            value={form.status || ""}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="btn btn-primary w-100 mt-3">
            Update
          </button>

        </form>
      </div>
    </div>
  );
}