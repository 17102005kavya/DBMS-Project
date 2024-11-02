// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';


const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [stock, setStock] = useState('');
    const supplierId = localStorage.getItem('userId'); // Replace with dynamic supplier ID if needed

    // Fetch products
    useEffect(() => {
        axios.get(`http://localhost:5000/supplier/products/${supplierId}`)
            .then(response => setProducts(response.data.products))
            .catch(error => console.error('Error fetching products:', error));
    }, [supplierId]);

    // Handle form submission to add a new product
    const handleAddProduct = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/supplier/supplier/product', { 
            supplier_id: supplierId, 
            product_name: productName, 
            product_price: productPrice, 
            stock 
        })
        .then(response => {
            alert('Product added successfully');
            // Clear form
            setProductName('');
            setProductPrice('');
            setStock('');
            // Fetch updated list of products
            return axios.get(`http://localhost:5000/supplier/products/${supplierId}`);
        })
        .then(response => setProducts(response.data.products))
        .catch(error => console.error('Error adding product:', error));
    };

    // Handle product deletion
    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:5000/supplier/products/${productId}`)
                .then(response => {
                    alert('Product deleted successfully');
                    // Fetch updated list of products
                    return axios.get(`http://localhost:5000/supplier/products/${supplierId}`);
                })
                .then(response => setProducts(response.data.products))
                .catch(error => console.error('Error deleting product:', error));
        }
    };

    return (
        <div className="container mx-auto p-5 bg-light-yellow shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            
            {/* Add Product Form */}
            <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Product Price:</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Stock:</label>
                    <input
                        type="text"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Product
                </button>
            </form>

            {/* Product List */}
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.product_id} className="p-4 bg-white mb-4 rounded shadow-md flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg">{product.product_name}</p>
                            <p>Price: {product.product_price}</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                        <button 
                            onClick={() => handleDeleteProduct(product.product_id)} 
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
