import React, { useState, useEffect } from 'react';
import './PoJun.css';

const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState('');

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const addAnnouncement = async () => {
        const now = new Date();
        const newAnn = {
            text: newAnnouncement,
            timestamp: now
        };

        try {
            const response = await fetch('http://localhost:8888/announcement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAnn)
            });

            if (response.ok) {
                const savedAnnouncement = await response.json();
                setAnnouncements([savedAnnouncement, ...announcements]);
                setNewAnnouncement('');
                setShowModal(false);
            } else {
                console.error('Error adding announcement');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
    const formatDate = (date) => {
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        };
        return new Intl.DateTimeFormat('default', options).format(date);
    };

    return (
        <div className='content'>
            <div className="announcement-container">
                <div className="header">
                    <h2>公告</h2>
                    <button className="add-announcement-btn" onClick={() => setShowModal(true)}>新增公告</button>
                </div>
                <div className="announcements-list">
                    {announcements.map((ann) => (
                        <div key={ann.id} className="announcement-item">
                            <div className="announcement-text">{ann.text}</div>
                            <div className="announcement-time">{formatDate(new Date(ann.timestamp))}</div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                            <textarea
                                className="announcement-textarea"
                                value={newAnnouncement}
                                onChange={(e) => setNewAnnouncement(e.target.value)}
                                rows="5"
                                placeholder="輸入公告訊息..."
                                required
                            />
                            <button className="submit-btn" onClick={addAnnouncement}>新增</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Announcement;
