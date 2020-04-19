import React from "react";
import "./App.css";
import Tree from "./components/Tree/Tree";
import "./fontawesome";
// import initialTree from "./mocks/initialTree";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* You can try it out by providing an initial tree.
        As long as its shape is respected it should work seamlessly */}
        <Tree
        // initialTree={initialTree}
        />
      </header>
    </div>
  );
}

export default App;
