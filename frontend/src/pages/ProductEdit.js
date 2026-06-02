import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();

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
  const [preview, setPreview] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // LOAD PRODUCT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, catRes, brandRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories"),
          api.get("/brands"),
        ]);

        const p = productRes.data;

        setForm({
          sku_code: p.sku_code,
          name: p.name,
          category_id: p.category_id,
          brand_id: p.brand_id,
          size: p.size,
          color: p.color,
          price: p.price,
          stock_quantity: p.stock_quantity,
          description: p.description,
        });

        setPreview(
          p.image_url
            ? `http://localhost:5000${p.image_url}`
            : ""
        );

        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (image) {
        data.append("image", image);
      }

      await api.put(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully");
      window.location.href = "/products";
    } catch (err) {
      alert(err.response?.data?.message || "Error updating");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h3 className="mb-3">Edit Product</h3>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <input
                name="sku_code"
                className="form-control"
                value={form.sku_code}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* CATEGORY */}
            <div className="col-md-6">
              <select
                className="form-select"
                value={form.category_id}
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
                value={form.brand_id}
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
                value={form.color}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="price"
                className="form-control"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="col-md-12">
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}

              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>

            <div className="col-md-12">
              <textarea
                name="description"
                className="form-control"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12">
              <button className="btn btn-primary w-100">
                Update Product
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}