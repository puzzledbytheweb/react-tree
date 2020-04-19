import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { UUIDV4_NAMESPACE, PATH_SEPARATOR } from "../constants";

import {
  findTreeNode,
  deleteTreeNode,
  recursivelyUpdateNodePath,
} from "./utils/useTree";

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

    if (!currentParentNode) {
      newTree.unshift(newNode);
    } else {
      if (!currentParentNode.children) currentParentNode.children = [];

      currentParentNode.children.unshift(newNode);
    }

    setTree(newTree);
  };

  const handleItemCheck = (item, path) => {
    const newTree = [...tree];
    let currentParentNode = findTreeNode(newTree, path);

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
    const destinationParentNodePath = destinationDroppableIdArray
      .slice(destinationParentIdIndex)
      .join(PATH_SEPARATOR);

    // Check if sourceId belongs to the parent chain of the destination
    const sourceIdBelongsToParentChain = destination.droppableId.includes(
      sourceId
    );

    // Stop everything if it does
    if (sourceIdBelongsToParentChain) return;

    // DEALING WITH SOURCE
    let sourceNode = null;
    const sourceIsARoot = sourceDroppableIdArray.length === 1;

    if (sourceIsARoot) {
      sourceNode = newTree.splice(source.index, 1)[0];
    } else {
      const sourceParentNode = findTreeNode(newTree, sourceParentNodePath);

      const sourceNodeIndex = sourceParentNode.children.findIndex(
        (node) => node.id === sourceId
      );

      sourceNode = sourceParentNode.children.splice(sourceNodeIndex, 1)[0];
    }

    // DEALING WITH DESTINATION
    let destinationNodeIndex = null;
    const destinationIsARoot = !destinationParentNodePath;

    if (destinationIsARoot) {
      destinationNodeIndex = newTree.findIndex(
        (node) => node.id === destinationDroppableIdArray[destinationIdIndex]
      );

      sourceNode.nodePath = sourceNode.id;

      newTree.splice(destinationNodeIndex, 0, sourceNode);
    } else {
      const destinationParentNode = findTreeNode(
        newTree,
        destinationParentNodePath
      );

      destinationNodeIndex = destinationParentNode.children.findIndex(
        (node) => node.id === destinationDroppableIdArray[destinationIdIndex]
      );

      sourceNode.nodePath = `${sourceNode.id}${PATH_SEPARATOR}${destinationParentNodePath}`;

      destinationParentNode.children.splice(
        destinationNodeIndex,
        0,
        sourceNode
      );
    }

    // Recursively Propagate nodePath changes to all the children
    if (sourceNode.children)
      sourceNode.children.forEach((node) =>
        recursivelyUpdateNodePath(node, sourceNode.nodePath)
      );

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
