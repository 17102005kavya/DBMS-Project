// src/pages/SupplierInfoPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierInfoPage = () => {
    const [supplierInfo, setSupplierInfo] = useState({});
    const supplierId = localStorage.getItem('userId'); // Replace with dynamic supplier ID if needed
    const API_BASE_URL = 'http://localhost:5000/supplier';
    useEffect(() => {
        axios.get(`${API_BASE_URL}/supplier/${supplierId}`)
            .then(response => setSupplierInfo(response.data.supplierInfo))
            .catch(error => console.error('Error fetching supplier info:', error));
    }, [supplierId]);

    return (
        <div className="container mx-auto p-6 bg-light-yellow rounded shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Supplier Information</h1>
            {supplierInfo ? (
                <div className="bg-white p-6 rounded shadow-md">
                    <p className="mb-4"><strong className="text-gray-700">ID:</strong> {supplierInfo.supplier_id}</p>
                    <p className="mb-4"><strong className="text-gray-700">Name:</strong> {supplierInfo.supplier_name}</p>
                    <p className="mb-4"><strong className="text-gray-700">Address:</strong> {supplierInfo.supplier_address}</p>
                    <p className="mb-4"><strong className="text-gray-700">Contact:</strong> {supplierInfo.supplier_contact}</p>
                </div>
            ) : (
                <p className="text-red-500">No supplier information available.</p>
            )}
        </div>
    );
};

export default SupplierInfoPage;
