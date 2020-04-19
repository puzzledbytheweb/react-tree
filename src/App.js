import React from "react";
import "./App.css";
import Tree from "./components/Tree/Tree";
import "./fontawesome";
import initialTree from "./mocks/initialTree";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tree initialTree={initialTree} />
      </header>
    </div>
  );
}

export default App;
