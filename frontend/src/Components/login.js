import React, { useState } from 'react';
import logo from '../images/image0.png'; // Adjust the path as necessary
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios

const Login = ({ onLogin }) => {
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [defaultUser, setDefaultUser] = useState('');
    const [defaultPass, setDefaultPass] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("reached inside handleLogin");
        console.log("userId:", userId, "role:", role);

        // Validate input fields
        if (!userId || !role || !password) {
            if (!userId) setDefaultUser('*Required');
            if (!role) setMessage('*Role required');
            if (!password) setDefaultPass('*Required');
            return;
        }
    
        try {
            // Make a POST request using Axios
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                userId,
                role,
            });

            // Handle response
            console.log("reached in the results");
            const data = response.data;
            localStorage.setItem('userId', response.data.userId);
            if (data.redirectTo) {
                window.location.href = data.redirectTo; // Redirect to the appropriate page
            }
        } catch (error) {
            // Handle errors (including network errors)
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };
    
    return (
        <div className="login p-10">
            <div className="logo w-40 h-40">
                <img src={logo} alt="Logo" />
            </div>

            <div className="container flex items-center justify-center">
                <div className="box bg-white px-5 py-10 sm:w-1/2 lg:w-1/3 h-auto items-center flex justify-center rounded-md flex-col">
                    <h1 className="text-4xl font-black text-gray-600 mb-10">Login</h1>

                    <form onSubmit={handleLogin} className="w-full">
                        {/* Dropdown for Role Selection */}
                        <FormControl variant="outlined" className="w-full mb-4">
                            <InputLabel>I'm a</InputLabel>
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                label="Type"
                                required
                            >
                                <MenuItem value="">Select Role</MenuItem>
                                <MenuItem value="retailer">Retailer</MenuItem>
                                <MenuItem value="supplier">Supplier</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="distributor">Distributor</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Input for User ID */}
                        <div className="w-5/6 relative mt-4">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-4" />
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="border-gray-300 border w-full h-10 px-12 rounded-lg focus:border-gray-500 focus:outline-none"
                                placeholder="UserID"
                                required
                            />
                            <span className="text-red-500 text-xs">{defaultUser}</span>
                        </div>

                        {/* Input for Password */}
                        <div className="w-5/6 relative mt-4">
                            <FontAwesomeIcon icon={faLock} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-4" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={10}
                                className="border-gray-300 border w-full h-10 px-12 rounded-lg focus:border-gray-500 focus:outline-none"
                                placeholder="Password"
                                required
                            />
                            <span className="text-red-500 text-xs">{defaultPass}</span>
                        </div>

                        {/* Login Button */}
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="border border-secondary px-16 py-3 text-2xl rounded-full font-bold text-secondary hover:bg-secondary hover:text-white transition-all ease-in duration-75"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    {message && <p className="mt-4">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
