import React, { useState, useEffect } from 'react';

const EditStudentList = ({ studentList, setStudentList }) => {
  const [newStudent, setNewStudent] = useState({ name: '', phone: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleAddStudent = () => {
    setStudentList([...studentList, { ...newStudent, id: Date.now() }]);
    setNewStudent({ name: '', phone: '', email: '' });
  };
  // useEffect(() => {
  //   fetchStudentList();
  // }, []);
  // const fetchStudentList = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8888/student`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch student list');
  //     }
  //     const data = await response.json();
  //     setStudentList(data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error.message);
  //     setIsLoading(false);
  //   }
  // };
  // const AddStudent = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8888/student`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newStudent),
        
  //     });
  //     console.log(newStudent);
  //     console.log(response);
  //     if (!response.ok) {
  //       throw new Error('Failed to add student');
  //     }
  //     const addedStudent = await response.json();
  //     console.log(addedStudent)
  //     setStudentList([...studentList, newStudent]);
  //     setNewStudent({ name: newStudent.name, phone: newStudent.phone, email: newStudent.email });
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  // const DeleteStudent = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:8888/student/${id}`, {
  //       method: 'DELETE',
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to delete student');
  //     }
  //     setStudentList(studentList.filter(student => student.id !== id));
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  const handleDeleteStudent = (id) => {
    setStudentList(studentList.filter(student => student.id !== id));
  };

  return (
    <div>
      <h1>Edit Student List</h1>
      <input
        type="text"
        placeholder="Name"
        value={newStudent.name}
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newStudent.phone}
        onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={newStudent.email}
        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
      />
      <button onClick={handleAddStudent}>Add Student</button>
      <ul>
        {studentList.map(student => (
          <li key={student.id}>
            {student.name} - {student.phone} - {student.email}
            <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditStudentList;
