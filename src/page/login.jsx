import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log(email,password);
    try {
        const response = await axiosInstance.post('/auth/login',{
          email,
          password
        })
        if (response.data.data.token) {
          Cookies.set('token', response.data.data.token, { expires: 30 });
          Cookies.set('userId', response.data.data.user._id, { expires: 30 });
          Cookies.set('email', response.data.data.user.email, { expires: 30 });
          alert("user login successfully")
          setLoading(false)
          Navigate('/')
          
        } else {
          setError('Something went wrong. Please try again.');
          setLoading(false)
        }
        console.log("responseee",response);
        
    } catch (error) {
      console.log("errro",error);
      setLoading(false)
      
    }
    
   
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={handlePasswordChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
