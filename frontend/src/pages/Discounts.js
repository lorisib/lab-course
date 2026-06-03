import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Discounts() {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const res = await api.get("/discounts");
      setDiscounts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this discount?")) return;

    try {
      await api.delete(`/discounts/${id}`);
      fetchDiscounts();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/discounts/edit/${id}`;
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Discounts</h3>

        <a href="/discounts/create" className="btn btn-primary">
          + Create Discount
        </a>
      </div>

      <div className="row g-3">

        {discounts.map((d) => (
          <div key={d.id} className="col-md-4">

            <div className="card shadow-sm p-3">

              <h5>{d.name}</h5>

              <p className="mb-1">
                Type: <b>{d.type}</b>
              </p>

              <p className="mb-1">
                Value: <b>{d.value}</b>
              </p>

              <p className="mb-1 text-muted">
                Status: {d.status}
              </p>

              <div className="d-flex justify-content-between mt-3">

                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(d.id)}
                >
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(d.id)}
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}