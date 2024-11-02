// Header.js
import React from 'react';
import LogoutButton from './LogoutBtn';

const Header = ({ title }) => {
    const userId=localStorage.getItem('userId');
    return (
        <header className="flex justify-between items-center p-5 bg-light-yellow">
            <h1 className="text-xl font-bold">{title}</h1>
            <LogoutButton userId={userId} onLogout={() => window.location.href = '/'} />
        </header>
    );
};

export default Header;
