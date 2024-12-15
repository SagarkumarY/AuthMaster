import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/userAuthStore";
import { useEffect } from "react";

function App() {
 

  const { authUser,  checkingAuth , checkAuth} = useAuthStore();
 

  console.log("APP authUser" , authUser)

  useEffect(() => {
    checkAuth(); // Call the checkAuth function to check if user is authenticated and update the state accordingly.
    // You can also add other logic here to handle user authentication and authorization.
    // For example, if the user is not authenticated, you can redirect them to the login page.
  }, [checkAuth]);


  if (checkingAuth) {
    return <div>Loading...</div>; // Show loading state until auth check is complete
}

  return (
    <>
      {/* Global toaster for notifications */}
      <Toaster />

      <Routes>
      <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />

        {/* Public routes */}
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
