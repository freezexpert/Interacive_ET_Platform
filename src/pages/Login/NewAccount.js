import React, {useState} from 'react';
import './index.css';

const NewAccount = ({ changePage }) => {

    const [email, setEmail] = useState("");
    function emailChange(e) {
        setEmail(e.target.value);
    }
    
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
        <div style={{fontSize: '28px', paddingBottom: '24px'}}>創建新帳號</div>
        <div>信箱</div>
        <input type="email" value={account} onChange={emailChange}/>
        <div>帳號</div>
        <input type="text" value={account} onChange={accountChange}/>
        <div>密碼</div>
        <input type="password" value={password} onChange={passwordChange}/>
        <button className="btn0">註冊</button>
        <button className="btn0" onClick={() => {identity('Login')}}>返回</button>
    </div>
}

export default NewAccount