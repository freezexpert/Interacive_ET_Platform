import React from "react";
import './TopNav.css'; // Assuming you create a CSS file for the sidebar styles

const TopNav = ()=>{
    return (
        <div className="topnav">
            <a href="#home">Home</a>
            <a href="about">About</a>
            <a href="services">Services</a>
            <a href="contact">Contact</a>
        </div>
    );
};

export default TopNav