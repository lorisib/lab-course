import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

// PUBLIC
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

// AUTH
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/Products"));
const Sales = lazy(() => import("../pages/Sales"));
const SalesCreate = lazy(() => import("../pages/SalesCreate"));
const Invoices = lazy(() => import("../pages/Invoices"));
const LoyaltyCards = lazy(() => import("../pages/LoyaltyCards"));
const LoyaltyCardCreate = lazy(() => import("../pages/LoyaltyCardCreate"));
const LoyaltyCardEdit = lazy(() => import("../pages/LoyaltyCardEdit"));
const Customers = lazy(() => import("../pages/Customers"));
const CustomerCreate = lazy(() => import("../pages/CustomerCreate"));
const CustomerEdit = lazy(() => import("../pages/CustomerEdit"));
const ProductCreate = lazy(() => import("../pages/ProductCreate"));
const ProductEdit = lazy(() => import("../pages/ProductEdit"));


// ADMIN / MANAGER
const Suppliers = lazy(() => import("../pages/Suppliers"));
const Purchases = lazy(() => import("../pages/Purchase"));
const PurchaseCreate = lazy(() => import("../pages/PurchaseCreate"));

const SupplierCreate = lazy(() => import("../pages/SupplierCreate"));
const SupplierEdit = lazy(() => import("../pages/SupplierEdit"));
const AssignDiscount = lazy(() => import("../pages/AssignDiscount"));


// ADMIN ONLY
const AuditLogs = lazy(() => import("../pages/AuditLogs"));
const Discounts = lazy(() => import("../pages/Discounts"));
const Brands = lazy(() => import("../pages/Brand"));
const Category = lazy(() => import("../pages/Category"));
const UsersAdmin = lazy(() => import("../pages/UsersAdmin"));
const DiscountEdit = lazy(() => import("../pages/DiscountEdit"));
const DiscountCreate = lazy(() => import("../pages/DiscountCreate"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* AUTH USERS */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
        <Route path="/sales/create" element={<ProtectedRoute><SalesCreate /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
        <Route path="/loyalty-cards" element={<ProtectedRoute><LoyaltyCards /></ProtectedRoute>} />
        <Route path="/loyalty-cards/create" element={<ProtectedRoute><LoyaltyCardCreate /></ProtectedRoute>} />
        <Route path="/loyalty-cards/edit/:id" element={<ProtectedRoute><LoyaltyCardEdit /></ProtectedRoute>} />

        <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/customers/create" element={<ProtectedRoute><CustomerCreate /></ProtectedRoute>} />
        <Route path="/customers/edit/:id" element={<ProtectedRoute><CustomerEdit /></ProtectedRoute>} />

        <Route path="/products/create" element={<ProtectedRoute><ProductCreate /></ProtectedRoute>} />
        <Route path="/products/edit/:id" element={<ProtectedRoute><ProductEdit /></ProtectedRoute>} />

        {/* ADMIN DHE MANAGER */}
        <Route path="/suppliers" element={<ProtectedRoute roles={["Admin", "Manager"]}><Suppliers /></ProtectedRoute>} />
        <Route path="/suppliers/create" element={<ProtectedRoute roles={["Admin", "Manager"]}><SupplierCreate /></ProtectedRoute>} />
        <Route path="/suppliers/edit/:id" element={<ProtectedRoute roles={["Admin", "Manager"]}><SupplierEdit /></ProtectedRoute>} />
        <Route path="/purchase" element={<ProtectedRoute roles={["Admin", "Manager"]}><Purchases /></ProtectedRoute>} />
        <Route path="/purchase/create" element={<ProtectedRoute roles={["Admin", "Manager"]}><PurchaseCreate /></ProtectedRoute>} />
        <Route
        path="/assign-discount"
        element={
        <ProtectedRoute roles={["Admin", "Manager"]}>
        <AssignDiscount />
        </ProtectedRoute>
      }
    />

        {/* ADMIN ONLY */}

        <Route path="/audit-logs" element={<ProtectedRoute roles={["Admin"]}><AuditLogs /></ProtectedRoute>} />
        <Route path="/discounts" element={<ProtectedRoute roles={["Admin"]}><Discounts /></ProtectedRoute>} />
        <Route path="/brands" element={<ProtectedRoute roles={["Admin"]}><Brands /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute roles={["Admin"]}><Category /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute roles={["Admin"]}><UsersAdmin /></ProtectedRoute>} />
        <Route path="/discounts/edit/:id" element={<ProtectedRoute roles={["Admin"]}><DiscountEdit /></ProtectedRoute>} />
        <Route path="/discounts/create" element={<ProtectedRoute roles={["Admin"]}><DiscountCreate /></ProtectedRoute>} />


      </Routes>
    </Suspense>
  );
}