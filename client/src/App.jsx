import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/Signup';
import MainComponent from './components/Main';
import SignInForm from './components/Signin';
import CreateTender from './components/CreateTender'; 
import { useNavigate } from 'react-router-dom'; 
import Tenders from './pages/Tenders';
import Dashboard from './pages/Dashboard';



function App() {
  const user = localStorage.getItem('token');
  const navigate = useNavigate(); 

  const navigateToCreateTender = () => {
    navigate('/create-tender');
  };
  

  return (
    <div >
      <Routes>
        {user ? (
          <> {/* Wrap protected routes */}
            <Route path='/' element={<MainComponent navigateToCreateTender={navigateToCreateTender} />} /> 
            <Route path='/bidding-tenders' element={<Tenders />} />
            <Route path='/dashboard' element={<Dashboard />} />
            
          </>
        ) : (
          <Route path='/' element={<Navigate to='/login' />} />
        )}
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/login' element={<SignInForm />} />
        <Route path='/create-tender' element={<CreateTender />} /> 
      </Routes>
      
    </div>
  );
}

export default App;

