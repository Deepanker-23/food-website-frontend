import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const AddFood = () => {
    const [food, setFood] = useState({ name: '', description: '', price: '', imageUrl: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFood({ ...food, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!food.name || !food.description || !food.price || !food.imageUrl) {
            setError('All fields are required');
            return;
        }

        try {
            // Get JWT token from cookies
            const token = Cookies.get('adminJwt');
            if (!token) {
                setError('Authorization token not found. Please log in.');
                return;
            }

            // Make POST request with the token in the headers
            await axios.post(
                'https://food-website-backend-r2wb.onrender.com/api/foods',
                food,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                }
            );

            setSuccess('Food item added successfully!');
            setFood({ name: '', description: '', price: '', imageUrl: '' });
            setError('');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Unauthorized: Invalid or expired token.');
            } else {
                setError('Failed to add food item. Please try again.');
            }
            setSuccess('');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Food Item</h1>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={food.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={food.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={food.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        value={food.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Add Food</button>
            </form>
        </div>
    );
};

export default AddFood;
