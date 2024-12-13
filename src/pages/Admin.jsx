import React from 'react';
import AddFood from '../components/AddFood.jsx';
import FoodList from '../components/FoodList.jsx';

const Admin = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <AddFood />
            <FoodList />
        </div>
    );
};

export default Admin;
