import React, { useState } from 'react';
import './index.css';
import { useAuth } from './Auth';
const ParentsLogin = ({ changePage }) => {
    const { setUser } = useAuth();
    const [email, setEmail] = useState("");
    function emailChange(e) {
        setEmail(e.target.value);
    }
    
    const [password, setPassword] = useState("");
    function passwordChange(e) {
        setPassword(e.target.value);
    }

    function identity(s) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email,
            "password": password,
        });
        console.log(email, password)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8888/user_data", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.message);
                // Assuming the response text is "true" if login is successful
                if (result.message === "Success") {
                    setUser({
                        email: email,
                    });
                    changePage(s);
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="login-enter">
            <div className="login-title">您的身分: 家長</div>
            <div>帳號</div>
            <input className="input-field" type="text" value={email} onChange={emailChange} />
            <div>密碼</div>
            <input className="input-field" type="password" value={password} onChange={passwordChange} /><br />
            <button className="btn0" onClick={() => { identity('Parents') }}>登入</button>
            <button className="btn0" onClick={() => { changePage('Login') }}>返回</button>
        </div>
    );
}

export default ParentsLogin;
