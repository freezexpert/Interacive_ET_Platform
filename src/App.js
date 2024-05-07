import React, {useState} from 'react';
import Login from './pages/Login/Login.js';
import TherapistLogin from './pages/Login/TherapistLogin.js';
import ParentsLogin from './pages/Login/ParentsLogin.js';
import NewAccount from './pages/Login/NewAccount.js';
import Therapist from './pages/Therapist/index.js';
import Parents from './pages/Parents/index.js';

const title = {
    fontSize: '56px',
    paddingBottom: '24px'
}

const App = () => {
    const [currentPage, setCurrentPage] = useState('Login');
    
    return (
      <div className="app">
        <div style={(title)}>互動式早療平台</div>
        {currentPage === 'Login' && <Login changePage={setCurrentPage} />}
        {currentPage === 'TherapistLogin' && <TherapistLogin changePage={setCurrentPage} />}
        {currentPage === 'ParentsLogin' && <ParentsLogin changePage={setCurrentPage} />}
        {currentPage === 'NewAccount' && <NewAccount changePage={setCurrentPage} />}
        {currentPage === 'Therapist' && <Therapist changePage={setCurrentPage} />}
        {currentPage === 'Parents' && <Parents changePage={setCurrentPage} />}
      </div>
    );
  };

export default App