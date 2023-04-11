import './App.css';
import React,{useEffect, useState} from 'react';
import Form from './Form';
import Liste from './Liste';

function App() {
  const [Author, setAuthor] = useState('');
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState('');
  const [Status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);

  const addItem = (author, title, description, price) => {
    console.log(author, title, description, price);
    if(!author || !title || !description || !price) return;
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
        <h1>Bookstore</h1>
        <div id="bookstore">
        <Form addItem={addItem} />
        <Liste tasks={tasks} updateList={updateList}/>
        </div>
    </div>
  );
}

export default App;
