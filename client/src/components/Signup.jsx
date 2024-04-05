import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();
  const handleChange = ({currentTarget:input})=>{
    const newData = {...data};
    newData[input.name] = input.value;
    setData(newData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const url = 'http://localhost:3000/api/users';
        const response = await axios.post(url, data);
        
        // Check if registration was successful
        if (response.status === 200) {
            // Redirect user to login page after successful registration
            navigate("/login");
            console.log(response.data.message); // Log success message
        } else {
            // Handle other status codes if necessary
            console.error("Registration failed:", response.data.message);
            setError("Registration failed. Please try again later.");
        }
    } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error during registration:", error);
        setError("Registration failed. Please try again later2.");
    }
};
const handleSignIn = () => {
  navigate('/login');
}


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-black text-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="text-center mb-8">
          <img
            src="/apple-logo.svg"
            alt="Apple Logo"
            className="mx-auto h-12 mb-4"
          />
          <h2 className="text-2xl font-bold">Sign In or Sign Up</h2>
          <p className="text-gray-400">Enter your email address to get started.</p>
        </div>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={data.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

          <p className="text-sm mb-6 text-gray-400">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Orange ID or password?
            </a>
          </p>
          <p className="text-xs mb-6 text-gray-400">
            Your Orange ID information is used to allow you to sign in securely and access your
            data. Orange records certain data for security, support and reporting purposes. If you
            agree, Orange may also use your Orange ID information to send you marketing emails and
            communications, including based on your use of Orange services.
            <a href="#" className="text-blue-500 hover:underline">
              Review your data & privacy details
            </a>
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mx-auto">
            <button
              onClick={handleSubmit}
              class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Sign Up
            </button>

            <button
              onClick={handleSignIn}
              class="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Sign In
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;