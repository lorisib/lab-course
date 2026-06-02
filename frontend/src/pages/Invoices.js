import { useEffect, useState } from "react";
import api from "../api/axios";
import { getUser } from "../utils/auth";

const user = getUser();

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await api.get("/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete invoice?")) return;

    try {
      await api.delete(`/invoices/${id}`);
      fetchInvoices();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting invoice");
    }
  };

  return (
    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Invoices</h3>
      </div>
      <div className="table-responsive">

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Invoice #</th>
              <th>Sale ID</th>
              <th>PDF</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.invoice_number}</td>
                <td>{inv.sale_id}</td>
                <td>
                  {inv.pdf_path ? (
                    <a
                      href={`http://localhost:5000/${inv.pdf_path}`}
                      target="_blank"
                    >
                      View PDF
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {(user?.roles?.includes("Admin")) && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(inv.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}