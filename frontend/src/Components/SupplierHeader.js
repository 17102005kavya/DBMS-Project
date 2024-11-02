import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/image0.png'; // Make sure to provide the correct path to your logo
import LogoutButton from './LogoutBtn';
const Header = () => {
    const userId=localStorage.getItem('userId');
    return (
        <nav className="bg-light-yellow p-5 shadow-md flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
                <div className="logo w-40 h-40">
                    <img src={logo} alt="Logo"  />
                </div>
                {/* Optional Title */}
            </div>

            {/* Navigation Links */}
            <ul className="flex justify-between items-center">
                <li className="mx-4">
                    <Link 
                        to="/api/supplier/dashboard/products" 
                        className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-200"
                    >
                        Products
                    </Link>
                </li>
                <li className="mx-4">
                    <Link 
                        to="/api/supplier/dashboard/distributors" 
                        className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-200"
                    >
                        Distributors
                    </Link>
                </li>
                <li className="mx-4">
                    <Link 
                        to="/api/supplier/dashboard/late-distributors" 
                        className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-200"
                    >
                        Late Distributors
                    </Link>
                </li>
                <li className="mx-4">
                    <Link 
                        to="/api/supplier/dashboard/supplier-info" 
                        className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-200"
                    >
                        Supplier Info
                    </Link>
                </li>
                <li>
                <LogoutButton userId={userId} onLogout={() => window.location.href = '/'} />
                </li>
            </ul>
        </nav>
    );
};

export default Header;
