import jwt from 'jsonwebtoken'; // Library for creating JSON Web Tokens (JWTs)
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' })


const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Ensure `JWT_SECRET` is defined
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const authenticate = (req, res, next) => {
  try {
    // Extract the token from cookies
    const token = req.cookies?.auth_token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Token not found',
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // If verification fails, return an error
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    // Attach user ID or other payload to `req` for downstream use
    req.userId = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in authenticate middleware:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export default authenticate;

