// import { create } from "zustand";
// import axios from "../lib/axios";
// import toast from "react-hot-toast";

// export const useAuthStore = create((set) => ({
//   authUser: null, // Holds the authenticated user data
//   checkingAuth: true, // Indicates if auth status is being checked
//   loading: false, // Indicates if a request is in progress

//   // Register function
//   register: async (data) => {

//     try {
//       set({ loading: true }); // Start loading state

//       // Send registration request
//       const res = await axios.post("/register", data);
//       console.log(res)

//       if (res.status === 200) {
//         toast.success("Registration successful");
//         return { success: true, message: "Registration successful" };
//       }

//       // Handle unexpected non-201 responses (shouldn't reach here if backend works as expected)
//       return { success: false, message: res.data.message || "Unexpected error occurred" };
//     } catch (error) {
//       console.error("Registration failed:", error.message);
//       toast.error(error.response?.data?.message || "Registration error");

//       // Return error response with a standardized structure
//       return {
//         success: false,
//         message: error.response?.data?.message || "Registration error",
//       };
//     } finally {
//       set({ loading: false }); // Stop loading state
//     }
//   },


//   // Login function
//   login: async (data) => {
//     try {
//       set({ loading: true }); // Start loading state

//       // Send login request
//       const res = await axios.post("/login", data);

//       if (res.status === 200) {
//         const { message } = res.data;

//         // Update state with authenticated user
//         set({ authUser: res.data, checkingAuth: false });

//         toast.success(message || "Login successful!");
//         return { success: true, message: message || "Login successful" };
//       }

//       // If status is not 200
//       return { success: false, message: res.data.message || "Login failed" };
//     } catch (error) {
//       console.error("Login failed:", error.message);

//       toast.error(error.response?.data?.message || "Login error");
//       return { success: false, message: error.response?.data?.message || "Login error" };
//     } finally {
//       set({ loading: false }); // Stop loading state
//     }
//   },




//    // check Auth
//    checkAuth: async () => {
//     try {
//         const res = await axios.get("/me");
//         console.log("Login response: " , res)
//         if (res.data.user) {
//             set({ authUser: res.data.user });
//             console.log("checkAuth", res.data.user)
//         } else {
//             set({ authUser: null });
//         }
//     } catch (error) {
//         set({ authUser: null });
//         console.error("Error in checkAuth:", error);
//     } finally {
//         set({ checkingAuth: false });
//     }
// }

// }));






import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null, // Holds the authenticated user data
      checkingAuth: true, // Indicates if auth status is being checked
      loading: false, // Indicates if a request is in progress

      // Register function
      register: async (data) => {
        try {
          set({ loading: true });
          const res = await axios.post("/register", data);
          if (res.status === 200) {
            toast.success(res.data.message || "Registration successful");
            return { success: true, message: res.data.message || "Registration successful" };
          }
          return { success: false, message: res.data.message || "Registration failed" };
        } catch (error) {
          console.error("Registration failed:", error.response || error.message);
          toast.error(error.response?.data?.message || "Registration error");
          return { success: false, message: error.response?.data?.message || "Registration error" };
        } finally {
          set({ loading: false });
        }
      },

      // Login function
      login: async (data) => {
        try {
          set({ loading: true });
          const res = await axios.post("/login", data);
          if (res.status === 200) {
            const { user, message } = res.data;
            set({ authUser: user });
            toast.success(message || "Login successful!");
            return { success: true, message: message || "Login successful" };
          }
          return { success: false, message: res.data.message || "Login failed" };
        } catch (error) {
          console.error("Login failed:", error.response || error.message);
          toast.error(error.response?.data?.message || "Login error");
          return { success: false, message: error.response?.data?.message || "Login error" };
        } finally {
          set({ loading: false });
        }
      },

      // Logout functionality
      logout: () => {
        set({ authUser: null });
        toast.success("Logged out successfully!");
      },

      // Check authentication status
      checkAuth: async () => {
        try {
          const res = await axios.get("/me");
          console.log(" Hook Function checkAUth" , res)
          if (res.status === 200 && res.data.user) {
            set({ authUser: res.data.user });
          } else {
            set({ authUser: null });
          }
        } catch (error) {
          console.error("Error in checkAuth:", error.response || error.message);
          set({ authUser: null });
        } finally {
          set({ checkingAuth: false });
        }
      },
    }),
    {
      name: "auth-store", // Key for local storage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
