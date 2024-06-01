import React, {useState} from 'react';
import './index.css';

const TherapistLogin = ({ changePage }) => {

    const [email, setEmail] = useState("123@gmail.com");
    function emailChange(e) {
        setEmail(e.target.value);
    }

    const [password, setPassword] = useState("123");
    function passwordChange(e) {
        setPassword(e.target.value);
    }

    function identity(s) {
        if(s==="Login" || (email==="123@gmail.com" && password==="123")) {
            changePage(s);
        }
    }

    return <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '28px', paddingBottom: '24px'}}>您的身分: 治療師</div>
        <div>帳號</div>
        <input type="email" value={email} onChange={emailChange}/>
        <div>密碼</div>
        <input type="password" value={password} onChange={passwordChange}/><br/>
        <button className="btn0" onClick={() => {identity('Therapist')}}>登入</button>
        <button className="btn0" onClick={() => {identity('Login')}}>返回</button>
    </div>
}

export default TherapistLogin