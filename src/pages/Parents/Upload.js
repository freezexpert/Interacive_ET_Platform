import React, {useState} from 'react';

const Upload = () => {

    const [homework, setHomework] = useState([{time: '2024/06/01 16:30', description: '請上傳影片', video: null, videoUrl: '', reply: 'ok'}]);
    
    const onFileUpload = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const newHomework = [...homework];
            newHomework[index].video = file;
            newHomework[index].videoUrl = reader.result;
            setHomework(newHomework);
        };
        
        reader.readAsDataURL(file);
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