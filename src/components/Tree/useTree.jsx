import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE } from "../../constants";

const useTree = (initialTree) => {
  const [tree, setTree] = useState(initialTree);

  const handleCellRemove = (path) => {
    let newTree = [...tree];

    // eslint-disable-next-line no-unused-vars
    newTree = deleteTreeNode(newTree, path);

    setTree(newTree);
  };

  const handleCellAdd = (path, values) => {
    const newTree = [...tree];

    let currentParentNode = findTreeNode(newTree, path);

    // Creating children if it doesn't already exist
    if (!currentParentNode.children) currentParentNode.children = [];

    currentParentNode.children.unshift({
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

  const handleEditCellName = (path, newName) => {
    const newTree = [...tree];

    let currentParentNode = findTreeNode(newTree, path);

    currentParentNode.name = newName;

    setTree(newTree);
  };

  const handleAddCellItem = (path, newItem) => {
    const newTree = [...tree];

    let currentParentNode = findTreeNode(newTree, path);

    if (!currentParentNode.items) currentParentNode.items = [];

    currentParentNode.items.push(newItem);

    setTree(newTree);
  };

  return {
    tree,
    handleItemCheck,
    handleCellAdd,
    handleCellRemove,
    handleEditCellName,
    handleAddCellItem,
  };
};

export default useTree;

const findTreeNode = (tree, path) => {
  const splittedPath = path.split("|").reverse();

  let currentParentNode = null;

  // Finding the tree
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

const deleteTreeNode = (tree, path) => {
  const splittedPath = path.split("|").reverse();

  let currentParentNode = null;

  for (let i = 0; i < splittedPath.length; i++) {
    // Making sure that currentParentNode is not null when needed
    if (i === 0) {
      currentParentNode = tree.find((node) => node.id === splittedPath[i]);
    } else {
      const nextParentNode = currentParentNode.children.find(
        (node) => node.id === splittedPath[i]
      );

      // We're checking if nextParentNode has children, if it doesn't it means we are on a leaf
      // So we maintain the currentParentNode se we delete via its children
      // We're also checking if we are on the node we want to delete, so we don't end up just
      // deleting a child
      if (nextParentNode.children && i !== splittedPath.length - 1) {
        currentParentNode = nextParentNode.children.length
          ? nextParentNode
          : currentParentNode;
      }
    }

    // Checking if we want to delete root
    if (splittedPath.length === 1) {
      const nodeToDeleteIndex = tree.findIndex(
        (node) => node.id === splittedPath[i]
      );

      tree.splice(nodeToDeleteIndex, 1);
    } else if (i === splittedPath.length - 1) {
      // Checking if we are in previous to last node so we can delete correct child
      const childToDeleteIndex = currentParentNode.children.findIndex(
        (node) => node.id === splittedPath[i]
      );

      currentParentNode.children.splice(childToDeleteIndex, 1);
    }
  }

  return tree;
};
