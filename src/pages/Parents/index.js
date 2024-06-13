import React, {useState} from 'react';
import Grid from '@mui/material/Grid';

import ParentSideBar from './Components/ParentSideBar.js';
import TopNav from '../../navigation/TopNav';

import Announcement from './Announcement.js';
import Contact from './Contact.js';
import Upload from './Upload.js';
import Information from './Information.js';
import './index.css';
import { red } from '@mui/material/colors';

const Parents = ({ changePage }) => {
    const [display, setDisplay] = useState('Announcement');
    const [newMessage, setNewMessage] = useState({'Announcement': true, 'Contact': false, 'Upload': false, 'Information': false});

    const changeDisplay = (s) => {
        setNewMessage((prevState) => ({
            ...prevState,
            [s]: false
        }));
        setDisplay(s);
    }

    const logout = (s) => {
        changePage(s);
    }

    const renderPage = () =>{
        switch(display){
            case 'Announcemnet':
                return <Announcement />
            case 'Information':
                return <Information />
            case 'Contact':
                return <Contact />
            case 'Upload':
                return <Upload />
            case 'logout':
                changePage('Login');
            default: 
                return <Announcement />
        }
    }

    return(
        <div id='root'>
            <TopNav />
            <div className='app-container'>
                <ParentSideBar changeDisplay={changeDisplay} newMessage={newMessage}/>
                <div className='main-content'>
                    {renderPage()}
                </div>
            </div>
        </div>
    )
}

export default Parents