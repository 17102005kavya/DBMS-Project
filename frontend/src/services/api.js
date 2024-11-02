import axios from 'axios';

const API_URL = 'http://localhost:5000/retailer';  // Backend URL
const API_BASE_URL = 'http://localhost:5000/admin'; // Adjust to your backend URL

export const fetchSuppliers = async () => {
    return await axios.get(`${API_BASE_URL}/suppliers`);
};

export const fetchBestSellingProducts = async () => {
    return await axios.get(`${API_BASE_URL}/best-selling-products`);
};

export const fetchBestSeller = async () => {
    return await axios.get(`${API_BASE_URL}/best-seller`);
};

export const addSupplier = async (supplier) => {
    return await axios.post(`${API_BASE_URL}/suppliers`, supplier);
};

// Get products
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;  // Return the fetched products data
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products.');
    }
};

// Place an order
export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/place_order`, orderData);  // Ensure this is the correct endpoint
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw new Error('Error placing order. Please try again later.');
    }
};

// Get all orders for the retailer (id=1)
export const getAllOrders = async () => {
    const retailer_id=localStorage.getItem('userId');
    try {
        const response = await axios.get(`${API_URL}/all_orders/${retailer_id}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching orders:', err);
        throw new Error('Error fetching orders.');
    }
};

// Track a specific order by order ID
export const trackOrder = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/track_order/${orderId}`);
        return response.data;
    } catch (err) {
        console.error('Error tracking order:', err);
        throw new Error('Error tracking order.');
    }
};

// Get order details for a specific order ID
export const getOrderDetails = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/order_details/${orderId}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching order details:', err);
        throw new Error('Error fetching order details.');
    }
};
