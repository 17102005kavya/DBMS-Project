import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet to render child routes
import SupplierHeader from './SupplierHeader'; // Import your header component

const SupplierDashboardLayout = () => {
    return (
        <div>
            <SupplierHeader /> {/* Your Header component */}
            <main>
                <Outlet /> {/* This is where the child routes will render */}
            </main>
        </div>
    );
};

export default SupplierDashboardLayout;
