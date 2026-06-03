import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    parent_category_id: "",
    status: "active",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, form);
      } else {
        await api.post("/categories", form);
      }

      setForm({
        name: "",
        description: "",
        parent_category_id: "",
        status: "active",
      });

      setEditingId(null);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // EDIT
  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      description: cat.description || "",
      parent_category_id: cat.parent_category_id || "",
      status: cat.status,
    });

    setEditingId(cat.id);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;

    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
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
            <h4>{editingId ? "Edit Category" : "Create Category"}</h4>

            <form onSubmit={handleSubmit}>

              <input
                className="form-control mb-2"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-2"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="parent_category_id"
                placeholder="Parent Category ID"
                value={form.parent_category_id}
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

              <button className="btn btn-primary w-100">
                {editingId ? "Update" : "Create"}
              </button>

            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="col-md-8">
          <div className="card p-3 shadow">

            <h4>Categories</h4>

            <table className="table table-bordered">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Parent ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.description}</td>
                    <td>{c.parent_category_id}</td>
                    <td>{c.status}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(c)}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(c.id)}
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