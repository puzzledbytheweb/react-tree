import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "../../constants";

const useTree = (initialTree) => {
  const [tree, setTree] = useState(initialTree);

  const handleCellAdd = (path, values) => {
    const newTree = [...tree];

    let currentParentNode = findTreeNode(newTree, path);

    // Creating children if it doesn't already exist
    if (!currentParentNode.children) currentParentNode.children = [];

    currentParentNode.children.push({
      name: values.name,
      // ID should be unique, use
      id: uuidv4(UUIDV4_NAMESPACE),
      items: null,
      children: [],
    });

    setTree(newTree);
  };

  // This is for the bonus
  const handleItemCheck = (item, path) => {
    const newTree = [...tree];
    let currentParentNode = findTreeNode(newTree, path);

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
    handleCellAdd,
  };
};

export default useTree;

const findTreeNode = (tree, path) => {
  const splittedPath = path.split("|").reverse();

  let currentParentNode = null;

  // Finding the tree node that contains the item
  for (let i = 0; i < splittedPath.length; i++) {
    if (i === 0) {
      currentParentNode = tree.find((node) => node.id === splittedPath[i]);
    } else {
      currentParentNode = currentParentNode.children.find(
        (node) => node.id === splittedPath[i]
      );
    }
  }

  return currentParentNode;
};
