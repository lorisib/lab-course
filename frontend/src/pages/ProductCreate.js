import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductCreate() {
  const [form, setForm] = useState({
    name: "",
    sku_code: "",
    category_id: "",
    brand_id: "",
    price: "",
    stock_quantity: "",
    description: ""
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // load dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await api.get("/categories");
        const brandRes = await api.get("/brands");

        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", form);
      alert("Product created");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h4 className="mb-3">Create Product</h4>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <input
            name="name"
            className="form-control mb-2"
            placeholder="Product name"
            onChange={handleChange}
          />

          {/* SKU */}
          <input
            name="sku_code"
            className="form-control mb-2"
            placeholder="SKU code"
            onChange={handleChange}
          />

          {/* CATEGORY DROPDOWN */}
          <select
            name="category_id"
            className="form-control mb-2"
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* BRAND DROPDOWN */}
          <select
            name="brand_id"
            className="form-control mb-2"
            onChange={handleChange}
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* PRICE */}
          <input
            name="price"
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            onChange={handleChange}
          />

          {/* STOCK */}
          <input
            name="stock_quantity"
            type="number"
            className="form-control mb-2"
            placeholder="Stock"
            onChange={handleChange}
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="Description"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
}