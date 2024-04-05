import React from 'react';
import SearchComponent from './Search';

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/login';
      };
    const handleHome = (e) => {
        e.preventDefault();
        window.location.href = '/';
    }
    const handleHowItWorks = (e) => {
        e.preventDefault();
        window.location.href = '/';
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
        window.location.href = '/';
    }
  return (
    <div className="top-0 left-0 right-0 m-2 z-15 flex items-center justify-between">
      <nav className=" p-4 flex justify-between items-center">
        <div className="text-black font-bold text-xl">TENDERLY</div>
        <div className="hidden md:block">
          <a onClick = {handleHome} href="#" className="text-black hover:text-gray-300 mx-4">
            Home
          </a>
          <a onClick = {handleHowItWorks} href="#" className="text-black hover:text-gray-300 mx-4">
            How it Works
          </a>
          <a onClick = {handleRegister} href="#" className="text-black hover:text-gray-300 mx-4">
            Register
          </a>
          <a onClick = {handleTenders} href="#" className="text-black hover:text-gray-300 mx-4">
            Tenders
          </a>
          <a onClick = {handleContact} href="#" className="text-black hover:text-gray-300 mx-4">
            Contact
          </a>
        </div>
      </nav>
      
      <div className='flex justify-between items-center'>
        <SearchComponent />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
