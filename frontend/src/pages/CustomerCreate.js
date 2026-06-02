import { useState } from "react";
import api from "../api/axios";

export default function CustomerCreate() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/customers", form);
      alert("Customer created");
      window.location.href = "/customers";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3>Create Customer</h3>

        <form onSubmit={handleSubmit}>
          <input name="first_name" className="form-control mb-2" placeholder="First Name" onChange={handleChange} />
          <input name="last_name" className="form-control mb-2" placeholder="Last Name" onChange={handleChange} />
          <input name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
          <input name="phone" className="form-control mb-2" placeholder="Phone" onChange={handleChange} />
          <input name="city" className="form-control mb-2" placeholder="City" onChange={handleChange} />
          <input name="address" className="form-control mb-2" placeholder="Address" onChange={handleChange} />

          <select name="status" className="form-control mb-3" onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="btn btn-primary w-100">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}