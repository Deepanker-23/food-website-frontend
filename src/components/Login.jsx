import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://food-website-backend-r2wb.onrender.com/api/login', { email, password });
            Cookies.set('jwt', response.data.token);
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="text-center mt-3">
                <p>Don't have an account?</p>
                <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => navigate('/signup')}
                >
                    Signup Here
                </button>
            </div>
        </div>
    );
};

export default Login;
