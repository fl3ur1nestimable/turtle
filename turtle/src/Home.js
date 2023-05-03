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
    const [tasks, setTasks] = useState([]);
    const token = props.token;
    const [user, setUser] = useState('');

    const addItem = (title, description, price) => {
        console.log(title, description, price);
        if (!title || !description || !price) return;
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

    const acceptTask = (id) => {
        console.log(id);
        axios({
            method: 'post',
            url: 'http://localhost:5000/accept',
            data: {
                task_id: id,
                acceptor: user
            }
        })
            .then(response => {
                console.log(response);
                updateList();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        updateList();
        const getUser = () => {
            axios({
                method: 'get',
                url: 'http://localhost:5000/username',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                setUser(response.data.username);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        if(token && token !== "" && token !== undefined) {
            getUser();
        }
    }, [token]);



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
                        user && user !== "" && user !== undefined ?
                            'Welcome ' + user : null
                    }
                </div>
            </nav>
            <h1>Bookstore</h1>
            <div id="bookstore">
                {token && token !== "" && token !== undefined ? (
                    <>
                        <Form addItem={addItem} />
                    </>
                ) : (
                    <p>You have to be connected in order to post a task</p>
                )}

                <Liste tasks={tasks} updateList={updateList} token={token} acceptTask={acceptTask} user={user} />
            </div>
        </div>
    );
}

export default Home;