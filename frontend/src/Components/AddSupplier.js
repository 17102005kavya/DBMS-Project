// src/components/AddSupplier.js
import React, { useState } from 'react';
import { addSupplier } from '../services/api';

const AddSupplier = () => {
    const [supplier, setSupplier] = useState({
        supplier_name: '',
        supplier_contact: '',
        supplier_address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addSupplier(supplier);
        setSupplier({ supplier_name: '', supplier_contact: '', supplier_address: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
            <div className="mb-4">
                <input
                    type="text"
                    name="supplier_name"
                    value={supplier.supplier_name}
                    onChange={handleChange}
                    placeholder="Supplier Name"
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    name="supplier_contact"
                    value={supplier.supplier_contact}
                    onChange={handleChange}
                    placeholder="Supplier Contact"
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    name="supplier_address"
                    value={supplier.supplier_address}
                    onChange={handleChange}
                    placeholder="Supplier Address"
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Add Supplier
            </button>
        </form>
    );
};

export default AddSupplier;

