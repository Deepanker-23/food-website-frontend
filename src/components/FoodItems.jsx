import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';

const FoodItemsPage = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const response = await axios.get('https://food-website-backend-r2wb.onrender.com/api/foods');
            setFoodItems(response.data);
        } catch (error) {
            setError('Error fetching food items');
        }
    };

    const handleAddToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const handleCheckout = () => {
        const jwtToken = Cookies.get('jwt'); // Assuming JWT is stored in the cookie named 'jwt'
        if (!jwtToken) {
            alert('Please log in to proceed to payment!');
            return;
        }

        navigate('/payment', { state: { cart, total: calculateTotal() } });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Food Items</h1>
            {error && <p className="text-danger text-center">{error}</p>}

            <div className="row">
                {foodItems.map((item) => (
                    <div className="col-md-4 mb-4" key={item._id}>
                        <div className="card">
                            <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text fw-bold">$ {item.price}</p>
                                <button
                                    className="btn btn-success w-100"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    Add to Cart <FaCartPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {cart.length > 0 && (
                <div className="mt-5">
                    <h2>Cart Summary</h2>
                    <ul className="list-group">
                        {cart.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                <span>{item.name}</span>
                                <span>₹{item.price}</span>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between fw-bold">
                            <span>Total</span>
                            <span>₹{calculateTotal()}</span>
                        </li>
                    </ul>
                    <button className="btn btn-primary mt-3 w-100" onClick={handleCheckout}>
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default FoodItemsPage;
