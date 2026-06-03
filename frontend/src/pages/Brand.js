import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    country_of_origin: "",
    description: "",
    status: "active",
    logo: null,
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await api.get("/brands");
      setBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    setForm({ ...form, logo: e.target.files[0] });
  };

  // CREATE OR UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("country_of_origin", form.country_of_origin);
      data.append("description", form.description);
      data.append("status", form.status);

      if (form.logo) {
        data.append("logo", form.logo);
      }

      if (editingId) {
        await api.put(`/brands/${editingId}`, data);
      } else {
        await api.post("/brands", data);
      }

      setForm({
        name: "",
        country_of_origin: "",
        description: "",
        status: "active",
        logo: null,
      });

      setEditingId(null);
      fetchBrands();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // EDIT
  const handleEdit = (brand) => {
    setForm({
      name: brand.name,
      country_of_origin: brand.country_of_origin || "",
      description: brand.description || "",
      status: brand.status,
      logo: null,
    });

    setEditingId(brand.id);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete brand?")) return;

    try {
      await api.delete(`/brands/${id}`);
      fetchBrands();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">

      <div className="row">

        {/* FORM */}
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h4>{editingId ? "Edit Brand" : "Create Brand"}</h4>

            <form onSubmit={handleSubmit}>

              <input
                className="form-control mb-2"
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                placeholder="Country"
                name="country_of_origin"
                value={form.country_of_origin}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-2"
                placeholder="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />

              <select
                className="form-select mb-2"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="deleted">Deleted</option>
              </select>

              <input
                type="file"
                className="form-control mb-2"
                onChange={handleFile}
              />

              <button className="btn btn-primary w-100">
                {editingId ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="col-md-8">
          <div className="card p-3 shadow">
            <h4>Brands</h4>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {brands.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>

                    <td>
                      {b.logo_url ? (
                        <img
                          src={`http://localhost:5000/${b.logo_url}`}
                          alt="logo"
                          width="50"
                        />
                      ) : (
                        "No logo"
                      )}
                    </td>

                    <td>{b.name}</td>
                    <td>{b.country_of_origin}</td>
                    <td>{b.description}</td>
                    <td>{b.status}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(b)}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(b.id)}
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

      </div>
    </div>
  );
}