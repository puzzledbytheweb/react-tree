import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE, PATH_SEPARATOR } from "../constants";

const useTree = (initialTree) => {
  const [tree, setTree] = useState(initialTree);

  const handleNewTree = (values) => {
    const newId = uuidv4(UUIDV4_NAMESPACE);

    const firstNode = {
      name: values.name,
      id: newId,
      items: null,
      nodePath: newId,
      children: null,
    };

    setTree([firstNode]);
  };

  const handleCellRemove = (path) => {
    let newTree = [...tree];

    newTree = deleteTreeNode(newTree, path);

    setTree(newTree);
  };

  const handleCellAdd = (path, values) => {
    const newTree = [...tree];
    let currentParentNode = findTreeNode(newTree, path);

    const newId = uuidv4(UUIDV4_NAMESPACE);
    const nodePath = path ? `${newId}|${path}` : newId;

    const newNode = {
      name: values.name,
      id: newId,
      items: null,
      nodePath,
      children: null,
    };

    // This means we are creating a new root
    if (!currentParentNode) {
      newTree.unshift(newNode);
    } else {
      // Checking if it has children
      if (!currentParentNode.children) currentParentNode.children = [];

      currentParentNode.children.unshift(newNode);
    }

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

  const handleDragItem = (source, destination) => {
    const newTree = [...tree];

    const sourceDroppableIdArray = source.droppableId.split(PATH_SEPARATOR);
    const destinationDroppableIdArray = destination.droppableId.split(
      PATH_SEPARATOR
    );
    const sourceIdIndex = 0;
    const sourceId = sourceDroppableIdArray[sourceIdIndex];
    const sourceParentIdIndex = 1;
    const sourceParentNodePath = sourceDroppableIdArray
      .slice(sourceParentIdIndex)
      .join(PATH_SEPARATOR);

    const destinationIdIndex = 0;
    const destinationParentIdIndex = 1;
    const destinationParentId =
      destinationDroppableIdArray[destinationParentIdIndex];

    // Check if destination parent node is the same as the source node and do nothing
    // This will probably be usable for the use case when source node is part
    // of the parent chain for destination node
    if (sourceId === destinationParentId) return;

    const destinationParentNodePath = destinationDroppableIdArray
      .slice(destinationParentIdIndex)
      .join(PATH_SEPARATOR);

    let destinationNodeIndex = null;

    let sourceNode = null;

    // DEALING WITH SOURCE
    // TODO: Write unit test using Cypress
    // Solve use case for when source is not a root
    if (sourceDroppableIdArray.length > 1) {
      const sourceParentNode = findTreeNode(newTree, sourceParentNodePath);

      const sourceNodeIndex = sourceParentNode.children.findIndex(
        (node) => node.id === sourceId
      );

      // Remove source node from children of parent node
      sourceNode = sourceParentNode.children.splice(sourceNodeIndex, 1)[0];
    } else {
      // This is the code for when source node is a root
      console.log("source node is a root!");

      // Delete sourceNode from newTree
      sourceNode = newTree.splice(source.index, 1)[0];
    }

    // DEALING WITH DESTINATION
    // Check if destination is a root (has no parent)
    if (!destinationParentNodePath) {
      destinationNodeIndex = newTree.findIndex(
        (node) => node.id === destinationDroppableIdArray[destinationIdIndex]
      );

      // We'll probably leave this out from future abstraction
      // We need to update the nodePath
      sourceNode.nodePath = sourceNode.id;

      // Recursively Propagate nodePath changes to all the children
      if (sourceNode.children)
        sourceNode.children.forEach((node) =>
          recursivelyUpdateNodePath(node, sourceNode.nodePath)
        );

      newTree.splice(destinationNodeIndex, 0, sourceNode);
    } else {
      const destinationParentNode = findTreeNode(
        newTree,
        destinationParentNodePath
      );

      destinationNodeIndex = destinationParentNode.children.findIndex(
        (node) => node.id === destinationDroppableIdArray[destinationIdIndex]
      );

      // We'll probably leave this out from future abstraction
      // We need to update the nodePath
      sourceNode.nodePath = `${sourceNode.id}${PATH_SEPARATOR}${destinationParentNodePath}`;

      // Recursively Propagate nodePath changes to all the children
      if (sourceNode.children)
        sourceNode.children.forEach((node) =>
          recursivelyUpdateNodePath(node, sourceNode.nodePath)
        );

      // Inserting source node to destination
      destinationParentNode.children.splice(
        destinationNodeIndex,
        0,
        sourceNode
      );
    }

    setTree(newTree);
  };

  return {
    tree,
    handleItemCheck,
    handleCellAdd,
    handleCellRemove,
    handleEditCellName,
    handleAddCellItem,
    handleDragItem,
    handleNewTree,
    setTree,
  };
};

export default useTree;

const recursivelyUpdateNodePath = (node, parentNodePath) => {
  node.nodePath = `${node.id}|${parentNodePath}`;

  if (node.children && node.children.length > 0)
    node.children.forEach((childNode) =>
      recursivelyUpdateNodePath(childNode, node.nodePath)
    );
};

const findTreeNode = (tree, path) => {
  let currentParentNode = null;

  if (!path) return currentParentNode;

  const splittedPath = path.split(PATH_SEPARATOR).reverse();

  // Finding the node
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
  const splittedPath = path.split(PATH_SEPARATOR).reverse();

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
