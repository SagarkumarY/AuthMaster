import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation after logout
import { useAuthStore } from "../store/userAuthStore";
function Home() {

  const {logout } = useAuthStore(); // Get the authUser and logout function from the store
  const navigate = useNavigate(); // Use navigate for redirecting after logout

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to the login page after logging out
  };
  return (
    <div className=" relative" >
        <div className=" absolute w-full">
          <nav className=" flex justify-between items-center px-5  py-2">
            <ul className="flex items-center justify-between px-4 py-3">
              <li className="mr-3">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li className="mr-3">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  About
                </a>
              </li>
              <li className="mr-3">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </li>
            </ul>
            <div className="">
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
              
            </div>
          </nav>
        </div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://wallpapers.com/images/hd/countryside-scenery-anime-4k-par00nk6228xf5xm.jpg)",
        }}
      >
      
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <span className="ml-3  text-4xl">Welcome, </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
