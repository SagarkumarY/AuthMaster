import bcrypt from 'bcryptjs'; // Library for hashing passwords
import jwt from 'jsonwebtoken'; // Library for creating JSON Web Tokens (JWTs)
import Pool from '../config/config.js'; // Database connection pool configuration
import dotenv from 'dotenv';

dotenv.config();


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Register a new user
export const register = async (req, res) => {
    // Destructure user inputs from the request body
    const { username, email, password } = req.body;

    // Validate input: Check if all required fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    // Email validation: Check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password validation: Check if the password meets complexity requirements
    // Must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character',
        });
    }


    try {
        // Check if a user with the provided email already exists in the database
        const result = await Pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the user's password using bcrypt for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );


        // Generate a JWT token for the newly registered user
        const token = signToken(newUser.rows[0].id);
        res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); // Set the cookie for 1 hour

        // Respond with a success message
        return res.status(200).json({ success: true, message: 'User registered successfully', user: newUser });

    } catch (error) {
        // Log the error to the server console for debugging
        console.error('Error during user registration:', error.message);

        // Respond with a generic server error message
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



// Login 
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await Pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        };

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token using the user's ID
        const token = signToken(user.id);

        res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ success: false, message: 'Server Error', token });
    }
};


// logout

export const logout = (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'Logged out successfully' });
};
