import React from "react";
import { useState, useEffect } from 'react';
import './profil.css';
import axios from "axios";

function Profil(props) {
  const [username, setUsername] = useState('');
  const [posted, setPosted] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [note, setNote] = useState('0');
    
    function getData() {
      axios({
        method: "GET",
        url:"http://localhost:5000/profil",
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      })
      .then((response) => {
        const res =response.data
        res.access_token && props.setToken(res.access_token)
        setUsername(res.username)
        setPosted(res.posted)
        setAccepted(res.accepted)
        console.log(username)
        console.log(posted)
        console.log(accepted)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}
      
      useEffect(() => {
        getData()
      }, [])


  return (
    <div>
      <h1>Profil</h1>
      <p>Welcome back {username}</p>

      <h2> here is the list of your propositions</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {posted.map((task, index) => (
            <tr key={index}>
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
