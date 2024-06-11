import React from 'react';
import { useState } from 'react';
import Sidebar from './Components/Sidebar';
import TopNav from '../../navigation/TopNav';
import './App.css';

import Announcement from './Announcement'; // Example component
import Information from './Information';
import EditStudentList from './EditStudentList';
import StudentList from './StudentList';
import StudentInfo from './StudentInfo';
import StudentChat from './StudentChat';
import StudentAssignment from './StudentAssignment';


const App = ({changePage}) => {
  const [currentPage, setCurrentPage] = useState('announcements');
  const [studentList, setStudentList] = useState([]);


  const renderPage = () => {
    if (currentPage.startsWith('chat-')) {
      const studentId = currentPage.split('-')[1];
      const student = studentList.find(student => student.id === parseInt(studentId));
      return <StudentChat student={student} setCurrentPage={setCurrentPage}/>;
    } else if (currentPage.startsWith('info-')) {
      const studentId = currentPage.split('-')[1];
      const student = studentList.find(student => student.id === parseInt(studentId));
      return <StudentInfo student={student} setCurrentPage={setCurrentPage}/>;
    } else if (currentPage.startsWith('assign-')) {
      const studentId = currentPage.split('-')[1];
      const student = studentList.find(student => student.id === parseInt(studentId));
      return <StudentAssignment student={student} setCurrentPage={setCurrentPage}/>;
    }

    switch(currentPage){
      case 'announcements':
        return <Announcement />
      case 'information':
        return <Information />
      case 'edit-student-list':
        return <EditStudentList studentList={studentList} setStudentList={setStudentList} />;
        //return <EditStudentList />
      case 'student-list':
        return <StudentList studentList={studentList} setCurrentPage={setCurrentPage} />;
      case 'logout':
        changePage("Login");
      default:
        return <Announcement />
    }
  };
  return (
    <div id="root">
      <TopNav />
      <div className='app-container'>
          <Sidebar setCurrentPage={setCurrentPage} />
          <div className="main-content">
              {renderPage()}
              {/* Your other components and content */}
          </div>
      </div>
    </div>
  );
};

export default App;
