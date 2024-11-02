import React, { useState, useEffect } from 'react';
import { getProducts, placeOrder } from '../services/api'; // Assuming you have API services for these functions

const OrderForm = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(); // Fetch products from API
                setProducts(data); // Set products in state
            } catch (error) {
                setError('Error fetching products'); // Handle error if API call fails
            }
        };

        fetchProducts(); // Fetch products on component mount
    }, []); // Empty dependency array ensures this runs only once when component mounts

    // Handle product selection change
    const handleProductChange = (event) => {
        const productId = parseInt(event.target.value);
        const selected = products.find(product => product.product_id === productId);
        setSelectedProduct(selected);
        setTotalPrice(selected ? selected.product_price * quantity : 0); // Recalculate price
    };

    // Handle quantity change
    const handleQuantityChange = (event) => {
        const qty = parseInt(event.target.value);
        setQuantity(qty);
        setTotalPrice(selectedProduct ? selectedProduct.product_price * qty : 0); // Recalculate price
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate if product is selected and quantity is provided
        if (!selectedProduct || quantity < 1) {
            alert('Please select a product and enter a valid quantity');
            return;
        }

        // Check if there is enough stock
        if (quantity > selectedProduct.stock) {
            alert(`Sorry, only ${selectedProduct.stock} items are available in stock.`);
            return;
        }

        const orderData = {
            product_id: selectedProduct.product_id,
            quantity: quantity,
            retailer_id: localStorage.getItem('userId')
        };

        try {
            await placeOrder(orderData); // Place order
            alert('Order placed successfully!');
            // Reset the form after successful order placement
            setSelectedProduct(null);
            setQuantity(1);
            setTotalPrice(0);
        } catch (error) {
            setError('There was an error placing your order. Please try again later.');
        }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            marginTop: '30px', // Add top margin for space between this and other elements
            marginBottom: '30px', // Optional: Add bottom margin for additional spacing below
            width: '100%', // Make the form full width
            maxWidth: '1000px', // Optional: limit max width for better readability
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
            <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px',
                color: 'black',
            }}>Place an Order</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Show any errors */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{ display: 'block', textAlign: 'center' }}>
                        Product:
                        <select 
                            value={selectedProduct ? selectedProduct.product_id : ''} 
                            onChange={handleProductChange}
                            style={{ margin: '10px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="">Select a product</option>
                            {products.length === 0 ? (
                                <option value="">No products available</option>
                            ) : (
                                products.map((product) => (
                                    <option key={product.product_id} value={product.product_id}>
                                        {product.product_name} - ${product.product_price} (Stock: {product.stock})
                                    </option>
                                ))
                            )}
                        </select>
                    </label>
                </div>

                <div>
                    <label style={{ display: 'block', textAlign: 'center' }}>
                        Quantity:
                        <input 
                            type="number" 
                            value={quantity} 
                            min="1" 
                            onChange={handleQuantityChange} 
                            style={{ margin: '10px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </label>
                </div>

                <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>Total Price: ${totalPrice.toFixed(2)}</p> {/* Display calculated total price */}

                <button type="submit" style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: 'rgb(255, 236, 183)', // Use your yellow color here
                    color: 'black',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    fontSize: '1.1rem', // Optional: increase font size for the button
                }}>
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default OrderForm;