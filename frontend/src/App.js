import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import SalesCreate from "./pages/SalesCreate";
import Discounts from "./pages/Discounts";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductCreate from "./pages/ProductCreate";
import ProductEdit from "./pages/ProductEdit";
import Suppliers from "./pages/Suppliers";
import SupplierCreate from "./pages/SupplierCreate";
import SupplierEdit from "./pages/SupplierEdit";
import Customers from "./pages/Customers";
import CustomerCreate from "./pages/CustomerCreate";
import CustomerEdit from "./pages/CustomerEdit";
import Purchases from "./pages/Purchase";
import PurchaseCreate from "./pages/PurchaseCreate";
import AssignDiscount from "./pages/AssignDiscount";
import DiscountCreate from "./pages/DiscountCreate";
import DiscountEdit from "./pages/DiscountEdit";
import Invoices from "./pages/Invoices";
import LoyaltyCards from "./pages/LoyaltyCards";
import LoyaltyCardCreate from "./pages/LoyaltyCardCreate";
import LoyaltyCardEdit from "./pages/LoyaltyCardEdit";
import Brands from "./pages/Brand";
import Category from "./pages/Category";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={ <ProtectedRoute><Register /></ProtectedRoute> } />
          <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />
          <Route path="/products" element={ <ProtectedRoute><Products /></ProtectedRoute> } />
          <Route path="/sales" element={ <ProtectedRoute><Sales /></ProtectedRoute> } />
          <Route path="/sales/create" element={ <ProtectedRoute><SalesCreate /></ProtectedRoute> } />
          <Route path="/discounts" element={ <ProtectedRoute><Discounts /></ProtectedRoute> } />
          <Route path="/products/create" element={ <ProtectedRoute><ProductCreate /></ProtectedRoute> } />
          <Route path="/products/edit/:id" element={ <ProtectedRoute><ProductEdit /></ProtectedRoute> } />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/create" element={<SupplierCreate />} />
          <Route path="/suppliers/edit/:id" element={<SupplierEdit />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/create" element={<CustomerCreate />} />
          <Route path="/customers/edit/:id" element={<CustomerEdit />} />
          <Route path="/Purchase" element={<Purchases />} />
          <Route path="/Purchase/create" element={<PurchaseCreate />} />
          <Route path="/discounts" element={<ProtectedRoute><Discounts /></ProtectedRoute>} />
          <Route path="/discounts/create" element={<ProtectedRoute><DiscountCreate /></ProtectedRoute>} />
          <Route path="/discounts/edit/:id" element={<ProtectedRoute><DiscountEdit /></ProtectedRoute>} />
          <Route path="/discounts/assign" element={<ProtectedRoute><AssignDiscount /></ProtectedRoute>} />
          <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path="/loyalty-cards" element={<LoyaltyCards />} />
          <Route path="/loyalty-cards/create" element={<LoyaltyCardCreate />} />
          <Route path="/loyalty-cards/edit/:id" element={<LoyaltyCardEdit />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/categories" element={<Category />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;