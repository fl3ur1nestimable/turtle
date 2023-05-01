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
    const [Status, setStatus] = useState('');
    const [tasks, setTasks] = useState([]);
    const token = props.token;
    const user = props.user;

    const addItem = (author, title, description, price) => {
        console.log(author, title, description, price);
        if (!author || !title || !description || !price) return;
        setAuthor([Author, author]);
        setTitle([Title, title]);
        setDescription([Description, description]);
        setPrice([Price, price]);
        var data = {
            author: author,
            title: title,
            description: description,
            price: price,
            status: 'Posted'
        };
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Book added successfully');
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                console.log(data);
                updateList();
            })
            .catch(error => {
                console.error('Error:', error);
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
                            }>Register</button> : null
                    }

                    {
                        /*!token && token!=="" &&token!== undefined?
                        'user not connected' : 'user connected'*/
                        user && user !== "" && user !== undefined ?
                            'Welcome ' + props.user : null
                    }
                </div>
            </nav>
            <h1>Bookstore</h1>
            <div id="bookstore">
                <Form addItem={addItem} />
                <Liste tasks={tasks} updateList={updateList} />
                <button onClick={() => window.location.replace('/profil')}>Go to Profil</button>
            </div>
        </div>
    );
}

export default Home;
