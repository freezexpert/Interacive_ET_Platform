import React, {useState, useEffect} from 'react';
import { useAuth } from '../Login/Auth';
const Upload = () => {
    const { user } = useAuth();
    const [homework, setHomework] = useState([{time: '2024/06/01 16:30', description: '請上傳影片', video: null, videoUrl: '', reply: 'ok'}]);
    const [videoData, setVideoData] = useState(null); // <-- Add this line
    
    const now = new Date();
    const currentDate = now.toLocaleDateString('zh-TW');
    
    useEffect(() => {
        fetchVideo(user.email);
    }, [user.email]);

    const onFileUpload = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const newHomework = [...homework];
            newHomework[index].video = file;
            newHomework[index].videoUrl = reader.result;
            setHomework(newHomework);
            uploadFile(file);
        };
        
        reader.readAsDataURL(file);
    };
    const fetchVideo = (email) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ "email": email });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch(`http://localhost:8888/get_video`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.file && data.file.content) {
                    const base64String = Buffer.from(data.file.content).toString('base64');
                    const updatedHomework = homework.map(item => ({
                        ...item,
                        videoUrl: `data:video/mp4;base64,${base64String}`
                    }));
                    setHomework(updatedHomework);
                    setVideoData(data);
                }
            })
            .catch(error => {
                console.error('Error fetching video:', error);
            });
    };
    const uploadFile = (file) => {
        
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('date', currentDate)
        formData.append('description', "Upload")
        formData.append('file', file);
        console.log(file)
        

        fetch('http://localhost:8888/post_video', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('File uploaded successfully:', data);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    };
    return (<div>
        {homework.map((item, index) => {
            const {time, description, video, videoUrl, reply} = item;
            return (
                <div className="homework-box" key={index}>
                    <div className="homework-item">{time}</div>
                    <div className="homework-item">{description}</div>
                    {!video && (
                        <div className="homework-item">
                            <input
                                type="file"
                                onChange={(e) => onFileUpload(e, index)}
                            />
                        </div>
                    )}
                    {video && (
                        <div className="homework-item">
                            <span>已上傳: {/*{video.name}*/}</span>
                            <a href={videoUrl} download={video.name} target="_blank" rel="noopener noreferrer">下載/查看</a>
                        </div>
                    )}
                    <div className="homework-item">{reply}</div>
                </div>);
        })}
    </div>)
}

export default Upload