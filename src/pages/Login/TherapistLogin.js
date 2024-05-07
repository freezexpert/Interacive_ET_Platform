import React, {useState} from 'react';
import './index.css';

const TherapistLogin = ({ changePage }) => {

    const [account, setAccount] = useState("");
    function accountChange(e) {
        setAccount(e.target.value);
    }

    const [password, setPassword] = useState("");
    function passwordChange(e) {
        setPassword(e.target.value);
    }

    function identity(s) {
        if(s==="Login" || (account==="123" && password==="123")) {
            changePage(s)
        }
    }

    return <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '28px', paddingBottom: '24px'}}>您的身分: 治療師</div>
        <div>帳號</div>
        <input type="text" value={account} onChange={accountChange}/>
        <div>密碼</div>
        <input type="password" value={password} onChange={passwordChange}/><br/>
        <button className="btn0" onClick={() => {identity('Therapist')}}>登入</button>
        <button className="btn0" onClick={() => {identity('Login')}}>返回</button>
    </div>
}

export default TherapistLogin