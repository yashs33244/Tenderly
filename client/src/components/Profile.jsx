import React from 'react';
import { useState ,useEffect} from 'react';
import picture from '../assets/yash.jpeg';
import axios from 'axios';
import { BASE_URL } from '../utils/url';


const Profile = ({ isOpen, isClose }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    useEffect(() => {
      const fetchData = async () => {
          try {
              const token = localStorage.getItem('token');
              if (!token) {
                  // Handle case where token is missing
                  console.error('Token is missing');
                  return;
              }
  
              const response = await axios.get(`${BASE_URL}/api/auth/profile`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
  
              const { data } = response;
              if (!data.email) {
                  // Handle case where email is missing in the response
                  console.error('Email is missing in the response');
                  return;
              }
  
              setFirstName(data.firstName || '');
              setLastName(data.lastName || '');
              setEmail(data.email);
          } catch (error) {
              // Handle any errors that occur during the request
              console.error('Error fetching user profile:', error);
          }
      };
      fetchData();
  }, []);
  
    const hanldleDashboard = () => {
    window.location = '/dashboard';
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/login';
      };
    const handleMyTenders = () =>{
        window.location = '/my-tenders';
    }

    const handleHome = (e) => {
      e.preventDefault();
      window.location.href = '/';
  }
  const handleHowItWorks = (e) => {
      e.preventDefault();
      window.location.href = '/how-it-works';
  }
  const handleRegister = (e) => {
      e.preventDefault();
      window.location.href = '/create-tender';
  }
  const handleTenders = (e) => {
      e.preventDefault();
      window.location.href = '/bidding-tenders';
  }
  const handleContact = (e) => {
      e.preventDefault();
      window.location.href = '/contact';
  }
    
  return (
    <div className="relative">
      <img
        id="avatarButton"
        type="button"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        className="w-10 h-10 rounded-full cursor-pointer"
        src={picture}
        alt="User dropdown"
        onClick={isOpen ? isClose : null}
      />
      {/* Dropdown menu */}
      <div
        id="userDropdown"
        className={`z-10 ${isOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-12 right-0`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Hi {firstName} {lastName}</div>
          <div className="font-medium truncate">{email}</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
          <li onClick={hanldleDashboard}>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleMyTenders}>My Tenders</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleRegister}>Publish</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleTenders}>Tenders</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleContact}>Contact</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleHowItWorks}>How it works</a>
          </li>
       
        </ul>
        <div className="py-1">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={handleLogout}  
          >Sign out</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
