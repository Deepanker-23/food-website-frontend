import React from 'react';
import FoodItemsPage from '../components/FoodItems';

const Home = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Welcome to Foodify</h1>
            <p className="text-center mt-4">
                Discover the best food around you, add your favorite dishes, or manage your menu as an admin.
            </p>
            <FoodItemsPage/>
        </div>
    );
};

export default Home;
