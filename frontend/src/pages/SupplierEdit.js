import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function SupplierEdit() {
  const { id } = useParams();

  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    status: "",
  });

  useEffect(() => {
    const loadSupplier = async () => {
      const res = await api.get(`/suppliers/${id}`);
      setForm(res.data);
    };

    loadSupplier();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/suppliers/${id}`, form);
      alert("Updated successfully");
      window.location.href = "/suppliers";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3>Edit Supplier</h3>

        <form onSubmit={handleSubmit}>
          <input name="company_name" value={form.company_name} className="form-control mb-2" onChange={handleChange} />
          <input name="contact_person" value={form.contact_person} className="form-control mb-2" onChange={handleChange} />
          <input name="email" value={form.email} className="form-control mb-2" onChange={handleChange} />
          <input name="phone" value={form.phone} className="form-control mb-2" onChange={handleChange} />
          <input name="address" value={form.address} className="form-control mb-2" onChange={handleChange} />
          <input name="city" value={form.city} className="form-control mb-2" onChange={handleChange} />
          <input name="country" value={form.country} className="form-control mb-2" onChange={handleChange} />

          <select name="status" value={form.status} className="form-control mb-3" onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blacklisted">Blacklisted</option>
          </select>

          <button className="btn btn-success w-100">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}