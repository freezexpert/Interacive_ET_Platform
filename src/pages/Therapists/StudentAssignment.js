import React from 'react';
import { useState } from 'react';
import './PoJun.css';

const StudentAssignment = ({ student , setCurrentPage}) => {
  
    const [homework, setHomework] = useState([{time: '2024/6/1 16:30:10', description: '請上傳影片', video: null, videoUrl: '', reply: 'ok'}]);
    const [addHwWindow, setAddHwWindow] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const [newReply, setNewReply] = useState('');

    const addHomework = () => {
        const currentTime = new Date().toLocaleString('zh-TW', { hour12: false });
        const newHomework = [...homework, {time: currentTime, description: newDescription, video: null, videoUrl: '', reply: ''}]
        setHomework(newHomework);
        setAddHwWindow(false);
        setNewDescription('');
    };

    const formatDescription = (description) => {
        return description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    const addReply = (index) => {
        const updatedHomework = homework.map((item, i) => 
            i === index ? {...item, reply: newReply} : item
        );
        setHomework(updatedHomework);
        setNewReply('');
    }
  
    return (
    <div>
      <h1>Assign Homework for {student.name}</h1>
      <button onClick={() => setCurrentPage('student-list')}>Back to Student List</button>
      {/* Implement homework assignment functionality here */}
      <div><button onClick={() => setAddHwWindow(true)}>新增作業</button></div>
        {addHwWindow &&
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setAddHwWindow(false)}>&times;</span>
                    <form onSubmit={() => {addHomework()}}>
                        <div>
                            <label>
                                作業說明:
                                <textarea className="text-area"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    rows="5"
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">新增</button>
                    </form>
                </div>
            </div>
        }
        {homework.map((item, index) => {
            const {time, description, video, videoUrl, reply} = item;
            return (
                <div className="homework-box" key={index}>
                    <div className="homework-item">{time}</div>
                    <div className="homework-item">{formatDescription(description)}</div>
                    {!video && (
                        <div className="homework-item">
                            <span>未上傳</span>
                        </div>
                    )}
                    {video && (
                        <div className="homework-item">
                            <span>已上傳: {/*{video.name}*/}</span>
                            <a href={videoUrl} download={video.name} target="_blank" rel="noopener noreferrer">下載/查看</a>
                        </div>
                    )}
                    {reply==='' && 
                        <div className="homework-item">
                            <form onSubmit={() => {addReply(index)}}>
                                <div>
                                    <textarea className="text-area"
                                        value={newReply}
                                        onChange={(e) => setNewReply(e.target.value)}
                                        rows='4'
                                        required
                                    />
                                </div>
                            <button type="submit">回覆</button>
                    </form>
                        </div>
                    }
                    {reply!=='' && <div className="homework-item">{formatDescription(reply)}</div>}
                </div>
            );
        })}
    </div>
  );
};

export default StudentAssignment;
