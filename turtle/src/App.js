import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Home from './Home';
import useToken from './useToken';
import Register from './Register';
import Profil from './Profil';

function AppClass() {
    const [user, setUser] = useState('');
    const { token, removeToken, setToken } = useToken();

    const changeUser = (user) => {
        console.log(user);
        setUser(user);
    }

    useEffect(() => {
        changeUser(user);
    }, [user]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} changeUser={changeUser} />} />
                    <Route path="/" element={<Home token={token} removeToken={removeToken} user={user} />} />
                    <Route path="/register" element={<Register />} />
                    <Route exact path="/profil" element={<Profil token={token} setToken={setToken}/>}/>
                </Routes>
            </div>
        </Router>
    );

}


export default AppClass;
