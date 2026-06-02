import { useState, useEffect } from "react";
import api from "../api/axios";

export default function SalesCreate() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    items: [],
    discount: 0,
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
    setForm({
      ...form,
      items: [
        ...form.items,
        { product_id: "", quantity: 1, price: 0 },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = value;

    if (field === "product_id") {
      const selected = products.find(
        (p) => p.id === Number(value)
      );

      if (selected) {
        updated[index].price = selected.price;
      }
    }

    setForm({ ...form, items: updated });
  };

  const calculateTotal = () => {
    return form.items.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  };

  const finalTotal = () => {
    return calculateTotal() - Number(form.discount || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    await api.post("/sales", {
      customer_id: form.customer_id,
      user_id: user.id,
      items: form.items,
      discount: form.discount,
    });

    alert("Sale created");
    window.location.href = "/sales";
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h3>Create Sale</h3>

        <form onSubmit={handleSubmit}>

          {/* CUSTOMER */}
          <select
            className="form-select mb-3"
            onChange={(e) =>
              setForm({
                ...form,
                customer_id: e.target.value,
              })
            }
          >
            <option>Select Customer</option>
            {customers.map((c) => (
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

          {/* ITEMS */}
          {form.items.map((item, i) => (
            <div className="row mb-2" key={i}>

              <div className="col-md-5">
                <select
                  className="form-select"
                  value={item.product_id}
                  onChange={(e) =>
                    handleChange(
                      i,
                      "product_id",
                      e.target.value
                    )
                  }
                >
                  <option>Product</option>
                  {products.map((p) => (
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
                    handleChange(
                      i,
                      "quantity",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  value={item.price}
                  onChange={(e) =>
                    handleChange(
                      i,
                      "price",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          ))}

          {/* DISCOUNT */}
          <input
            type="number"
            className="form-control mt-3"
            placeholder="Discount"
            onChange={(e) =>
              setForm({
                ...form,
                discount: e.target.value,
              })
            }
          />

          {/* TOTAL */}
          <div className="mt-3">
            <h5>Total: ${calculateTotal()}</h5>
            <h4>Final: ${finalTotal()}</h4>
          </div>

          <button className="btn btn-success w-100 mt-3">
            Create Sale
          </button>

        </form>

      </div>
    </div>
  );
}