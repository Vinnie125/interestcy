import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as axios from 'axios';

function Register() {
  const [username, setUsername] = useState("");
  const [passwd, setPassword] = useState("");
  const navigate = useNavigate();

  const client = axios.default;
  const base = "http://127.0.0.1:7002/api/register"


  const handleSubmit = async (e) => {
    e.preventDefault();
    client.post(base, {
      username: username,
      passwd: passwd,
    })
    .then((response) => {
      response.data;
      console.log(response.data);
      
      if (response.data.success) {
        alert('注册成功!');
        navigate('/login');
      } else {
        alert('注册失败: ' + response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Username</label>
            <input
              type="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={passwd}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
