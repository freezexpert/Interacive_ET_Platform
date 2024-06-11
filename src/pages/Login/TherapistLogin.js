import React, { useState } from 'react';
import './index.css';

const TherapistLogin = ({ changePage }) => {

    const [email, setEmail] = useState("");
    function emailChange(e) {
        setEmail(e.target.value);
    }

    const [password, setPassword] = useState("");
    function passwordChange(e) {
        setPassword(e.target.value);
    }

    function identity(s) {
        if (s === "Login" || (email === "123@gmail.com" && password === "123")) {
            changePage(s)
        }
    }
    const title = {
        fontSize: '30px',
        paddingBottom: '24px'
    }

    return (
        <div className="login-enter">
            <div className="login-title">您的身分: 治療師</div>
            <div>帳號</div>
            <input className="input-field" type="email" value={email} onChange={emailChange} />
            <div>密碼</div>
            <input className="input-field" type="password" value={password} onChange={passwordChange} />
            <button className="btn0" onClick={() => { identity('Therapist') }}>登入</button>
            <button className="btn0" onClick={() => { identity('Login') }}>返回</button>
        </div>
    );
}

export default TherapistLogin;
