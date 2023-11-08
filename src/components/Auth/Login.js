// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Get access to the history object for redirection

  const handleLogin = () => {
    // Add your login logic here, such as authentication or API requests.
    // You can replace this with your actual login functionality.
    if (username === 'admin' && password === 'admin@$') {
      // Successful login; you can redirect the user to the dashboard.
      // Using history.push('/dashboard') for automatic redirection.
      history.push('/admin/dashboard');
    } else {
      // Failed login; you can show an error message.
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="login-page" >

    <div className="flex justify-center items-center h-screen ">
      <div className="bor bg-white text-white max-w-lg lg:w-full">
      <div className="logo-container">
      <img
              src="/netlix.png"
              alt="Netflix Logo"
              className="w-32 h-32 mx-auto mt-4 mb-4" // Adjust width and height as needed
            />

          </div>
        <h1 className="text-3xl text-black font-semibold text-center py-4 mb-4">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">
             
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
          
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="text-center   p-8 ">
            <button
              type="button"
              className="bg-green-400 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
