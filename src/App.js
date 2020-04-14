import React from "react";
import logo from "./logo.svg";
import "./App.css";
import initialTree from "./mocks/initialTree";
import Tree from "./components/Tree/Tree";
import "./fontawesome";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Tree initialTree={initialTree} />
      </header>
    </div>
  );
}

export default App;
