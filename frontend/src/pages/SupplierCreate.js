import { useState } from "react";
import api from "../api/axios";

export default function SupplierCreate() {
  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/suppliers", form);
      alert("Supplier created");
      window.location.href = "/suppliers";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3>Create Supplier</h3>

        <form onSubmit={handleSubmit}>
          <input required name="company_name" className="form-control mb-2" placeholder="Company Name" onChange={handleChange} />
          <input required name="contact_person" className="form-control mb-2" placeholder="Contact Person" onChange={handleChange} />
          <input required name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
          <input required name="phone" className="form-control mb-2" placeholder="Phone" onChange={handleChange} />
          <input required name="address" className="form-control mb-2" placeholder="Address" onChange={handleChange} />
          <input required name="city" className="form-control mb-2" placeholder="City" onChange={handleChange} />
          <input required name="country" className="form-control mb-2" placeholder="Country" onChange={handleChange} />

          <select required name="status" className="form-control mb-3" onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blacklisted">Blacklisted</option>
          </select>

          <button className="btn btn-primary w-100">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}