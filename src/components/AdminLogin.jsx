import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }

        try {
            const response = await axios.post('https://food-website-backend-r2wb.onrender.com/api/admin/login', { email, password });
            Cookies.set('adminJwt', response.data.adminToken);
            alert('Admin login successful!');
            navigate('/admin');
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Admin Login</h1>
            <form onSubmit={handleLogin}>
                {error && <p className="text-danger">{error}</p>}
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
        </div>
    );
};

export default AdminLogin;
