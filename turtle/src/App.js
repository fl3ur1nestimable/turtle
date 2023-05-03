import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Home from './Home';
import useToken from './useToken';
import Register from './Register';
import Profil from './Profil';

function AppClass() {
    const { token, removeToken, setToken } = useToken();
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken}/>} />
                    <Route path="/" element={<Home token={token} removeToken={removeToken}/>} />
                    <Route path="/register" element={<Register />} />
                    <Route exact path="/profil" element={<Profil token={token} setToken={setToken}/>}/>
                </Routes>
            </div>
        </Router>
    );

}


export default AppClass;
