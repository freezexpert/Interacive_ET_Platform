import React, { useState, useEffect } from 'react';
import './index.css';

const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        fetchAnnouncements();
    }, []);
    const formatDate = (date) => {
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        };
        return new Intl.DateTimeFormat('default', options).format(date);
    };
    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://localhost:8888/announcement', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setAnnouncements(data || []);
            // setAnnouncements(data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };
    return (
        <div className="announcement-container">
            <div className="header">
                <h2>公告</h2>
            </div>
            <div className="announcements-list">
                {announcements.map((ann) => (
                    <div key={ann.id} className="announcement-item">
                        <div className="announcement-text">{ann.text}</div>
                        <div className="announcement-time">{formatDate(new Date(ann.timestamp))}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcement;
