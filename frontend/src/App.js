import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4 flex-grow-1">
        <AppRoutes />
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;