import React, { useState } from 'react';
import './PoJun.css';

const Contact = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const now = new Date();
        const currentTime = now.toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
        });
        const currentDate = now.toLocaleDateString('zh-TW');

        const newMsg = {
            content: newMessage,
            time: currentTime,
            date: currentDate,
            fullTime: now,
            sender: 'therapist',
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    return (
        <div className="chatroom">
            <div className="messages">
                {messages.map((message, index) => {
                    const showDate =
                        index === 0 ||
                        messages[index].date !== messages[index - 1].date;

                    return (
                        <React.Fragment key={index}>
                            {showDate && (
                                <div className="message-date">
                                    {message.date}
                                </div>
                            )}
                            <div
                                className={`message ${
                                    message.sender === 'therapist' ? 'self' : 'other'
                                }`}
                            >
                                <div className="message-content">
                                    <p>{message.content}</p>
                                    <span className="message-time">
                                        {message.time}
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
            <form className="message-input" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="輸入訊息..."
                />
                <button type="submit">傳送</button>
            </form>
        </div>
    );
};

export default Contact;