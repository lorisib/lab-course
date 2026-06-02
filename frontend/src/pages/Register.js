import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container-fluid bg-gradient-primary min-vh-100 d-flex align-items-center justify-content-center p-3">

      <div className="row w-100 justify-content-center">

        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">

          <div className="card border-0 shadow-lg">

            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">
                <h3 className="fw-bold">Create Account</h3>
                <p className="text-muted">Register new user</p>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="row g-2">
                  <div className="col-12 col-md-6">
                    <input
                      name="first_name"
                      className="form-control"
                      placeholder="First Name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <input
                      name="last_name"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <input
                  name="email"
                  type="email"
                  className="form-control mt-3"
                  placeholder="Email"
                  onChange={handleChange}
                />

                <input
                  name="password"
                  type="password"
                  className="form-control mt-3"
                  placeholder="Password"
                  onChange={handleChange}
                />

                <button className="btn btn-success w-100 mt-4">
                  Register
                </button>

              </form>

              <div className="text-center mt-3">
                <small>
                  Already have account? <a href="/">Login</a>
                </small>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}