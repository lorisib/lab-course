import { useState, useEffect } from "react";
import api from "../api/axios";

export default function SalesCreate() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    items: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [c, p] = await Promise.all([
      api.get("/customers"),
      api.get("/products"),
    ]);

    setCustomers(c.data);
    setProducts(p.data);
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          product_id: "",
          quantity: 1,
        },
      ],
    }));
  };

  const handleChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = value;

    if (field === "product_id") {
      const product = products.find(p => p.id === Number(value));

      if (product) {
        updated[index].price = Number(product.price);
      }
    }

    setForm({ ...form, items: updated });
  };

  const calculateTotal = () => {
    return form.items.reduce((acc, item) => {
      const qty = Number(item.quantity || 0);
      const price = Number(item.price || 0);
      return acc + qty * price;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await api.post("/sales", {
        customer_id: form.customer_id,
        user_id: user.id,
        items: form.items,
      });

      alert("Sale created");
      window.location.href = "/sales";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3>Create Sale</h3>

        <form onSubmit={handleSubmit}>
          <select
            className="form-select mb-3"
            onChange={(e) =>
              setForm({ ...form, customer_id: e.target.value })
            }
          >
            <option>Select Customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.first_name} {c.last_name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={addItem}
          >
            + Add Product
          </button>

          {form.items.map((item, i) => (
            <div className="row mb-2" key={i}>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={item.product_id}
                  onChange={(e) =>
                    handleChange(i, "product_id", e.target.value)
                  }
                >
                  <option>Product</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(i, "quantity", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <input
                  className="form-control"
                  value={item.price || 0}
                  disabled
                />
              </div>
            </div>
          ))}

          <div className="mt-3">
            <h4>Total: ${calculateTotal()}</h4>
          </div>

          <button className="btn btn-success w-100 mt-3">
            Create Sale
          </button>
        </form>
      </div>
    </div>
  );
}