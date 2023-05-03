import './login.css';
import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const login = () => {
    if (!email || !password) {
      alert('Please fill all the fields');
      return;
    }
    var data = {
      email: email,
      password: password
    };
    axios({
      method: "POST",
      url: "http://localhost:5000/login",
      data: data
    })
      .then((response) => {
        props.setToken(response.data.access_token);
        window.location.href = "/";
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })

  }

  return (
    <div className="Login">
      <input type="text" placeholder="Email" onChange={handleUsernameChange} />
      <input type="password" placeholder="Password" onChange={handlePasswordChange} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;