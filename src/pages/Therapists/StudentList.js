import React from 'react';

const StudentList = ({ studentList, setCurrentPage }) => {
  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {studentList.map(student => (
          <li key={student.id}>
            <div>
              <strong>{student.name}</strong>
              <div>{student.phone}</div>
              <div>{student.email}</div>
              <button onClick={() => setCurrentPage(`chat-${student.id}`)}>Chat</button>
              <button onClick={() => setCurrentPage(`info-${student.id}`)}>Info</button>
              <button onClick={() => setCurrentPage(`assign-${student.id}`)}>Assign Homework</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
