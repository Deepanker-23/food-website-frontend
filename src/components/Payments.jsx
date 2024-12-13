import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, total } = location.state || { cart: [], total: 0 };
    
    const [showToast, setShowToast] = useState(false);

    const handlePayment = () => {
        const jwtToken = Cookies.get('jwt');
        if (!jwtToken) {
            navigate('/login');
            return;
        }

        // Simulating payment success
        setTimeout(() => {
            setShowToast(true); // Show success toast
            setTimeout(() => {
                navigate('/'); // Redirect to home after 5 seconds
            }, 5000);
        }, 2000); // Simulate payment processing delay
    };

    useEffect(() => {
        const jwtToken = Cookies.get('jwt');
        if (!jwtToken) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Payment</h1>
            <h3>Order Summary</h3>
            <ul className="list-group">
                {cart.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <span>{item.name}</span>
                        <span>₹{item.price}</span>
                    </li>
                ))}
                <li className="list-group-item d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                </li>
            </ul>

            <button className="btn btn-success mt-3 w-100" onClick={handlePayment}>
                Pay Now
            </button>

            {/* Toast Confirmation */}
            {showToast && (
                <div
                    className="toast align-items-center text-bg-success position-fixed bottom-0 end-0 m-3"
                    style={{ zIndex: 9999 }}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">
                            Payment successfully completed!
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
