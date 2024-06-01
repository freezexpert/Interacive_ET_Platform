import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Announcement from './Announcement.js';
import Information from './Information.js';
import Student from './Student.js'
import EditStudentList from './EditStudentList.js';
import './index.css';

const Parents = ({ changePage }) => {
    const [display, setDisplay] = useState('Announcement');
    function changeDisplay(s) {
        setDisplay(s)
    }

    const [studentList, setStudentList] = useState(['001', '002', '003'])

    function logout(s) {
        changePage(s)
    }

    return <div>
        <Grid container>
            <Grid item xs={2}>
                <button className="btn1" onClick={() => changeDisplay('Announcement')}>公告</button>
                <button className="btn1" onClick={() => changeDisplay('Information')}>早療資訊編輯</button>
                {studentList.map((item) => {
                    return (<button className="btn1" onClick={() => changeDisplay('Student')}>{item}</button>);
                })}
                <button className="btn1" onClick={() => changeDisplay('EditStudentList')}>編輯學生名單</button>
                <button className="btn1" onClick={() => logout('Login')}>登出</button>
            </Grid>
            <Grid item xs={10}>
                {display==='Announcement' && <Announcement />}
                {display==='Information' && <Information />}
                {display==='Student' && <Student />}
                {display==='EditStudentList' && <EditStudentList studentList={studentList} setStudentList={setStudentList}/>}
            </Grid>
        </Grid>
    </div>
}

export default Parents