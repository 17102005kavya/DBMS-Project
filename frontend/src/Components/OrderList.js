import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../services/api';  // Assuming you have this API service
import OrderTracker from './OrderTracker';  // Import your OrderTracker component

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState(null);  // New state to track selected order ID
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            {/* Left column: Order List */}
            <div style={{ flex: 1 }}>
                <h2 className="text-2xl font-semibold mb-4">Order List</h2>
                {orders.length === 0 ? (
                    <p>No orders available</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li 
                                key={order.order_id} 
                                style={{
                                    backgroundColor: '#fff',  // White background for the cards
                                    padding: '15px', 
                                    marginBottom: '20px', 
                                    borderRadius: '10px', 
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <p><strong>Order ID:</strong> {order.order_id}</p>
                                    <p><strong>Product:</strong> {order.product_id}</p>
                                    <p><strong>Quantity:</strong> {order.quantity}</p>
                                    <p><strong>Price:</strong> {order.price}</p>
                                    <p><strong>Expected Date:</strong> {order.expected_date}</p>
                                </div>

                                <button 
                                    onClick={() => setSelectedOrderId(order.order_id)} 
                                    style={{
                                        padding: '10px 20px', 
                                        backgroundColor: 'rgb(220, 180, 130)', 
                                        color: 'white', 
                                        borderRadius: '8px', 
                                        border: 'none', 
                                        cursor: 'pointer', 
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={e => e.target.style.backgroundColor = 'rgb(180, 140, 100)'}
                                    onMouseOut={e => e.target.style.backgroundColor = 'rgb(220, 180, 130)'}
                                >
                                    Track Order
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Right column: Order Tracker */}
            <div style={{ flex: 1, border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px' }}>
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                {selectedOrderId ? (
                    <OrderTracker orderId={selectedOrderId} />
                ) : (
                    <p>Select an order to track.</p>
                )}
            </div>
        </div>
    );
};

export default OrderList;