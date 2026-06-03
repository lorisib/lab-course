import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import { getUser } from "../utils/auth";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [monthlySales, setMonthlySales] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);

  const user = getUser();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        kpis,
        salesChart,
        bestSelling,
        products,
        customers,
        invoices,
        suppliers,
        categories,
      ] = await Promise.all([
        api.get("/dashboard/kpis"),
        api.get("/dashboard/monthly-sales"),
        api.get("/dashboard/best-selling-products"),
        api.get("/products"),
        api.get("/customers"),
        api.get("/invoices"),
        api.get("/suppliers"),
        api.get("/categories"),
      ]);

      setStats({
        totalSales: kpis.data.totalSales,
        revenue: kpis.data.revenue,
        lowStock: kpis.data.lowStockProducts,
        products: products.data.length,
        customers: customers.data.length,
        invoices: invoices.data.length,
        suppliers: suppliers.data.length,
        categories: categories.data.length,
      });

      setMonthlySales(salesChart.data || []);
      setBestProducts(bestSelling.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="mb-4">
        <h3 className="mb-0">Dashboard</h3>
        <small className="text-muted">
          Welcome {user?.first_name} {user?.last_name}
        </small>
      </div>

      {/* STATS */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <StatCard title="Revenue" value={stats.revenue || 0} color="success" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Total Sales" value={stats.totalSales || 0} color="primary" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Low Stock" value={stats.lowStock || 0} color="danger" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Products" value={stats.products || 0} color="dark" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Customers" value={stats.customers || 0} color="info" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Invoices" value={stats.invoices || 0} color="warning" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Suppliers" value={stats.suppliers || 0} color="secondary" />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard title="Categories" value={stats.categories || 0} color="primary" />
        </div>
      </div>

      {/* MONTHLY SALES */}
      <div className="card p-3 mt-4 shadow-sm">
        <h5 className="mb-3">Monthly Sales</h5>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#28a745"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#007bff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*BEST SELLING PRODUCTS */}
      <div className="card shadow p-3 mt-4">
        <h5 className="mb-3">Best Selling Products</h5>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Total Sold</th>
            </tr>
          </thead>

          <tbody>
            {bestProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No data yet
                </td>
              </tr>
            ) : (
              bestProducts.map((p, i) => (
                <tr key={i}>
                  <td>{p.Product?.name}</td>
                  <td>${p.Product?.price}</td>
                  <td>{p.Product?.stock_quantity}</td>
                  <td>
                    <span className="badge bg-success">
                      {p.total_sold}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}