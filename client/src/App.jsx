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
import './charts/ChartjsConfig';
import './css/style.css';
import MyTenders from './pages/MyTenders';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';



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
            <Route path='/my-tenders' element={<MyTenders />} />
            <Route path='/how-it-works' element={<HowItWorks />} />
            <Route path='/contact' element={<Contact />} /> 
            
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

