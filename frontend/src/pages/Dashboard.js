import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layout/AdminLayout";
import StatCard from "../components/StatCard";
import { getUser } from "../utils/auth";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    sales: 0,
    customers: 0,
    invoices: 0,
  });

  const user = getUser();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, sales, customers, invoices] = await Promise.all([
          api.get("/products"),
          api.get("/sales"),
          api.get("/customers"),
          api.get("/invoices"),
        ]);

        setStats({
          products: products.data?.length || 0,
          sales: sales.data?.length || 0,
          customers: customers.data?.length || 0,
          invoices: invoices.data?.length || 0,
        });
      } catch (err) {
        console.log("Dashboard error:", err.response?.data || err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-0">Dashboard</h3>

          <small className="text-muted">
            Welcome, {user?.first_name || "User"} {user?.last_name || ""}
          </small>
        </div>

        <span className="badge bg-primary p-2">
          {user?.roles?.[0] || "No Role"}
        </span>
      </div>

      {/* STATS */}
      <div className="row">
        <div className="col-md-3 col-sm-6 mb-3">
          <StatCard title="Products" value={stats.products} color="primary" />
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <StatCard title="Sales" value={stats.sales} color="success" />
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <StatCard title="Customers" value={stats.customers} color="info" />
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <StatCard title="Invoices" value={stats.invoices} color="warning" />
        </div>
      </div>
    </AdminLayout>
  );
}