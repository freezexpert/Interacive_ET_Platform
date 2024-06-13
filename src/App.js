import React, {useState} from 'react';
import Login from './pages/Login/Login.js';
import TherapistLogin from './pages/Login/TherapistLogin.js';
import ParentsLogin from './pages/Login/ParentsLogin.js';
import NewAccount from './pages/Login/NewAccount.js';
import Therapist from './pages/Therapists/App.js';
import Parents from './pages/Parents/index.js';
import TopNav from './navigation/TopNav.js';

const title = {
    fontSize: '30px',
    paddingBottom: '24px'
}
// <div style={(title)}>互動式早療平台</div>

const App = () => {
    const [currentPage, setCurrentPage] = useState('Login');
    
    return (
      <div>
        <div className="app">
          {currentPage === 'Login' && <Login changePage={setCurrentPage} />}
          {currentPage === 'TherapistLogin' && <TherapistLogin changePage={setCurrentPage} />}
          {currentPage === 'ParentsLogin' && <ParentsLogin changePage={setCurrentPage} />}
          {currentPage === 'NewAccount' && <NewAccount changePage={setCurrentPage} />}
          {currentPage === 'Therapist' && <Therapist changePage={setCurrentPage} />}
          {currentPage === 'Parents' && <Parents changePage={setCurrentPage} />}
        </div>
      </div>
    );
  };

export default App