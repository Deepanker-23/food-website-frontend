import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import Navbar from './components/Navbar.jsx';
import Cookies from 'js-cookie';
import PaymentPage from './components/Payments.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const jwt = Cookies.get('adminJwt');
    return jwt ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route path="/payment" element={<PaymentPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
