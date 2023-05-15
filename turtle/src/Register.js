import './register.css'
import React, { useState } from 'react';

function Register() {

    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const register = () => {
        if (!Username || !Email || !Password) {
            alert('Please fill all the fields');
            return;
        }
        var data = {
            username: Username,
            email: Email,
            password: Password
        };
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    console.log('User registered successfully');
                    window.location.href = '/login';
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
    }

    return (
        <div className="Register">
            <h1>TaskTurtle</h1>
            <input className='regi' type="text" placeholder="Username" onChange={handleUsernameChange} />
            <input className='regi' type="text" placeholder="Email" onChange={handleEmailChange} />
            <input className='regi' type="password" placeholder="Password" onChange={handlePasswordChange} />
            <button className='regb' onClick={register}>Register</button>
            <button className='rethome' onClick={() => window.location.href = "/"}>HomePage</button>
        </div>
    );
}

export default Register;