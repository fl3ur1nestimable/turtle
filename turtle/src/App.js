import './App.css';
import React,{useState} from 'react';
import Form from './Form';

function App() {
  const [Author, setAuthor] = useState('');
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState('');

  const addItem = (author, title, description, price) => {
    console.log(author, title, description, price);
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
  fetch('http://localhost:5000/liste', {
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
  .then(data => console.log(data))
  .catch(error => {
      console.error('Error:', error);
  }
  );
  }


  return (
    <div className="App">

      <body>
        <h1>Bookstore</h1>
        <div id="bookstore">
        <Form addItem={addItem} />
        </div>
      
      </body>
    </div>
  );
}

export default App;
