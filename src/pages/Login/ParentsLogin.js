import React, { useState } from 'react';
import './index.css';

const ParentsLogin = ({ changePage }) => {

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

    return (
        <div className="login-page">
            <div className="login-title">您的身分: 家長</div>
            <div>帳號</div>
            <input className="input-field" type="text" value={email} onChange={emailChange} />
            <div>密碼</div>
            <input className="input-field" type="password" value={password} onChange={passwordChange} /><br />
            <button className="btn0" onClick={() => { identity('Parents') }}>登入</button>
            <button className="btn0" onClick={() => { identity('Login') }}>返回</button>
        </div>
    );
}

export default ParentsLogin;
