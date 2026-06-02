import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layout/AdminLayout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    sales: 0,
    customers: 0,
    invoices: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const products = await api.get("/products");
        const sales = await api.get("/sales");
        const customers = await api.get("/customers");
        const invoices = await api.get("/invoices");

        setStats({
          products: products.data.length,
          sales: sales.data.length,
          customers: customers.data.length,
          invoices: invoices.data.length
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>

      <div className="row">

        <div className="col-md-3 mb-3">
          <StatCard title="Products" value={stats.products} color="primary" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Sales" value={stats.sales} color="success" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Customers" value={stats.customers} color="info" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Invoices" value={stats.invoices} color="warning" />
        </div>

      </div>

    </AdminLayout>
  );
}