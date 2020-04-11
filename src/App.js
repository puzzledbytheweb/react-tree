import React from "react";
import logo from "./logo.svg";
import "./App.css";

import List from "./components/List/List";
import ListCell from "./components/ListCell/ListCell";

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
          Learn React
        </a>
        <List>
          <ListCell>
            Hey!
            <List>
              <ListCell>
                Yo
                <List>
                  <ListCell>Hey Yo</ListCell>
                </List>
              </ListCell>
            </List>
          </ListCell>
        </List>
      </header>
    </div>
  );
}

export default App;
