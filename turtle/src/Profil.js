import React, { useEffect } from "react";
import { useState} from 'react';
import './profil.css';
import axios from "axios";

function Profil(props) {
  const [username, setUsername] = useState('');
  const [posted, setPosted] = useState([]);
  const [accepted, setAccepted] = useState([]);
  //const [noteP, setNote] = useState('0');

  useEffect(() => {
    function getData() {
      axios({
        method: "GET",
        url: "http://localhost:5000/profil",
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      })
        .then((response) => {
          const res = response.data
          res.access_token && props.setToken(res.access_token)
          setUsername(res.username)
          setPosted(res.posted)
          setAccepted(res.accepted)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
        })
    }
    getData();
  },[]);

  const noteTaskPosted = (id, note) => {
    axios({
      method: "POST",
      url: "http://localhost:5000/notePost",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: {
        task_id: id,
        note: note
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Note posted")
        }
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      }
      );
  }

  const noteTaskAccepted = (id, note) => { 
    axios({
      method: "POST",
      url: "http://localhost:5000/noteAccept",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: {
        task_id: id,
        note: note
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Note posted")
        }
      }
      ).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      }
      );
  }

  const completeTask = (id) => {
    axios({
      method: "POST",
      url: "http://localhost:5000/complete",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: {
        task_id: id
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Task completed");
          window.location.reload();
        }
      }
      ).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      }
      );
  }

  return (
    <div>
      <h1>Profil</h1>
      <p>Welcome back {username}</p>

      <h2>Posted Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Note</th>
            <th>Action</th>
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
                    <button onClick={() => noteTaskPosted(task.id, 0)}>0</button>
                    <button onClick={() => noteTaskPosted(task.id, 1)}>1</button>
                    <button onClick={() => noteTaskPosted(task.id, 2)}>2</button>
                    <button onClick={() => noteTaskPosted(task.id, 3)}>3</button>
                    <button onClick={() => noteTaskPosted(task.id, 4)}>4</button>
                    <button onClick={() => noteTaskPosted(task.id, 5)}>5</button>
                  </>
                ) : (
                  <p>Activity not completed</p>
                )}
              </td>
              <td>
                {task.status === 'Accepted' ? (
                  <button onClick={() => completeTask(task.id)}>Complete</button>
                ) : (
                  <p>Activity not completed</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Accepted tasks</h2>
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
          {accepted.map((task, index) => (
            <tr key={index}>
              <td>{task.author}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.price}</td>
              <td>{task.status}</td>
              {
                task.status === 'Completed' ? 
                <td>
                  <input type="range" min="0" max="5" step="1" defaultValue="0" onChange={(event) => {noteTaskAccepted(task.id,event.target.value)}}></input>
                  <p>{task.note}</p>
                </td> : <td>Activity not completed</td>
              }
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.location.replace('/')}>Back to HomePage</button>

    </div>
  );
}

export default Profil;
