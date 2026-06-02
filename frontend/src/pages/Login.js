import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);


      const token =
        res.data.token ||
        res.data.accessToken ||
        res.data.data?.token;

      if (!token) {
        alert("Token not returned from backend");
        return;
      }

localStorage.setItem("token", res.data.accessToken);
localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container-fluid bg-gradient-primary min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
              
              <div className="text-center mb-4">
                <h3 className="text-dark">Welcome Back</h3>
                <p className="text-muted">Login to your account</p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address..."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <div className="text-center mt-3">
                <small>
                  Don't have an account? <a href="/register">Register</a>
                </small>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}