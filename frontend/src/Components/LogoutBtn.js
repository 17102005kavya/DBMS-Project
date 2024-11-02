import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ userId, onLogout = () => {} }) => { // Default empty function for onLogout
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/logout', { userId }); // Corrected URL
            if (response.status === 200) {
                console.log('Logout successful');
                onLogout(); // Perform logout state update
                navigate('/'); // Redirect to login page after logout
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}  className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200 ease-in-out shadow-md">
            Logout
        </button>
    );
};

export default LogoutButton;
