import React from "react";
import "../styles.css"; // Import CSS file

const Drawer = ({ isOpen, toggleDrawer }) => {
    return (
        <div className={`drawer ${isOpen ? "drawer-open" : ""}`}>
            <button className="close-drawer" onClick={toggleDrawer}>&times;</button>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Tour Packages</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Login</a></li>
                <li><a href="#">Sign Up</a></li>
            </ul>
        </div>
    );
};

export default Drawer;
