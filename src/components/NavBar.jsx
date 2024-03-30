import React from 'react';

const Navbar = () => {
    return (
        <nav className='nav-bar'>
            <ul>
                <li className="header">Open Library API</li>
                <li><a href="#search">About</a></li>
                <li><a href="#filter">Dashboard</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
