import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTracker = ({ orderId }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                console.log('Fetching order with ID:', orderId);
                const response = await axios.get(`http://localhost:5000/retailer/track_order/${orderId}`);
                console.log(response);
                setOrder(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <p style={{ fontSize: '18px', color: '#d4a44f', textAlign: 'center', marginTop: '20px' }}>Loading order details...</p>;
    if (error) return <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Error: {error}</p>;

    return (
        <div style={{
            padding: '25px',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            maxWidth: '500px',
            margin: '40px auto',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
        }}>
            <h2 style={{
                fontSize: '26px',
                color: '#333',
                marginBottom: '20px',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
                borderBottom: '2px solid #d4a44f',
                paddingBottom: '10px',
                letterSpacing: '1px',
            }}>
                Track Order
            </h2>

            {order ? (
                <div style={{ lineHeight: '1.8', fontFamily: 'Arial, sans-serif' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                    }}>
                        <strong style={{ color: '#d4a44f' }}>Order ID:</strong>
                        <span>{order.order_id}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                    }}>
                        <strong style={{ color: '#d4a44f' }}>Retailer ID:</strong>
                        <span>{order.retailer_id}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                    }}>
                        <strong style={{ color: '#d4a44f' }}>Distributor ID:</strong>
                        <span>{order.distributor_id}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                    }}>
                        <strong style={{ color: '#d4a44f' }}>Order Status:</strong>
                        <span>{order.order_status}</span>
                    </div>
                </div>
            ) : (
                <p style={{ color: '#888', textAlign: 'center' }}>No order found for the given ID.</p>
            )}
        </div>
    );
};

export default OrderTracker;