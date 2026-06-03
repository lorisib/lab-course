import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">

        <Navbar />

        {/* CONTENT */}
        <div className="flex-grow-1 container mt-4">
          <AppRoutes />
        </div>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;