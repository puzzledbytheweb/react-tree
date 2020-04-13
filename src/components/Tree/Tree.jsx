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
    const newTree = [...tree];

    console.log(newTree);
    console.log(path);

    const splittedPath = path.split("|").reverse();

    let currentParentNode = null;

    console.log(splittedPath);
    console.log(item);

    // Finding the tree node that contains the item
    for (let i = 0; i < splittedPath.length; i++) {
      if (i === 0) {
        currentParentNode = newTree.find((node) => node.id === splittedPath[i]);
      } else {
        currentParentNode = currentParentNode.children.find(
          (node) => node.id === splittedPath[i]
        );
      }
    }

    // Finding the item to change checked value
    const itemToChange = currentParentNode.items.find(
      (nodeItem) => nodeItem.id === item.id
    );

    itemToChange.checked = !itemToChange.checked;

    setTree(newTree);
  };

  return {
    tree,
    handleItemCheck,
  };
};

export default Tree;
