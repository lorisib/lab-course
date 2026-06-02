import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AssignDiscount() {
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  const [form, setForm] = useState({
    product_id: "",
    discount_id: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [p, d] = await Promise.all([
        api.get("/products"),
        api.get("/discounts"),
      ]);

      setProducts(p.data);
      setDiscounts(d.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/product-discounts/assign", form);

      alert("Discount assigned successfully");

      setForm({
        product_id: "",
        discount_id: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h4 className="mb-3">Assign Discount to Product</h4>

        <form onSubmit={handleSubmit}>

          {/* PRODUCT SELECT */}
          <select
            className="form-select mb-3"
            value={form.product_id}
            onChange={(e) =>
              setForm({ ...form, product_id: e.target.value })
            }
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* DISCOUNT SELECT */}
          <select
            className="form-select mb-3"
            value={form.discount_id}
            onChange={(e) =>
              setForm({ ...form, discount_id: e.target.value })
            }
          >
            <option value="">Select Discount</option>
            {discounts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} - {d.value}%
              </option>
            ))}
          </select>

          <button className="btn btn-primary w-100">
            Assign Discount
          </button>

        </form>

      </div>
    </div>
  );
}