import { useState, useEffect } from "react";
import api from "../api/axios";

export default function PurchaseCreate() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    supplier_id: "",
    items: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [s, p] = await Promise.all([
      api.get("/suppliers"),
      api.get("/products"),
    ]);

    setSuppliers(s.data);
    setProducts(p.data);
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        { product_id: "", quantity: 1, unit_price: 0 },
      ],
    });
  };

const handleChange = (index, field, value) => {
  const updated = [...form.items];
  if (field === "quantity") {
    const qty = Number(value);
    updated[index][field] = qty < 1 || Number.isNaN(qty) ? 1 : qty;
  } else {
    updated[index][field] = value;
  }

  if (field === "product_id") {
    const selected = products.find((p) => p.id === Number(value));
    if (selected) {
      updated[index].unit_price = selected.price;
    }
  }

  setForm({ ...form, items: updated });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    await api.post("/purchase-orders", {
      supplier_id: form.supplier_id,
      ordered_by_user_id: user.id,
      items: form.items,
    });

    alert("Purchase created");
    window.location.href = "/purchase";
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h3>Create Purchase</h3>

        <form onSubmit={handleSubmit}>

          <select
            className="form-select mb-3"
            onChange={(e) =>
              setForm({
                ...form,
                supplier_id: e.target.value,
              })
            }
          >
            <option>Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.company_name}
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

         {form.items.length > 0 && (
  <div className="row mb-1">
    <div className="col-md-5"></div>
    <div className="col-md-3"><strong>Sasia</strong></div>
    <div className="col-md-4 text-end"><strong>Totali</strong></div>
  </div>
)}

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

    <div className="col-md-4 text-end">
      {(() => {
        const qty = Number(item.quantity) || 0;
        const total = (qty * (Number(item.unit_price) || 0)).toFixed(2);
        return total;
      })()}
    </div>

  </div>
))}

          <button className="btn btn-success w-100 mt-3">
            Save Purchase
          </button>

        </form>

      </div>
    </div>
  );
}