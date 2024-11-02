// src/components/BestSellingProducts.js
import React, { useEffect, useState } from 'react';
import { fetchBestSellingProducts } from '../services/api';

const BestSellingProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchBestSellingProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching best-selling products:', error);
            }
        };
        getProducts();
    }, []);

    return (
        <div className="w-full p-4 m-2 bg-white border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Selling Products</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-green-500 text-white">
                    <tr>
                        <th className="border px-4 py-2">Product ID</th>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Total Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.product_id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{product.product_id}</td>
                                <td className="border px-4 py-2">{product.product_name}</td>
                                <td className="border px-4 py-2">{product.total_sold}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center border px-4 py-2 text-gray-500">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BestSellingProducts;
