import { useState } from "react";

const useTree = (initialTree) => {
  const [tree, setTree] = useState(initialTree);

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
