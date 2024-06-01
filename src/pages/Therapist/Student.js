import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import StudentInfo from './StudentInfo.js';
import Upload from './Upload.js';
import Contact from './Contact.js';

const Student = () => {

    const [show, setShow] = useState('StudentInfo');

    return <div>
        <Grid container>
            <Grid item xs={4}>
                <button className="btn1" onClick={() => setShow('StudentInfo')}>學生資訊</button>
            </Grid>
            <Grid item xs={4}>
                <button className="btn1" onClick={() => setShow('Video')}>練習影片</button>
            </Grid>
            <Grid item xs={4}>
                <button className="btn1" onClick={() => setShow('Chatroom')}>連絡家長</button>
            </Grid>
        </Grid>
        {show==="StudentInfo" && <StudentInfo />}
        {show==="Video" && <Upload />}
        {show==="Chatroom" && <Contact />}
    </div>
}

export default Student