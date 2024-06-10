import React from 'react';
import { useState } from 'react';
import './Sidebar.css'; // Assuming you create a CSS file for the sidebar styles


const Sidebar = ( {setCurrentPage} ) => {
  
  return (
    <div className="sidebar">
      <a href="#announcements" onClick={() => setCurrentPage('announcements')}>公告</a>
      <a href="#info" onClick={() => setCurrentPage('information')}>早療資訊編輯</a>

      <div className="submenu">
        <a href="#students" onClick={(e) => e.preventDefault()}>Students</a>
        <div className="submenu-items">
          <a href="#edit-student-list" onClick={() => setCurrentPage('edit-student-list')}>Edit Student List</a>
          <a href="#student-list" onClick={() => setCurrentPage('student-list')}>Student List</a>
        </div>
      </div>
      
      <a href="#logout" onClick={() => setCurrentPage('logout')}>登出</a>
    </div>
  );
};

export default Sidebar;