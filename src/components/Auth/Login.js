import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { authenticateUser } from '../../models/auth';

function Login({ setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await authenticateUser({ username, password });

      console.log('Authentication Response:', response);

      if (response.success) {
        const { id, role } = response;
        setAuthenticated(true); // Update authentication status


        console.log('User Role:', role);

        // Redirect based on the user's role
        if (role === 'Admin') {
          history.push(`/admin/dashboard/${id}`);
        } else if (role === 'Influencers') {
          history.push(`/influencer/dashboard/${id}`);
        } else if (role === 'Users') {
          history.push(`/user/dashboard/${id}`);
        }
      } else {
        alert('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(
        'Login failed. Please check your username and password or see the console for more details.'
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="flex justify-center items-center h-screen">
        <div className="bor border bg-white text-white max-w-lg lg:w-full">
          <div className="logo-container">
            <img src="/netlix.png" alt="Netflix Logo" className="w-32 h-32 mx-auto mt-4 mb-4" />
          </div>
          <h1 className="text-3xl text-black font-semibold text-center py-4 mb-4">Login</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2"></label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2"></label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
              />
            </div>
            <div className="text-right  p-2">
              <Link to="/signup" className="text-blue-400  hover:text-blue-700">
                Sign Up
              </Link>
            </div>
            <div className="text-center py-10 p-2">
              <button
                type="button"
                className="bg-green-400  hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
