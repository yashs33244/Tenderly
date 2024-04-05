import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainComponent from './Main';
import SignUpForm from './Signup';

const SignInForm = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:3000/api/auth';
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('token', res.data);
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setError(error.response.data.message);
      }
    }
  };
  const handleSignUp = () => {
    navigate('/signup');
  }


  if (loggedIn) {
    return <MainComponent />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="bg-gray-100 text-gray-800 rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-gray-600">
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
            alt="Orange Logo"
            className="mx-auto h-12 mb-4"
          />
          <h2 className="text-2xl font-bold">Sign In or Sign Up</h2>
          <p className="text-gray-600">Enter your email address to get started.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-md bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm mb-6 text-gray-600">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Orange ID or password?
            </a>
          </p>
          <p className="text-xs mb-6 text-gray-600">
            Your Orange ID information is used to allow you to sign in securely and access your
            data. Orange records certain data for security, support, and reporting purposes. If you
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
              Sign In
            </button>

            <button
              onClick={handleSignUp}
              class="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Sign Up
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
