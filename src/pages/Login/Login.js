import React from 'react';
import './index.css';

const Login = ({ changePage }) => {

    function identity(s) {
        changePage(s)
    }

    return <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '28px', paddingBottom: '24px'}}>登入</div>
        <button className="btn0" onClick={() => {identity('TherapistLogin')}}>治療師</button><br/>
        <button className="btn0" onClick={() => {identity('ParentsLogin')}}>家長</button><br/>
        <button className="btn0" onClick={() => {identity('NewAccount')}}>創建新帳號</button>
    </div>
}

export default Login