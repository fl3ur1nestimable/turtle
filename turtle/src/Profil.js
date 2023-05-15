import React, { useEffect } from "react";
import { useState} from 'react';
import './profil.css';
import axios from "axios";
import Web3 from "web3";
import abi from "./abi.json";
import adress from "./adress.json";

function Profil(props) {
  const adr = adress.address;
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
          window.location.reload();
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
      .then(async response => {
        if (response.status === 200) {
          console.log("Task completed");
          try {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.requestAccounts();
            const account = accounts[0];
            const contract = new web3.eth.Contract(abi, adr);
            console.log(id);
            await contract.methods.completeTransaction(id-1).send({ from: account });
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
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
    <div id= "profil_body">
      <h1>{username}'s profile</h1>
      <div>
      <div id = "posted_table">
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
                    <button className="minibtn" onClick={() => noteTaskPosted(task.id, 0)}>0</button>
                    <button className="minibtn" onClick={() => noteTaskPosted(task.id, 1)}>1</button>
                    <button className="minibtn" onClick={() => noteTaskPosted(task.id, 2)}>2</button>
                    <button className="minibtn" onClick={() => noteTaskPosted(task.id, 3)}>3</button>
                    <button className="minibtn" onClick={() => noteTaskPosted(task.id, 4)}>4</button>
                    <button className="minibtn" onClick={() => noteTaskPosted(task.id, 5)}>5</button>
                  </>
                ) : (
                  <p>Task not completed</p>
                )}
              </td>
              <td>
                {task.status === 'Accepted' ? (
                  <button className="btncomplete" onClick={() => completeTask(task.id)}>Complete</button>
                ) : 
                  task.status === 'Completed' ? (<p>Task completed</p>) : (<p>Task not accepted</p>)
                  }
              </td>
            </tr>
          ))}
        </tbody>
      
      </table>
      </div>
      <div id ="accepted_table">
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
                  <>
                    <button className="minibtn" onClick={() => noteTaskAccepted(task.id, 0)}>0</button>
                    <button className="minibtn" onClick={() => noteTaskAccepted(task.id, 1)}>1</button>
                    <button className="minibtn" onClick={() => noteTaskAccepted(task.id, 2)}>2</button>
                    <button className="minibtn" onClick={() => noteTaskAccepted(task.id, 3)}>3</button>
                    <button className="minibtn" onClick={() => noteTaskAccepted(task.id, 4)}>4</button>
                    <button className="minibtn" onClick={() => noteTaskAccepted(task.id, 5)}>5</button>
                  </>
                </td> : <td>Task not completed</td>
              }
            </tr>
          ))}
        </tbody>
      </table>

      </div>
      </div>
      <div id = "home">
      <button className="rethome" onClick={() => window.location.replace('/')}>HomePage</button>
      </div>
    </div>
  );
}

export default Profil;
