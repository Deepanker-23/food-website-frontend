import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUtensils } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwt');
        Cookies.remove('adminJwt');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <FaUtensils /> Foodify
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin-login">
                                Admin Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
