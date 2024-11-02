import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api'; // Correct function

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            marginTop: '20px'
        }}>
            <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px',
                color: 'black',
            }}>
                Product List
            </h2>
            {products.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No products available</p>
            ) : (
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}>
                    <thead>
                        <tr style={{ backgroundColor: 'rgb(255, 236, 183)' }}> {/* Header background color */}
                            <th style={{
                                padding: '15px',
                                textAlign: 'center',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                            }}>Product Name</th>
                            <th style={{
                                padding: '15px',
                                textAlign: 'center',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                            }}>Price</th>
                            <th style={{
                                padding: '15px',
                                textAlign: 'center',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                            }}>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.product_id} style={{
                                backgroundColor: 'rgb(255, 255, 255)', // Same yellow as header
                                borderBottom: '1px solid #e0e0e0',
                                transition: 'background-color 0.3s, transform 0.3s',
                            }} onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgb(255, 210, 120)'; // Light Hover Effect
                                e.currentTarget.style.transform = 'scale(1.01)';
                            }} onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgb(255, 255, 255)'; // Reset to the original yellow
                                e.currentTarget.style.transform = 'scale(1)';
                            }}>
                                <td style={{
                                    padding: '15px',
                                    textAlign: 'center',
                                    color: 'black',
                                    fontSize: '1rem',
                                }}>{product.product_name}</td>
                                <td style={{
                                    padding: '15px',
                                    textAlign: 'center',
                                    color: 'black',
                                    fontSize: '1rem',
                                }}>${product.product_price.toFixed(2)}</td>
                                <td style={{
                                    padding: '15px',
                                    textAlign: 'center',
                                    color: 'black',
                                    fontSize: '1rem',
                                }}>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;