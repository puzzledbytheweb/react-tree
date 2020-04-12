import React, { useState } from "react";
import Proptypes from "prop-types";

import { LevelInterface } from "../../types";

import Branch from "../Branch/Branch";

const Tree = ({ initialTree }) => {
  const { tree, handleItemCheck } = useTree(initialTree);

  const onItemCheck = (item, path, rootPath) => {
    handleItemCheck(item, path || rootPath);
  };

  // Create a branch for each root
  return tree.map((branch) => {
    return (
      <Branch key={branch.id} objectBranch={branch} onItemCheck={onItemCheck} />
    );
  });
};

Tree.propTypes = {
  initialTree: Proptypes.arrayOf(LevelInterface).isRequired,
};

const useTree = (initialTree) => {
  const [tree, setTree] = useState(initialTree);

  const handleItemCheck = (item, path) => {
    const newTree = Object.assign({}, tree);
    console.log(item, path);
    const splittedPath = path.split("|");

    for (let i = 0; i < splittedPath.length; i++) {}
  };

  return {
    tree,
    handleItemCheck,
  };
};

export default Tree;
