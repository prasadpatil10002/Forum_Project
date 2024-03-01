import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Clear input fields
        setEmail('');
        setPassword('');
        // Clear error message if any
        setError('');
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className='bg-gray-800'>
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-white " >
          <div className="text-3xl text-center text-white-100 mb-4">Login</div>
          <div className="mb-4">
            <label className="block text-white-100 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-white-100 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between text-white-100">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">&copy;2024 FC HUB. All rights reserved.</p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
