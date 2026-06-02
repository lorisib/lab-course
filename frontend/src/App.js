import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Discounts from "./pages/Discounts";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductCreate from "./pages/ProductCreate";

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
          <Route path="/discounts" element={ <ProtectedRoute><Discounts /></ProtectedRoute> } />
          <Route path="/products/create" element={ <ProtectedRoute><ProductCreate /></ProtectedRoute> } />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;