import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

const FoodList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get('https://food-website-backend-r2wb.onrender.com/api/foods');
                setFoodItems(response.data);
            } catch (error) {
                setError('Failed to fetch food items. Please try again.');
            }
        };
        fetchFoodItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://food-website-backend-r2wb.onrender.com/api/food/${id}`);
            setFoodItems(foodItems.filter(item => item._id !== id));
        } catch (error) {
            setError('Failed to delete food item. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Food List</h1>
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>${item.price}</td>
                            <td>
                                <button className="btn btn-danger me-2" onClick={() => handleDelete(item._id)}>
                                    <FaTrash />
                                </button>
                                <button className="btn btn-primary">
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FoodList;
