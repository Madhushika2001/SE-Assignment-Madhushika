import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import OAuth from './OAuth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center gap-2">
              <FaSignInAlt className="inline-block" />
              Admin Login
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  Email
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400
                           transition-all duration-200"
                  placeholder="Enter your username"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaLock className="text-blue-600" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400
                           transition-all duration-200"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
                       transform hover:scale-[1.02] transition-all duration-200
                       flex items-center justify-center gap-2"
            >
              <FaSignInAlt className="text-lg" />
              Sign In
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account? {' '}
              <Link 
                to="/register" 
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Register here
              </Link>
              <OAuth/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}