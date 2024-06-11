import React from 'react';
import './index.css';
import TopNav from '../../navigation/TopNav';
import loginImage from '../../assets/login.png'; // Adjust the path as necessary

const Login = ({ changePage }) => {

    function identity(s) {
        changePage(s)
    }

    return (
        <div>
            <TopNav />
            <div className="flex-container">
                <img src={loginImage} alt="Login" className= ".login-image" />
                <div className="login-container">
                    <div className="login-title">登入</div>
                    <button className="btn0" onClick={() => { identity('TherapistLogin') }}>治療師</button><br />
                    <button className="btn0" onClick={() => { identity('ParentsLogin') }}>家長</button><br />
                    <button className="btn0" onClick={() => { identity('NewAccount') }}>創建新帳號</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
