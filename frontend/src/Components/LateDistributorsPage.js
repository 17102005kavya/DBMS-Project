// src/pages/LateDistributorsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LateDistributorsPage = () => {
    const [lateDistributors, setLateDistributors] = useState([]);
    const supplierId = localStorage.getItem('userId'); // Replace with dynamic supplier ID if needed
    const API_BASE_URL = 'http://localhost:5000/supplier';
    useEffect(() => {
        axios.get(`${API_BASE_URL}/distributors/late/${supplierId}`)
            .then(response => setLateDistributors(response.data))
            .catch(error => console.error('Error fetching late distributors:', error));
    }, [supplierId]);

    return (
        <div className="container mx-auto p-6 bg-light-yellow rounded shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Late Distributors</h1>
            <ul className="bg-white p-6 rounded shadow-md">
                {lateDistributors.length > 0 ? (
                    lateDistributors.map(distributor => (
                        <li key={distributor.distributor_id} className="mb-4 p-4 border-b border-gray-200">
                            <p className="font-semibold text-gray-700">{distributor.distributor_name}</p>
                            <p className="text-gray-600">Late Deliveries: {distributor.late_delivery_count}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-red-500">No late distributors found.</p>
                )}
            </ul>
        </div>
    );
};

export default LateDistributorsPage;
