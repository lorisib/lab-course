import { useState, useEffect } from "react";
import api from "../api/axios";

export default function CreateProduct() {
  const [form, setForm] = useState({
    sku_code: "",
    name: "",
    category_id: "",
    brand_id: "",
    size: "",
    color: "",
    price: "",
    stock_quantity: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // load dropdown data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [c, b] = await Promise.all([
          api.get("/categories"),
          api.get("/brands"),
        ]);

        setCategories(c.data);
        setBrands(b.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // text fields
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (image) {
        data.append("image", image);
      }

      await api.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product created successfully");
      window.location.href = "/products";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-3">Create Product</h3>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <input
                name="sku_code"
                className="form-control"
                placeholder="SKU Code"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                name="name"
                className="form-control"
                placeholder="Product Name"
                onChange={handleChange}
              />
            </div>

            {/* CATEGORY */}
            <div className="col-md-6">
              <select
                className="form-select"
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* BRAND */}
            <div className="col-md-6">
              <select
                className="form-select"
                onChange={(e) =>
                  setForm({ ...form, brand_id: e.target.value })
                }
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

<div className="col-md-4">
  <select
    name="size"
    className="form-select"
    onChange={handleChange}
  >
    <option value="">Select Size</option>
    <option value="XS">XS</option>
    <option value="S">S</option>
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
    <option value="XXL">XXL</option>
    <option value="XXXL">XXXL</option>
    <option value="One Size">One Size</option>
    <option value="Custom">Custom</option>
  </select>
</div>            
            <div className="col-md-4">
              <input
                name="color"
                className="form-control"
                placeholder="Color"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="price"
                type="number"
                className="form-control"
                placeholder="Price"
                onChange={handleChange}
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="col-md-12">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="col-md-12">
              <textarea
                name="description"
                className="form-control"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12">
              <button className="btn btn-primary w-100">
                Create Product
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}