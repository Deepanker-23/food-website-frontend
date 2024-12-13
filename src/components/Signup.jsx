import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://food-website-backend-r2wb.onrender.com/api/signup', formData);
            alert('Account created successfully!');
            navigate('/login');
        } catch (error) {
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
