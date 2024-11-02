// src/components/SupplierList.js
import React, { useEffect, useState } from 'react';
import { fetchSuppliers } from '../services/api';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const response = await fetchSuppliers();
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        getSuppliers();
    }, []);

    return (
        <div className="w-full p-4 m-2 bg-white border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Suppliers</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="border px-4 py-2">Supplier ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Contact</th>
                        <th className="border px-4 py-2">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.length > 0 ? (
                        suppliers.map((supplier) => (
                            <tr key={supplier.supplier_id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{supplier.supplier_id}</td>
                                <td className="border px-4 py-2">{supplier.supplier_name}</td>
                                <td className="border px-4 py-2">{supplier.supplier_contact}</td>
                                <td className="border px-4 py-2">{supplier.supplier_address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center border px-4 py-2 text-gray-500">No suppliers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierList;
