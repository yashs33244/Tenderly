import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainComponent from './Main';
import SignUpForm from './Signup';
import background from '../assets/backg.png';
import logo from '../assets/logo.png';
import { BASE_URL } from '../utils/url';

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
      const url = `${BASE_URL}/api/auth`;
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
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${background})` }}>
    <div className="bg-gray-100 text-black rounded-lg p-8 max-w-md w-full shadow-lg" style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-gray-600">

          </button>
        </div>
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Tenderly Logo"
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
              Forgot Tenderly ID or password?
            </a>
          </p>
          <p className="text-xs mb-6 text-black-600">
            Your Tenderly ID information is used to allow you to sign in securely and access your
            data. Tenderly records certain data for security, support, and reporting purposes. If you
            agree, Tenderly may also use your Tenderly ID information to send you marketing emails and
            communications, including based on your use of Tenderly services.
            <a href="#" className="text-blue-500 hover:underline">
              Review your data & privacy details
            </a>
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Sign In
            </button>

            <button
              onClick={handleSignUp}
              className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
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
