import React from "react";
import './TopNav.css'; // Assuming you create a CSS file for the sidebar styles
import MMH from './MMH.png';

const TopNav = ()=>{
    return (
        <nav className="navbar">
            <div className="logo_item">
                <img src={MMH} alt="logo miss" className="logo-image"/>
                <span>互動式早療平台</span>
            </div>
            <div className="navbar_content">
                <a href='https://www.hc.mmh.org.tw' target='_blank'> <icon className='bx bx-home'></icon>新竹馬階紀念醫院</a>
            </div>

        </nav>
        // <div className="topnav">
        //     <a href="#home"> <i className='bx bx-home'></i> Home</a>
        //     <a href="about"> <i className='bx bx-info-circle'></i> About</a>
        //     <a href="services"> <i className='bx bx-cog'></i> Settings</a>
        //     <a href="contact"> <i className='bx bx-envelope'></i> Contact</a>
        // </div>
    );
};

export default TopNav