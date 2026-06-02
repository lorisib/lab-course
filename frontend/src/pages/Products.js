import { useEffect, useState } from "react";
import api from "../api/axios";

import { getUser } from "../utils/auth";

const user = getUser();

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/products/edit/${id}`;
  };

  return (
    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Products</h3>
        <a href="/products/create" className="btn btn-primary">
          + Create Product
        </a>
      </div>

      <div className="row g-3">

        {products.map((p) => (
          <div
            key={p.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div className="card shadow-sm h-100">

              {/* IMAGE */}
              <img
                src={
                  p.image_url
                    ? `http://localhost:5000${p.image_url}`
                    : "https://via.placeholder.com/300"
                }
                className="card-img-top"
                style={{ height: "180px", objectFit: "contain" }}
              />

              <div className="card-body d-flex flex-column">

                <h6 className="fw-bold">{p.name}</h6>

                <small className="text-muted">
                  {p.Category?.name} • {p.Brand?.name}
                </small>
                <small className="text-muted">
                  {p.stock_quantity} in stock
                </small>
                <small className="text-muted">
                  SKU: {p.sku_code}
                </small>

                <p className="mt-2 mb-2 fw-bold">
                  ${p.price}
                </p>

                <div className="mt-auto d-flex justify-content-between">

                  {/* EDIT */}
                 {(user?.roles?.includes("Admin") || user?.roles?.includes("Manager"))  && (
  <>
    <button
      className="btn btn-sm btn-outline-primary"
      onClick={() => handleEdit(p.id)}
    >
      <i class="fa-solid fa-pen-to-square"></i>
    </button>

    <button
      className="btn btn-sm btn-outline-danger"
      onClick={() => handleDelete(p.id)}
    >
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </>
)}

                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}