import React, { useState } from 'react';

const Contact = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const currentTime = new Date().toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const newMsg = {
            content: newMessage,
            time: currentTime,
            sender: 'therapist', // 假設這個聊天室只有兩個人，我們是'self'
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    return (
        <div className="chatroom">
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'therapist' ? 'self' : 'other'}`}
                    >
                        <div className="message-content">
                            <p>{message.content}</p>
                            <span className="message-time">{message.time}</span>
                        </div>
                    </div>
                ))}
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