import './Home.css';
import React, { useEffect, useState } from 'react';
import Form from './Form';
import Liste from './Liste';
import axios from 'axios';

function Home(props) {
    const [Author, setAuthor] = useState('');
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    //const [Status, setStatus] = useState('');
    const [tasks, setTasks] = useState([]);
    const token = props.token;
    const user = props.user;

    const addItem = ( title, description, price) => {
        console.log( title, description, price);
        if ( !title || !description || !price) return;
        setAuthor([Author, user]);
        setTitle([Title, title]);
        setDescription([Description, description]);
        setPrice([Price, price]);
        var data = {
            author: user,
            title: title,
            description: description,
            price: price,
            status: 'Posted'
        };
        axios({
            method: 'post',
            url: 'http://localhost:5000/tasks',
            data: data,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            console.log(response);
            updateList();
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        });
    }

    const logout = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/logout',
        })
            .then(response => {
                props.removeToken();
                window.location.href = '/';
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });

    }

    const updateList = () => {
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            });
    }

    useEffect(() => {
        updateList();
    }, []);


    return (
        <div className="App">
            <nav>
                <div>
                    {
                        !token && token !== "" && token !== undefined ?
                            <button onClick={
                                () => {
                                    window.location.href = '/login';
                                }
                            }>Login</button>
                            : <button onClick={logout}>Logout</button>

                    }
                    {
                        !token && token !== "" && token !== undefined ?
                            <button onClick={
                                () => {
                                    window.location.href = '/register';
                                }
                            }>Register</button> 
                            : <button onClick={
                                () => {
                                    window.location.href = '/profil';
                                }
                            }>Profil</button>
                    }

                    {
                        /*!token && token!=="" &&token!== undefined?
                        'user not connected' : 'user connected'*/
                        user && user !== "" && user !== undefined ?
                            'Welcome ' + user : 'user not connected'
                    }
                </div>
            </nav>
            <h1>Bookstore</h1>
            <div id="bookstore">
                {token && token !=="" && token!==undefined ? (
                  <>
                    <Form addItem={addItem} />
                  </>
                ) : (
                  <p>You have to be connected if you want to make a proposition</p>
                )}
                
                <Liste tasks={tasks} updateList={updateList} />
            </div>
        </div>
    );
}

export default Home;
