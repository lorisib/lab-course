import { useEffect, useState } from "react";
import api from "../api/axios";

export default function SalesPage() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([]);

  // load data
  useEffect(() => {
    const load = async () => {
      const c = await api.get("/customers");
      const p = await api.get("/products");

      setCustomers(c.data);
      setProducts(p.data);
    };

    load();
  }, []);

  // add product to cart
  const addItem = (product) => {
    const exists = items.find(i => i.product_id === product.id);

    if (exists) {
      setItems(items.map(i =>
        i.product_id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      setItems([
        ...items,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ]);
    }
  };

  // update qty
  const updateQty = (id, qty) => {
    setItems(items.map(i =>
      i.product_id === id
        ? { ...i, quantity: Number(qty) }
        : i
    ));
  };

  // total
  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // submit sale
  const createSale = async () => {
    try {
      await api.post("/sales", {
        customer_id: customerId,
        user_id: 1,
        items: items.map(i => ({
          product_id: i.product_id,
          quantity: i.quantity
        }))
      });

      alert("Sale created");
      setItems([]);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container-fluid p-4">

      <div className="row">

        {/* LEFT - PRODUCTS */}
        <div className="col-md-8">

          <h4>Products</h4>

          <div className="row">

            {products.map(p => (
              <div key={p.id} className="col-md-4 mb-3">

                <div className="card shadow-sm">

                  {/* IMAGE (OPTIONAL) */}
                  {p.image_url && (
                    <img
                      src={`http://localhost:5000/${p.image_url}`}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body">
                    <h6>{p.name}</h6>
                    <p>${p.price}</p>

                    <button
                      className="btn btn-primary btn-sm w-100"
                      onClick={() => addItem(p)}
                    >
                      Add
                    </button>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* RIGHT - CART */}
        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-body">

              <h5>Cart</h5>

              {/* CUSTOMER */}
              <select
                className="form-control mb-3"
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option>Select customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.first_name} {c.last_name}
                  </option>
                ))}
              </select>

              {/* ITEMS */}
              {items.map(i => (
                <div key={i.product_id} className="mb-2">

                  <strong>{i.name}</strong>

                  <div className="d-flex gap-2">

                    <input
                      type="number"
                      value={i.quantity}
                      onChange={(e) =>
                        updateQty(i.product_id, e.target.value)
                      }
                      className="form-control"
                    />

                    <span className="p-2">
                      ${i.price * i.quantity}
                    </span>

                  </div>

                </div>
              ))}

              <hr />

              <h5>Total: ${total}</h5>

              <button
                className="btn btn-success w-100 mt-2"
                onClick={createSale}
              >
                Complete Sale
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}