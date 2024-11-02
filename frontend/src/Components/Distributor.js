import React, { Component } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import logo from '../images/image0.png';
import axios from 'axios';
import LogoutButton from './LogoutBtn';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      distributorProfile: null,
    };
  }

  componentDidMount() {
    this.fetchOrders();
    this.fetchProfile();
  }

  fetchOrders = () => {
    const distributorId = localStorage.getItem('userId');
    axios.get(`http://localhost:5000/distributor/orders/${distributorId}`)
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  fetchProfile = () => {
    const distributorId = localStorage.getItem('userId');
    axios.get(`http://localhost:5000/distributor/distributor/${distributorId}`)
      .then(response => {
        this.setState({ distributorProfile: response.data });
      })
      .catch(error => {
        console.error('Error fetching distributor profile:', error);
      });
  };

  handleStatusChange = (orderId, status) => {
    axios.put(`http://localhost:5000/distributor/orders/${orderId}/status`, { status })
      .then(() => {
        this.setState((prevState) => {
          const updatedOrders = prevState.orders.map(order =>
            order.order_id === orderId ? { ...order, order_status: status } : order
          );

          let updatedDistributorProfile = prevState.distributorProfile;

          if (status === 'delivered') {
            updatedDistributorProfile = {
              ...prevState.distributorProfile,
              order_received: prevState.distributorProfile.order_received + 1,
            };
          }

          return {
            orders: updatedOrders,
            distributorProfile: updatedDistributorProfile,
          };
        });
      })
      .catch(error => {
        console.error('Error updating order status:', error);
      });
  };

  renderOrders = () => {
    const { orders } = this.state;

    return (
      <div className="orders-list">
        <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
        {orders.map(order => (
          <div key={order.order_id} className="order-item p-4 mb-4 bg-white rounded shadow-lg">
            <div className="flex items-center mb-2">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>

              <div className="order-info">
                <h3 className="text-lg font-bold">{order.product_name}</h3>
                <p>Quantity: {order.quantity}</p>
                <p>Address: {order.retailer_address}</p>
                <p>Distributor: {order.distributor_name}</p>
              </div>
            </div>

            <div className="order-status flex items-center">
              <label className="mr-4">
                <input
                  type="checkbox"
                  checked={order.order_status === 'out-for-delivery'}
                  onChange={() => this.handleStatusChange(order.order_id, 'out-for-delivery')}
                />
                Out for delivery
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={order.order_status === 'delivered'}
                  onChange={() => this.handleStatusChange(order.order_id, 'delivered')}
                />
                Delivered
              </label>
            </div>
          </div>
        ))}
      </div>
    );
  };

  renderProfile = () => {
    const { distributorProfile } = this.state;

    return distributorProfile ? (
      <div className="distributor-profile mt-10 p-5 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Distributor Profile</h2>
        <p><strong>Name:</strong> {distributorProfile.distributor_name}</p>
        <p><strong>Contact:</strong> {distributorProfile.distributor_contact}</p>
        <p><strong>Orders Delivered:</strong> {distributorProfile.order_received}</p>
      </div>
    ) : (
      <p>Loading profile...</p>
    );
  };

  render() {
    return (
      <div className="dashboard">
        <header className="flex justify-between items-center p-5 bg-light-yellow">
          <div className="logo w-40 h-40">
            <img src={logo} alt="Logo" />
          </div>
          <nav className="flex items-center">
            <Link to="/api/distributor/dashboard/orders" className="mx-4 text-lg">Pending Orders</Link>
            <Link to="/api/distributor/dashboard/profile" className="mx-4 text-lg">Profile</Link>
            <LogoutButton 
              userId={localStorage.getItem('userId')} 
              onLogout={() => window.location.href = '/'} 
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition duration-200"
            />
          </nav>
        </header>

        <div className="container mt-10 p-5">
          <Routes>
            <Route path="/orders" element={this.renderOrders()} />
            <Route path="/profile" element={this.renderProfile()} />
            <Route path="/" element={<Navigate to="/api/distributor/dashboard/orders" />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default Dashboard;
