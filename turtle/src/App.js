import logo from './logo.svg';
import './App.css';

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Turtle
        </a>
      </header>
      <body>
      <form id="form" method='POST'>
        <input type="text" name="author"/>
        <input type="text" name="title"/>
        <textarea name="decription" rows="5" cols="50" maxlength="500"></textarea>
        <input type="text" name="price"/>
        <button type="submit">Validate</button>
      </form>
      </body>
    </div>
  );
}

export default App;
