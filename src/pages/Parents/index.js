import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Announcement from './Announcement.js';
import Contact from './Contact.js';
import Upload from './Upload.js';
import Information from './Information.js';
import './index.css';

const Parents = ({ changePage }) => {
    const [display, setDisplay] = useState('Announcement');
    const changeDisplay = (s) => {
        setDisplay(s)
    }

    const logout = (s) => {
        changePage(s)
    }

    return <div>
        <Grid container>
            <Grid item xs={2}>
                <button className="btn1" onClick={() => changeDisplay('Announcement')}>公告</button>
                <button className="btn1" onClick={() => changeDisplay('Contact')}>聯絡治療師</button>
                <button className="btn1" onClick={() => changeDisplay('Upload')}>影片上傳</button>
                <button className="btn1" onClick={() => changeDisplay('Information')}>早療資訊</button>
                <button className="btn1" onClick={() => logout('Login')}>登出</button>
            </Grid>
            <Grid item xs={10}>
                {display==='Announcement' && <Announcement />}
                {display==='Contact' && <Contact />}
                {display==='Upload' && <Upload />}
                {display==='Information' && <Information />}
            </Grid>
        </Grid>
    </div>
}

export default Parents