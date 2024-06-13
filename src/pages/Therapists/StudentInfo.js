import React, { useState } from 'react';

const StudentInfo = ({student, setCurrentPage}) => {

    // const [name, setName] = useState(student);
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');

    // return <div>
    //     <div>學生姓名：{name}</div>
    //     <div>電話號碼：{phone}</div>
    //     <div>電子信箱：{email}</div>
    // </div>

    return (
        <div>
          <h1>{student.name}'s Info</h1>
          <button onClick={() => setCurrentPage('student-list')}>Back to Student List</button>
          <p>Phone: {student.phone}</p>
          <p>Email: {student.email}</p>
        </div>
    );
}

export default StudentInfo