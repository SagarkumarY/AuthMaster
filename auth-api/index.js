import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv';

dotenv.config();


const app = express();

console.log(process.env.PORT)


// Use JSON middleware
app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



const PORT = process.env.PORT || 6000; // Consistent naming convention

// Define routes
app.use('/api/auth', authRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});