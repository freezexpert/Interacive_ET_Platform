import React from 'react';
import { useState, useEffect  } from 'react';
import './PoJun.css';
import { useAuth } from '../Login/Auth';
const StudentChat = ({ student , setCurrentPage}) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
        // Fetch messages from backend when component mounts
        fetchMessages();
    }, []);
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
        saveMessageToBackend(newMsg);
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const fetchMessages = () => {
        const raw = JSON.stringify({
            "from": user.email,
            "to": user.email,
        });
        console.log(raw);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers:myHeaders,
            body: raw,
        };
        fetch('http://localhost:8888/history', requestOptions)
            .then(response => response.json())
            .then(data => {
                // Update state with fetched messages
                console.log(data);
                if (Array.isArray(data.data)) {
                    setMessages(data.data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            })
            .catch(error => console.error('Error fetching messages:', error));
    };
    const saveMessageToBackend = (message) => {
        const url = 'http://localhost:8888/post_his'; // Replace with actual endpoint
        if (!user) {
            console.error('Cannot retrieve email address');
            return;
        }
        // console.log(message)
        const raw = JSON.stringify({
            "from": user.email,
            "to": student.email,
            "chats": [message],
        });
        console.log(raw);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            headers:myHeaders,
            body: raw,
        };
        // console.log(requestOptions)
        fetch(url, requestOptions)
            .then((response) => {
                // console.log(response)
                response.json();
                // console.log(response)
            })
            .then((data) => {
                console.log(data)
                // if (!data.success) {
                //     // console.error('Failed to save message:', data);
                // }
            })
            .catch((error) => console.error('Error:', error));
    };

  
    return (
    <div>
      <h1>Chatting with {student.name}</h1>
      <button onClick={() => setCurrentPage('student-list')}>Back to Student List</button>
      {/* Implement chat functionality here */}
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
    </div>
    
  );
};

export default StudentChat;
