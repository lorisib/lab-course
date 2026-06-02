import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function CustomerEdit() {
  const { id } = useParams();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    status: "",
  });

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/customers/${id}`);
      setForm(res.data);
    };

    load();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/customers/${id}`, form);
      alert("Updated successfully");
      window.location.href = "/customers";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3>Edit Customer</h3>

        <form onSubmit={handleSubmit}>
          <input name="first_name" value={form.first_name} className="form-control mb-2" onChange={handleChange} />
          <input name="last_name" value={form.last_name} className="form-control mb-2" onChange={handleChange} />
          <input name="email" value={form.email} className="form-control mb-2" onChange={handleChange} />
          <input name="phone" value={form.phone} className="form-control mb-2" onChange={handleChange} />
          <input name="city" value={form.city} className="form-control mb-2" onChange={handleChange} />
          <input name="address" value={form.address} className="form-control mb-2" onChange={handleChange} />

          <select name="status" value={form.status} className="form-control mb-3" onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="btn btn-success w-100">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}