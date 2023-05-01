import React from "react";
import { useState, useEffect } from 'react';
import './profil.css';
import axios from "axios";

function Profil(props) {
  const [username, setUsername] = useState('');
  const [posted, setPosted] = useState('');
  const [accepted, setAccepted] = useState('');
  const [tasks, setTasks] = useState([]);
  const [note, setNote] = useState('0');

  useEffect(() => {
    if (props.token) {
      axios({
        method: "GET",
        url: "http://localhost:5000/profil",
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      })
        .then((response) => {
          console.log(response.data);
          setTasks(response.data.tasks);
          setUsername(response.data.username);
          setPosted(response.data.posted);
          setAccepted(response.data.accepted);
          console.log(posted);
          console.log(accepted);
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
          }
        })
    }
  }, [props.token]);

  return (
    <div>
      <h1>Profil</h1>
      <p>Welcome back {username}</p>

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
                  <>
                    <input type="range" min="0" max="5" step="1" defaultValue="0" onChange={(event) => { setNote(event.target.value) }}></input>
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
