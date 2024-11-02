// src/pages/DistributorsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DistributorsPage = () => {
    const [distributors, setDistributors] = useState([]);
    const [distributorName, setDistributorName] = useState('');
    const [distributorContact, setDistributorContact] = useState('');
    const API_BASE_URL = 'http://localhost:5000/supplier';
    // Fetch distributors
    useEffect(() => {
        axios.get(`${API_BASE_URL}/distributors`)
            .then(response => setDistributors(response.data.distributorList))
            .catch(error => console.error('Error fetching distributors:', error));
    }, []);

    // Handle form submission to add a new distributor
    const handleAddDistributor = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/distributor/assign`, { distributorName, distributorContact })
            .then(response => {
                alert('Distributor added successfully');
                // Clear form
                setDistributorName('');
                setDistributorContact('');
                // Fetch updated list of distributors
                return axios.get(`${API_BASE_URL}/distributors`);
            })
            .then(response => setDistributors(response.data.distributorList))
            .catch(error => console.error('Error adding distributor:', error));
    };

    return (
        <div className="container mx-auto p-5 bg-light-yellow shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Distributors</h1>
            
            {/* Add Distributor Form */}
            <form onSubmit={handleAddDistributor} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Distributor Name:</label>
                    <input
                        type="text"
                        value={distributorName}
                        onChange={(e) => setDistributorName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Distributor Contact:</label>
                    <input
                        type="text"
                        value={distributorContact}
                        onChange={(e) => setDistributorContact(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Distributor
                </button>
            </form>

            {/* Distributor List */}
            <h2 className="text-2xl font-bold mb-4">Distributor List</h2>
            <ul>
                {distributors.map(distributor => (
                    <li key={distributor.distributor_id} className="p-4 bg-white mb-4 rounded shadow-md">
                        <p className="font-semibold text-lg">{distributor.distributor_name}</p>
                        <p>Contact: {distributor.distributor_contact}</p>
                        <p>Orders Received: {distributor.order_received}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DistributorsPage;
