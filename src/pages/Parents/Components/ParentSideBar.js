import React from 'react';
import { useState } from 'react';
import './ParentSideBar.css'; // Assuming you create a CSS file for the sidebar styles


const ParentSidebar = ( {changeDisplay, newMessage} ) => {
  
  return (
    <div className="sidebar">
      <a href="#p-announcements" className={`${newMessage['Announcement']? 'unread' : ''}`} onClick={() => changeDisplay('Announcement')}>公告</a>
      <a href="#p-info"  className={`${newMessage['Information']? 'unread' : ''}`} onClick={() => changeDisplay('Information')}>早療資訊</a>
      <a href="#p-contact" className={`${newMessage['Contact']? 'unread' : ''}`} onClick={() => changeDisplay('Contact')}>聯絡治療師</a>
      <a href="#p-upload" className={`${newMessage['Upload']? 'unread' : ''}`} onClick={() => changeDisplay('Upload')}>影片上傳</a>
      <a href="#logout" onClick={() => changeDisplay('logout')}>登出</a>
    </div>
  );
};

export default ParentSidebar;