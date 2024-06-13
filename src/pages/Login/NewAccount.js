import React, { useState } from 'react';
import './index.css';

const NewAccount = ({ changePage }) => {

    const [email, setEmail] = useState("");
    function emailChange(e) {
        setEmail(e.target.value);
    }

    const [password, setPassword] = useState("");
    function passwordChange(e) {
        setPassword(e.target.value);
    }
    const [username, setUsername] = useState("");
    function usernameChange(e) {
        setUsername(e.target.value);
    }
    const [role, setRole] = useState("");
    function roleChange(e) {
        setRole(e.target.value);
    }

    function identity(s) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email,
            "password": password,
            "name": username,
            "role": role
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8888/user_data", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        changePage(s)
    }

    return (
        <div className="login-enter">
            <div className="login-title">創建新帳號</div>
            <div>信箱</div>
            <input className="input-field" type="email" value={email} onChange={emailChange} />
            <div>密碼</div>
            <input className="input-field" type="password" value={password} onChange={passwordChange} /><br />
            <div>使用者名稱</div>
            <input className="input-field" type="text" value={username} onChange={usernameChange} /><br />
            <div>使用者身分</div>
            <select className="input-field" value={role} onChange={roleChange}>
                <option>請選擇以下身分</option>
                <option value="Parent">家長</option>
                <option value="Therapist">治療師</option>
            </select><br />
            <button className="btn0" onClick={() => { identity('Parents') }}>註冊</button>
            <button className="btn0" onClick={() => { identity('Login') }}>返回</button>
        </div>
    );
}

export default NewAccount;
