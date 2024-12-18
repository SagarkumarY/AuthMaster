import React, { useState } from "react";
import { useAuthStore } from "../store/userAuthStore";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { register, loading } = useAuthStore();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form reload
  
    console.log("Form data", formData);
  
    // Check if all fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      // Await the result of the register function
      const response = await register(formData); 
  
      // Check if registration was successful
      if (response.success) {
        // Reset all fields
        setFormData({
          username: "",
          email: "",
          password: "",
        });
  
        navigate("/login"); // Redirect to login page
      } else {
        // Show error message if registration fails
        toast.error(response.message || "Registration failed! Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
            Register for a free account!
          </h1>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  className="input input-bordered"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <label className="label">
                <Link
                  to={"/login"}
                  className="label-text-alt link link-hover text-blue-800"
                >
                  All ready have an account
                </Link>
              </label>
              <div className="form-control mt-6">
                {/* <button className="btn btn-primary">Register</button>*/}
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading
                      ? "bg-pink-400 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Register..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
