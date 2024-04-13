import React from 'react';
import { useState ,useEffect} from 'react';
import picture from '../assets/yash.jpeg';
import axios from 'axios';


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
  
              const response = await axios.get('http://localhost:3000/api/auth/profile', {
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
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
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
