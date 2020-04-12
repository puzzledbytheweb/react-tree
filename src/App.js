import React from "react";
import logo from "./logo.svg";
import "./App.css";

import TreeContainer from "./containers/TreeContainer/TreeContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TreeContainer />
      </header>
    </div>
  );
}

export default App;
