import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore";
function Login() {


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useAuthStore(); // Access login function and loading state
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Validate input fields
    if (!formData.email || !formData.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await login(formData); // Call the login function

      if (response.success) {
        alert("Login successful! Redirecting...");
        setFormData({ email: "", password: "" }); // Reset form
        navigate("/"); // Redirect to the dashboard
      } else {
        alert(response.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
    <>
      {/* <div className="hero bg-base-200 min-h-screen"> */}
      <div className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 p-4">
        {/* <div className="hero-content flex-col lg:flex-row-reverse"> */}
        <div className="hero-content flex-col w-full ">
          <h1 className=" font-bold text-2xl text-center text-white">
            Login to access your account.
          </h1>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({...formData, email: e.target.value })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({...formData, password: e.target.value })
                  }
                  className="input input-bordered"
                  required
                />
              </div>

              <label className="label">
                <Link
                  to={"/register"}
                  className="label-text-alt link link-hover text-blue-800"
                >
                  We dont have an account
                </Link>
              </label>
              <div className="form-control mt-6">
              <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading
                      ? "bg-pink-400 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Login..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
