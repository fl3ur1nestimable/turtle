import React from "react";
import { useState, useEffect } from 'react';
import './profil.css';

function Profil() {
  const now = "John";
  const [tasks, setTasks] = useState([]);
  const [note, setNote] = useState('0');


  const updateList = () => {
    fetch('http://localhost:5000/tasks')
    .then(response => response.json())
    .then(data => {
      const filteredTasks = data.filter(task => task.author === "John");
      setTasks(filteredTasks);
    });
  }
  

  useEffect(() => {
    updateList();
  }, []);

  return (
    <div>
      <h1>Profil</h1>
      <p>My name is {now}</p>

      <h2> here is the list of your propositions</h2>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.author}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.price}</td>
                                <td>{task.status}</td>
                                <td>
                                  {task.status === 'Completed' ? (
                                    <><input type="range" min="0" max="5" step="1" defaultValue="0" onChange={(event) => {setNote(event.target.value)}}></input>
                                    <p>{note}</p>
                                    </>
                                  ) : (
                                    <p>Activity not completed</p>
                                  )}
                                </td>
                            </tr>
                        ))}
        </tbody>
      </table>

      <button onClick={() => window.location.replace('/')}>Back to HomePage</button>

    </div>
  );
}

export default Profil;
