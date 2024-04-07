import React from 'react';
import { Link } from 'react-router-dom'; 

const Sidebar = ({ isOpen, onClose }) => {
  // Determine the appropriate CSS class based on isOpen state
  const sidebarClass = isOpen 
    ? "fixed top-2 right-0 h-screen w-64 bg-gray-800 text-white"
    : "hidden";

  return (
    <div className={sidebarClass}>
      <div className="flex flex-col justify-between p-4 h-full">
        {/* Sidebar Navigation */}
        <ul>
          <li>
            <Link to="/dashboard" className="text-white hover:bg-gray-700 px-4 py-2 rounded-md block">Dashboard</Link>
          </li>
          <li>
            <Link to="/user" className="text-white hover:bg-gray-700 px-4 py-2 rounded-md block">User</Link>
          </li>
          <li>
            <Link to="/settings" className="text-white hover:bg-gray-700 px-4 py-2 rounded-md block">Settings</Link>
          </li>
        </ul>

        {/* Logout Button */}
        {/* ... your logout button */}
        
        {/* Toggle Button */}
        <button onClick={onClose} className="text-white hover:bg-gray-700 px-4 py-2 rounded-md block mt-4">
          Close Sidebar
        </button>
      </div>

      {/* Overlay for closing the sidebar (optional) */}
      {isOpen && (
        <div className="bg-gray-900 opacity-50 fixed inset-0" onClick={onClose}></div>
      )} 
    </div>
  );
};

export default Sidebar;
