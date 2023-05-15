import './Home.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Form from './Form';
import Liste from './Liste';
import axios from 'axios';
import abi from './abi.json';
import adress from './adress.json';

function Home(props) {
    const adr = adress.address;
    const [Author, setAuthor] = useState('');
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [tasks, setTasks] = useState([]);
    const token = props.token;
    const [user, setUser] = useState('');
    const addItem = (title, description, price) => {
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
            .then(async response => {
                console.log(response);
                updateList();
                try{           
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.requestAccounts();
                    const account = accounts[0];
                    console.log(account);
                    const contractAddress = adr;
                    const contractABI = abi;
                    const contract = new web3.eth.Contract(contractABI, contractAddress);
                    contract.methods.createTransaction(description,price).send({from: account, value: web3.utils.toWei(price, 'wei')});
                }
                catch(error){
                    console.log(error);
                }
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
        axios({
            method: 'post',
            url: 'http://localhost:5000/accept',
            data: {
                task_id: id,
                acceptor: user
            }
        })
            .then(async response => {
                updateList();
                try {
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.requestAccounts();
                    const account = accounts[0];
                    const contractAddress = adr;
                    const contractABI = abi;
                    const contract = new web3.eth.Contract(contractABI, contractAddress);
                    contract.methods.acceptTransaction(id-1).send({from: account});
                } catch (error) {
                    console.log(error);
                }

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
                    <div>
                    {
                        !token && token !== "" && token !== undefined ?
                            <button className='btnh' onClick={
                                () => {
                                    window.location.href = '/login';
                                }
                            }>Login</button>
                            : <button className='btnh' onClick={logout}>Logout</button>

                    }
                    {
                        !token && token !== "" && token !== undefined ?
                            <button className='btnh' onClick={
                                () => {
                                    window.location.href = '/register';
                                }
                            }>Register</button>
                            : <button className='btnh' onClick={
                                () => {
                                    window.location.href = '/profil';
                                }
                            }>Profil</button>
                    }
                    </div>
                    <div>
                    {
                        user && user !== "" && user !== undefined ?
                            'Welcome ' + user : null
                    }
                    </div>
                </div>
            </nav>
            <h1>TaskTurtle</h1>
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
