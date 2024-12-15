# AuthMaster

**AuthMaster** is a simple and secure authentication solution designed to handle user sign-ups, logins, and session management in modern web applications. It provides seamless authentication functionality with JWT (JSON Web Token) for secure user verification and authorization.

## Features

- **User Registration**: Secure sign-up with email validation and password hashing.
- **User Login**: Login system with JWT token-based authentication.
- **Session Management**: Manage user sessions via cookies for persistent login states.
- **Error Handling**: Provides detailed error messages for better user experience.
- **Secure Password Storage**: Uses bcrypt for password hashing.
- **Token Expiry**: Automatically handles token expiry and refresh.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **Password Hashing**: bcryptjs
- **State Management**: Zustand (React Hook)
- **Frontend**: React.js

## Installation

### Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/AuthMaster.git
Install dependencies:

bash
Copy code
cd AuthMaster
npm install
Set up your environment variables: Create a .env file in the root directory and add the following:

bash
Copy code
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=your_postgresql_connection_string
Run the application:

bash
Copy code
npm start
The backend will be available at http://localhost:5000, and the frontend will run on http://localhost:3000.

Usage
User Registration:
Use the /register endpoint to create a new user. Provide a username, email, and password.

User Login:
Use the /login endpoint to authenticate the user. The server will respond with a JWT token.

Get User Info:
After logging in, the /me endpoint will give you the logged-in user's details.

Logout:
Use the /logout endpoint to clear the authentication session.

Contributing
We welcome contributions to AuthMaster! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Express.js for building the backend.
JWT for authentication.
bcryptjs for password hashing.
Zustand for state management in React.
React for building the frontend.
Contact
For any queries or suggestions, feel free to reach out:

Author: Your Name
Email: your.email@example.com