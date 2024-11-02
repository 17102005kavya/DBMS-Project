import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductsPage from './Components/ProductsPage';
import Login from './Components/login';
import Dashboard from './Components/Distributor';
import LateDistributorsPage from './Components/LateDistributorsPage';
import SupplierInfoPage from './Components/SupplierInfoPage';
import SupplierDashboardLayout from './Components/SupplierDashboardLayout';
import DistributorsPage from './Components/DistributorsPage';
import ProductList from './Components/ProductList';
import OrderForm from './Components/OrderForm';
import OrderList from './Components/OrderList';
import OrderTracker from './Components/OrderTracker';
import AddSupplier from './Components/AddSupplier';
import SupplierList from './Components/SupplierList';
import BestSellingProducts from './Components/BestSellingProducts';
import BestSeller from './Components/BestSeller';
import Header from './Components/Header'; // Import Header

const App = () => {
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleOrderSelect = (orderId) => {
        setSelectedOrderId(orderId);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/api/admin/dashboard" element={
                        <div className="App">
                            <Header title="Admin Dashboard" />
                            <AddSupplier />
                            <SupplierList />
                            <BestSellingProducts />
                            <BestSeller />
                        </div>
                    } />
                    
                    <Route path="/api/retailer/dashboard" element={
                        <div>
                            <Header title="Retailer Dashboard" />
                            <ProductList />
                            <OrderForm />
                            <OrderList onOrderSelect={handleOrderSelect} />
                            {selectedOrderId && <OrderTracker orderId={selectedOrderId} />}
                        </div>
                    }/>

                    <Route path="/api/distributor/dashboard/*" element={<Dashboard />} />
                    <Route path="/api/supplier/dashboard" element={<SupplierDashboardLayout />}>
                        <Route path="/api/supplier/dashboard/products" element={<ProductsPage />} />
                        <Route path="/api/supplier/dashboard/distributors" element={<DistributorsPage />} />
                        <Route path="/api/supplier/dashboard/late-distributors" element={<LateDistributorsPage />} />
                        <Route path="/api/supplier/dashboard/supplier-info" element={<SupplierInfoPage />} />
                        <Route index element={<ProductsPage />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
