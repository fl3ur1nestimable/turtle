import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
//import Authentification from './Authentification';
import HomePage from './HomePage';
import Profil from './Profil';


class App extends React.Component {

  render() {
    return (
        <Router>
        <div>
            <Routes>
            <Route path="/Profil" element={<Profil/>}/>
            <Route path="/" element={<HomePage/>}/>
            </Routes>
        </div>
        </Router>
    );
    }
}


export default App;
