import React, { useState } from "react";
import Drawer from "./Drawer"; // Import Drawer component
import "../styles.css"; // Import CSS file

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Function to toggle the drawer
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <a href="#">LOGO</a>
            </div>
            <ul className="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Tour Packages</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
            <div className="nav-actions">
                <div className="language-select">
                    <button>Eng ▼</button>
                </div>
                <a href="#" className="login">Login</a>
                <a href="#" className="signup">Sign Up</a>
            </div>
            <div className="hamburger-menu" onClick={toggleDrawer}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Drawer Component */}
            <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </nav>
    );
};

export default Navbar;
