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
        <Tree />
      </header>
    </div>
  );
}

export default App;
