import React, { useState } from 'react';

const StudentInfo = ({student}) => {

    const [name, setName] = useState(student);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    return <div>
        <div>學生姓名：{name}</div>
        <div>電話號碼：{phone}</div>
        <div>電子信箱：{email}</div>
    </div>
}

export default StudentInfo